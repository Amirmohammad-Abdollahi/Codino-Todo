<?php

header("Content-Type: application/json");

require_once "../api/config.php";
require_once "../api/cookie.php";

$user_id = getUserId();

function response(bool $success, array $data): void
{
	exit(json_encode([
		"success" => $success,
		"data" => $data,
	]));
}

$stmt = $pdo->prepare("
	SELECT
		COUNT(*) AS total,
		COALESCE(SUM(state = 'Complete'), 0) AS completed
	FROM tasks
	WHERE user_id = ?
");

$stmt->execute([$user_id]);

$result = $stmt->fetch(PDO::FETCH_ASSOC);

response(
	true,
	[
		"total" => (int)$result["total"],
		"completed" => (int)$result["completed"],
	]
);
