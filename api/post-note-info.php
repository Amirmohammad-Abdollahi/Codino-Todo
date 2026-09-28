<?php

header("Content-Type: application/json; charset=utf-8");

require_once "config.php";
require_once "cookie.php";


if ($_SERVER["REQUEST_METHOD"] !== "POST") {
	http_response_code(405);
	exit(json_encode([
		"success" => false,
		"message" => "Invalid request method"
	]));
}

function Response(bool $success, string $message = "", int $statusCode = 200): void
{
	http_response_code($statusCode);
	exit(json_encode([
		"success" => $success,
		"message" => $message
	]));
}

$user_id = getUserId();
if (!$user_id) {
	Response(false, "Unauthorized access", 401);
}

$name_input = ["note_title", "note_description", "note_pin_input"];

foreach ($name_input as $input) {
	if (!isset($_POST[$input])) {
		Response(false, "Please fill all required fields", 400);
	}
}

$title       = trim($_POST["note_title"]);
$description = trim($_POST["note_description"]);
$pin         = $_POST["note_pin_input"];

if ($title === "") {
	Response(false, "Title cannot be empty", 400);
}

if (mb_strlen($title, "UTF-8") > 128) {
	Response(false, "Title must not exceed 128 characters", 400);
}

if (!in_array($pin, ["0", "1"], true)) {
	Response(false, "Invalid pin value", 400);
}

try {
	$sql = "INSERT INTO `quick-notes`(user_id, title, message, pin_message) 
            VALUES (?, ?, ?, ?)";

	$stmt = $pdo->prepare($sql);
	$stmt->execute([
		$user_id,
		$title,
		$description,
		$pin
	]);

	$lastInsertId = $pdo->lastInsertId();

	if ($lastInsertId) {
		Response(true, "Note added successfully", 200);
	} else {
		Response(false, "Failed to add note", 500);
	}
} catch (PDOException $e) {
	error_log("Database error in post-note-info.php: " . $e->getMessage());
	Response(false, "Database error occurred", 500);
}
