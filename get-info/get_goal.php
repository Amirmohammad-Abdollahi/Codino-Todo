<?php

header("Content-Type: application/json; charset=UTF-8");

require_once "../php-sql/config.php";
require_once "../php-sql/cookie.php";

$user_id = getUserId();


function Response(
	bool $success,
	string $code,
	string $message = "",
	array $data = [],
	int $statusCode = 200
): void {
	http_response_code($statusCode);

	exit(json_encode([
		"success" => $success,
		"code"    => $code,
		"message" => $message,
		"data"    => $data
	], JSON_UNESCAPED_UNICODE));
}

if (empty($user_id)) {
	Response(
		true,
		"GUEST",
		"User is not authenticated.",
		[
			"is_authenticated" => false,
			"is_profile_completed" => false,
			"goal_exists" => false,
			"goal" => null
		]
	);
}

$stmt = $pdo->prepare("
	SELECT 
		u.user_id,
		u.is_profile_completed,

		g.user_id AS goal_user_id,
		g.title,
		g.description,
		g.deadLine,
		g.priority,
		g.status,
		g.updated_at

	FROM users u

	LEFT JOIN goal_edit g
		ON g.user_id = u.user_id

	WHERE u.user_id = ?

	ORDER BY g.updated_at DESC

	LIMIT 1
");

$stmt->execute([$user_id]);

$user = $stmt->fetch();

if (!$user) {
	Response(
		false,
		"USER_NOT_FOUND",
		"Authenticated user could not be found.",
		[],
		404
	);
}


$isProfileCompleted = (int)$user["is_profile_completed"] === 1;

$goalExists = !empty($user["goal_user_id"]);

if (!$isProfileCompleted) {
	Response(
		true,
		"PROFILE_NOT_COMPLETED",
		"Profile has not been completed yet.",
		[
			"is_authenticated" => true,
			"is_profile_completed" => false,
			"goal_exists" => $goalExists,

			"goal" => $goalExists
				? [
					"title"       => $user["title"],
					"description" => $user["description"],
					"deadLine"    => $user["deadLine"],
					"priority"    => $user["priority"],
					"status"      => $user["status"],
					"updated_at"  => $user["updated_at"]
				]
				: null
		]
	);
}

if (!$goalExists) {
	Response(
		true,
		"GOAL_NOT_FOUND",
		"No goal has been created yet.",
		[
			"is_authenticated" => true,
			"is_profile_completed" => true,
			"goal_exists" => false,
			"goal" => null
		]
	);
}

Response(
	true,
	"GOAL_LOADED",
	"Goal loaded successfully.",
	[
		"is_authenticated" => true,
		"is_profile_completed" => true,
		"goal_exists" => true,

		"goal" => [
			"title"       => $user["title"],
			"description" => $user["description"],
			"deadLine"    => $user["deadLine"],
			"priority"    => $user["priority"],
			"status"      => $user["status"],
			"updated_at"  => $user["updated_at"]
		]
	]
);