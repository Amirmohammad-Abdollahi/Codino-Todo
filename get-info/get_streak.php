<?php

header("Content-Type: application/json");

require_once "../php-sql/config.php";
require_once "../php-sql/cookie.php";

$user_id = getUserId();

function Response(bool $success, string $message = "", array $data = []): void
{
	exit(json_encode([
		"success" => $success,
		"message" => $message,
		"data"    => $data
	]));
}

$stmt = $pdo->prepare(" SELECT created_at FROM users WHERE user_id = ? ");
$stmt->execute([$user_id]);
$updatedStreak = $stmt->fetch();

Response(true, "Steark loaded successfully.", [
	"created_at" => $updatedStreak["created_at"],
]);
