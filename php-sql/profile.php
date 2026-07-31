<?php

header("Content-Type: application/json");
require_once "cookie.php";
require_once "config.php";

function response($success, $message, $data = [])
{
	exit(json_encode([
		"success" => $success,
		"message" => $message,
		"data" => $data
	]));
}


// =========================
// Check Request
// =========================

if (
	!isset($_POST["display_name"]) ||
	!isset($_POST["daily_goal"]) ||
	!isset($_POST["focus"]) ||
	!isset($_POST["week_start"])
) {
	response(false, "Invalid request.");
}


// =========================
// User ID
// =========================

$user_id = getUserId();

if (!$user_id) {
	response(false, "User not found.");
}


// =========================
// Validate Display Name
// =========================

$display_name = trim($_POST["display_name"]);


if ($display_name === "") {

	response(false, "Display name is required.");
}


if (mb_strlen($display_name) > 50) {

	response(false, "Display name is too long.");
}


// =========================
// Validate Daily Goal
// =========================

$daily_goal = trim($_POST["daily_goal"]);


if ($daily_goal === "") {
	$daily_goal = null;
}


if ($daily_goal && mb_strlen($daily_goal) > 255) {

	response(false, "Daily goal is too long.");
}


// =========================
// Validate Focus
// =========================

$allowedFocus = [
	"development",
	"study",
	"fitness",
	"work",
	"personal"
];


$focus = $_POST["focus"];


if (!in_array($focus, $allowedFocus, true)) {

	response(false, "Invalid focus.");
}


// =========================
// Validate Week Start
// =========================

$allowedWeekStart = [
	"saturday",
	"sunday",
	"monday"
];


$week_start = $_POST["week_start"];


if (!in_array($week_start, $allowedWeekStart, true)) {

	response(false, "Invalid week start.");
}


// =========================
// Avatar Upload
// =========================

$dbAvatar = "Images/default-avatar.png";

$stmtProfile = $pdo->prepare("
		SELECT avatar
		FROM users
		WHERE user_id = ?
	");

$stmtProfile->execute([$user_id]);

$profile = $stmtProfile->fetch();

$oldAvatar = null;

if ($profile && !empty($profile["avatar"])) {
	$dbAvatar = $profile["avatar"];
	$oldAvatar = $profile["avatar"];
}


if (
	isset($_FILES["avatar"]) &&
	$_FILES["avatar"]["error"] === UPLOAD_ERR_OK
) {


	$avatar = $_FILES["avatar"];


	// Size

	if ($avatar["size"] > 2 * 1024 * 1024) {

		response(false, "Image is larger than 2MB.");
	}



	// Mime Check

	$finfo = finfo_open(FILEINFO_MIME_TYPE);


	if (!$finfo) {

		response(false, "File validation failed.");
	}


	$mime = finfo_file(
		$finfo,
		$avatar["tmp_name"]
	);


	finfo_close($finfo);



	$allowedMime = [

		"image/jpeg" => "jpg",
		"image/png" => "png",
		"image/webp" => "webp"

	];



	if (!isset($allowedMime[$mime])) {

		response(false, "Invalid image.");
	}



	$extension = $allowedMime[$mime];



	$fileName =
		bin2hex(random_bytes(16))
		.
		"."
		.
		$extension;



	$uploadDir = __DIR__ . "/../Uploads/avatars/";


	if (!is_dir($uploadDir)) {

		mkdir($uploadDir, 0755, true);
	}



	$destination = $uploadDir . $fileName;



	if (
		!move_uploaded_file(
			$avatar["tmp_name"],
			$destination
		)
	) {

		response(false, "Upload failed.");
	}



	$dbAvatar = "Uploads/avatars/" . $fileName;
}

// =========================
// Database
// =========================


try {

	$check = $pdo->prepare("
		SELECT id
		FROM users
		WHERE user_id = ?
	");


	$check->execute([$user_id]);


	$exists = $check->fetch();

	if ($exists) {


		$stmt = $pdo->prepare("
			UPDATE users
			SET
				avatar = ?,
				display_name = ?,
				daily_goal = ?,
				focus = ?,
				week_start = ?,
				is_profile_completed = 1
			WHERE user_id = ?
		");



		$stmt->execute([

			$dbAvatar,
			$display_name,
			$daily_goal,
			$focus,
			$week_start,
			$user_id

		]);

		if (
			$oldAvatar &&
			$oldAvatar !== "Images/default-avatar.png" &&
			$oldAvatar !== $dbAvatar
		) {
			$oldFile = __DIR__ . "/" . $oldAvatar;

			if (file_exists($oldFile)) {
				unlink($oldFile);
			}
		}
	} else {



		$stmt = $pdo->prepare("
			INSERT INTO users
			(
				user_id,
				avatar,
				display_name,
				daily_goal,
				focus,
				week_start,
				is_profile_completed
			)

			VALUES
			(?,?,?,?,?,?,1)
		");



		$stmt->execute([

			$user_id,
			$dbAvatar,
			$display_name,
			$daily_goal,
			$focus,
			$week_start

		]);
	}



	response(true, "Profile saved successfully.", [
		"user" => [
			"user_id" => $user_id,
			"avatar" => $dbAvatar,
			"display_name" => $display_name,
			"daily_goal" => $daily_goal,
			"focus" => $focus,
			"week_start" => $week_start,
			"profile_completed" => true
		]
	]);
} catch (PDOException $e) {
	error_log($e->getMessage());
	response(false, "Database error.");
}
