<?php
header("Content-Type: application/json; charset=utf-8");

require_once "../api/config.php";
require_once "../api/cookie.php";

$user_id = getUserId();

function Response(bool $success, bool $count, string $message = "", array $data = []): void
{
	exit(json_encode([
		"success" => $success,
		"count"   => $count,
		"message" => $message,
		"data"    => $data,
	], JSON_UNESCAPED_UNICODE));
}

try {
	$stmt = $pdo->prepare("SELECT task FROM tasks WHERE user_id = ? AND state = 'Incomplete'");
	$stmt->execute([$user_id]);
	$tasks = $stmt->fetchAll();

	if (empty($tasks)) {
		Response(false, true, "No task found, please add task");
	}

	Response(true, false, "", $tasks);
} catch (PDOException $e) {
	Response(false, false, "Database error: " . $e->getMessage());
}
