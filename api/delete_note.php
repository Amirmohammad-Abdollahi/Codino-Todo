<?php
header("Content-Type: application/json");

require_once "../api/config.php";

function Response(bool $success, string $message = ""): void
{
	exit(json_encode([
		"success" => $success,
		"message" => $message
	]));
}

$data = json_decode(file_get_contents("php://input"), true);
if (!isset($data["id_note"])) {
	Response(false, "Note undifined",);
}

$id_note = $data["id_note"];

$stmt = $pdo->prepare("DELETE FROM `quick-notes` WHERE id_note = ?");
$stmt->execute([$id_note]);
if ($stmt->rowCount() === 0) {
	Response(false, "Note not found or already deleted");
}
Response(true, "Note removed");
