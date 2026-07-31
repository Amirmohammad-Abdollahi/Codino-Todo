<?php
header("Content-Type: application/json");
require_once "cookie.php";
require_once "config.php";
$user_id = getUserId();

function get_user($success, $message, $data = [])
{
	exit(json_encode([
		"success" => $success,
		"message" => $message,
		"data" => $data
	]));
}

$user_stmt = $pdo->prepare("SELECT user_id, display_name, avatar, daily_goal, focus, week_start, created_at FROM users WHERE user_id = ?");
$user_stmt->execute([$user_id]);
$user_info = $user_stmt->fetch(PDO::FETCH_ASSOC);

if ($user_info) {
	get_user(true, "", [
		"user" => $user_info,
	]);
} else {
	get_user(false, "User not found.",);
}
