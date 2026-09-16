<?php
require_once "config.php";
require_once "cookie.php";

$data = json_decode(file_get_contents("php://input"), true);
$real_time = $data["real_time"];
$user_id = getUserId();

$stmt = $pdo->prepare("UPDATE focus SET real_time = ? WHERE user_focus = ?");
$stmt->execute([$real_time, $user_id]);
