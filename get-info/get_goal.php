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

$stmt = $pdo->prepare("
        SELECT title, description, deadLine, priority, status, updated_at
        FROM goal_edit
        WHERE user_id = ?
    ");
$stmt->execute([$user_id]);
$updatedGoal = $stmt->fetch();

Response(true, "Goal loaded successfully.", [
	"title" => $updatedGoal["title"],
	"description" => $updatedGoal["description"],
	"deadLine" => $updatedGoal["deadLine"],
	"priority" => $updatedGoal["priority"],
	"status" => $updatedGoal["status"],
	"updated_at" => $updatedGoal["updated_at"],
]);
