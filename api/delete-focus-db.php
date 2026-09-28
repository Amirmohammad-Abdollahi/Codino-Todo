<?php

header("Content-Type: application/json");

require_once "config.php";
require_once "cookie.php";

$user_id = getUserId();


function response(
	bool $success,
	string $message = ""
): void {

	exit(json_encode([
		"success" => $success,
		"message" => $message
	]));
}

try {
	$stmt = $pdo->prepare("DELETE FROM focus WHERE user_focus = ?");
	$stmt->execute([$user_id]);
} catch (PDOException $e) {
	response(false, "Database error occurred. Please try again");
}
