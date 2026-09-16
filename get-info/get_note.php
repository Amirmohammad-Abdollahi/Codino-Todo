<?php

header("Content-Type: application/json; charset=utf-8");

require_once "../php-sql/config.php";
require_once "../php-sql/cookie.php";

$user_id = getUserId();

function Response(
    bool $success,
    string $message = "",
    array $data = []
): void {
    exit(json_encode([
        "success" => $success,
        "message" => $message,
        "data"    => $data
    ], JSON_UNESCAPED_UNICODE));
}

try {

    $stmt = $pdo->prepare("
        SELECT
            id_note,
            user_id,
            title,
            message,
            pin_message,
            created_at
        FROM `quick-notes`
        WHERE user_id = ?
        ORDER BY pin_message DESC, created_at DESC
    ");

    $stmt->execute([$user_id]);

    $notes = $stmt->fetchAll();

    Response(true, "Notes loaded successfully", $notes);

} catch (PDOException $e) {

    Response(false, "Database error", []);
}