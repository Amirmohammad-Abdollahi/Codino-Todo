<?php

header("Content-Type: application/json");

date_default_timezone_set('Asia/Tehran');

require_once "../api/config.php";
require_once "../api/cookie.php";

$user_id = getUserId();

$data = json_decode(file_get_contents("php://input"), true);

$id = (int)$data["id"];
$state = $data["state"];

if (!in_array($state, ["Complete", "Incomplete"])) {

    exit(json_encode([
        "success" => false,
        "message" => "Invalid state."
    ]));
}

if ($state == "Complete") {
    $completed_at = date('Y-m-d H:i:s');
} else {
    $completed_at = NULL;
}

$stmt = $pdo->prepare("
UPDATE tasks
SET state=?, completed_at=?
WHERE id_task=? AND user_id=?
");

$stmt->execute([
    $state,
    $completed_at,
    $id,
    $user_id
]);

echo json_encode([
    "success" => true,
    "state" => $state
]);
