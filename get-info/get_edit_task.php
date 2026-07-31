<?php

header("Content-Type: application/json");

require_once "../php-sql/config.php";

function Response(bool $success, string $message = "", array $data = []): void
{
	exit(json_encode([
		"success" => $success,
		"message" => $message,
		"data"    => $data
	]));
}

$data = json_decode(file_get_contents("php://input"), true);
if (!isset($data["id"])) {
	Response(false, "undifined",);
}

$id_task = $data["id"];

$stmt = $pdo->prepare("SELECT id_task, user_id, task, category, time, priority, state FROM tasks WHERE id_task = ?");
$stmt->execute([$id_task]);
$info_task = $stmt->fetch();

Response(true, "", $info_task);
