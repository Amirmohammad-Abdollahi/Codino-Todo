<?php
header("Content-Type: application/json");

require_once "../php-sql/config.php";

function Response(bool $success, string $message = ""): void
{
	exit(json_encode([
		"success" => $success,
		"message" => $message
	]));
}

$data = json_decode(file_get_contents("php://input"), true);
if (!isset($data["id"])) {
	Response(false, "Task undifined",);
}

$id_task = $data["id"];

$stmt = $pdo->prepare("DELETE FROM tasks WHERE id_task = ?");
$stmt->execute([$id_task]);

Response(true, "Task removed");