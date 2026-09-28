<?php

declare(strict_types=1);

require_once "config.php";
require_once "cookie.php";


// HELPERS

function response(bool $success, string $message = "", int $statusCode = 200): void
{
	http_response_code($statusCode);
	exit(json_encode([
		"success" => $success,
		"message" => $message,
	], JSON_UNESCAPED_UNICODE));
}

function readRequestBody(): array
{
	$raw = file_get_contents("php://input");
	$data = json_decode($raw, true);

	// Handle invalid JSON
	if (json_last_error() !== JSON_ERROR_NONE) {
		response(false, "Invalid JSON payload.", 400);
	}

	return is_array($data) ? $data : [];
}


// CONSTANTS (match your DB schema)

const MAX_TASK_LENGTH = 200;
const FOCUS_DEFAULT_STATE = "stop";


// MAIN LOGIC


$user_id = getUserId();

if ($user_id === null) {
	response(false, "Unauthorized: user not found.", 401);
}

$data = readRequestBody();

$totalSeconds = $data["total_seconds"] ?? null;

$totalSeconds = filter_var($totalSeconds, FILTER_VALIDATE_INT, [
	"options" => [
		"min_range" => 1,
		"max_range" => 86400,   // 24 hours max (adjust as needed)
	],
]);

if ($totalSeconds === false) {
	response(false, "Invalid focus duration. Must be between 1 and 86400 seconds.", 422);
}

$selectedTask = trim((string)($data["select_task"] ?? ""));

if ($selectedTask === "") {
	response(false, "Task is required.", 422);
}

if (mb_strlen($selectedTask, "UTF-8") > MAX_TASK_LENGTH) {
	response(false, "Task is too long (max " . MAX_TASK_LENGTH . " characters).", 422);
}


// INSERT INTO DATABASE


try {
	$stmt = $pdo->prepare(
		"INSERT INTO focus (user_focus, real_time, full_time, state, task)
         VALUES (?, ?, ?, ?, ?)"
	);

	$success = $stmt->execute([
		$user_id,
		$totalSeconds,
		$totalSeconds,
		FOCUS_DEFAULT_STATE,
		$selectedTask,
	]);

	if ($success) {
		response(true, "Focus session saved successfully.", 201);
	}

	response(false, "Failed to save focus session.", 500);
} catch (PDOException $e) {
	// Log details for developers (server-side) but never expose them to client
	error_log("[Focus Insert Error] " . $e->getMessage());

	response(false, "Database error occurred. Please try again later.", 500);
} catch (Throwable $e) {
	error_log("[Unexpected Error] " . $e->getMessage());

	response(false, "Unexpected error occurred.", 500);
}
