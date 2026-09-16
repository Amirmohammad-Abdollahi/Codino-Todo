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
if (!isset($data["id_note"]) || !isset($data["pin"])) {
	Response(false, "Note undifined",);
}

$id_note = $data["id_note"];
$pin = $data["pin"];

$stmt = $pdo->prepare("UPDATE `quick-notes` SET pin_message = ? WHERE id_note = ?");
$stmt->execute([$pin, $id_note]);
if ($stmt->rowCount() === 0) {
	Response(false, "Note not found or already deleted");
}

Response(true, "Note Pin is Successful");
