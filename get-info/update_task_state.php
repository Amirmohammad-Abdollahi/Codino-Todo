<?php

header("Content-Type: application/json");

require_once "../php-sql/config.php";
require_once "../php-sql/cookie.php";

$user_id = getUserId();

$data = json_decode(file_get_contents("php://input"), true);

$id = (int)$data["id"];
$state = $data["state"];

if(!in_array($state, ["Complete","Incomplete"])){

    exit(json_encode([
        "success"=>false,
        "message"=>"Invalid state."
    ]));
}

$stmt = $pdo->prepare("
UPDATE tasks
SET state=?
WHERE id_task=? AND user_id=?
");

$stmt->execute([
    $state,
    $id,
    $user_id
]);

echo json_encode([
    "success"=>true,
    "state"=>$state
]);