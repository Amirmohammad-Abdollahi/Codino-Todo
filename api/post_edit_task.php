<?php

header("Content-Type: application/json");

require_once "../api/config.php";

function jsonResponse(bool $success, string $message = ""): void
{
    exit(json_encode([
        "success" => $success,
        "message" => $message
    ]));
}

$requiredFields = [
    "task",
    "category",
    "duration_hour",
    "duration_minute",
    "priority",
    "id"
];

foreach ($requiredFields as $field) {
    if (!isset($_POST[$field]) || trim($_POST[$field]) === "") {
        jsonResponse(false, "Missing required field: {$field}");
    }
}

$task = trim($_POST["task"]);
$category = trim($_POST["category"]);
$priority = trim($_POST["priority"]);
$id = (int) $_POST["id"];

$hour = (int) $_POST["duration_hour"];
$minute = (int) $_POST["duration_minute"];

$time = ($hour * 60) + $minute;

try {

    $stmt = $pdo->prepare("
        UPDATE tasks
        SET
            task = ?,
            category = ?,
            time = ?,
            priority = ?
        WHERE id_task = ?
    ");

    $stmt->execute([
        $task,
        $category,
        $time,
        $priority,
        $id
    ]);

    jsonResponse(true, "Task updated successfully.");

} catch (PDOException $e) {

    jsonResponse(false, "Database error. Please try again.");

}