<?php

header("Content-Type: application/json");

require_once "config.php";
require_once "cookie.php";

$user_id = getUserId();

function jsonResponse(bool $success, string $message = "", array $data = []): void
{
	exit(json_encode([
		"success" => $success,
		"message" => $message,
		"data"    => $data
	]));
}

try {

	// اطلاعات فعلی هدف (ممکنه نباشه)
	$stmt = $pdo->prepare("
        SELECT title, description, deadLine, priority, status
        FROM goal_edit
        WHERE user_id = ?
    ");
	$stmt->execute([$user_id]);
	$currentGoal = $stmt->fetch();

	// مقادیر پیش‌فرض اگه رکوردی نبود
	$defaults = [
		"title" => "",
		"description" => "",
		"deadLine" => null,
		"priority" => "medium",
		"status" => "pending",
	];

	if (!$currentGoal) {
		$currentGoal = $defaults;
	}

	// =========================
	// Title
	// =========================
	$goalTitle = trim($_POST["goalTitle"] ?? "");
	if ($goalTitle === "") $goalTitle = $currentGoal["title"];
	if (mb_strlen($goalTitle) > 80) jsonResponse(false, "Goal title cannot exceed 80 characters.");

	// =========================
	// Description
	// =========================
	$goalDescription = trim($_POST["goalDescription"] ?? "");
	if ($goalDescription === "") $goalDescription = $currentGoal["description"];
	if (mb_strlen($goalDescription) > 200) jsonResponse(false, "Description cannot exceed 200 characters.");

	// =========================
	// Deadline
	// =========================
	$goalDeadline = $_POST["goalDeadline"] ?? "";
	if ($goalDeadline === "") {
		$goalDeadline = $currentGoal["deadLine"];
	} else {
		$date = DateTime::createFromFormat("Y-m-d", $goalDeadline);
		if (!$date || $date->format("Y-m-d") !== $goalDeadline) {
			jsonResponse(false, "Invalid deadline.");
		}
	}

	// =========================
	// Priority
	// =========================
	$allowedPriority = ["High", "Medium", "Low"];
	$priority = $_POST["btnPriority"] ?? "";
	if ($priority === "") {
		$priority = $currentGoal["priority"];
	} elseif (!in_array($priority, $allowedPriority, true)) {
		jsonResponse(false, "Invalid priority.");
	}

	// =========================
	// Status
	// =========================
	$allowedStatus = ["Pending", "Progress", "Completed"];
	$status = $_POST["btnStatus"] ?? "";
	if ($status === "") {
		$status = $currentGoal["status"];
	} elseif (!in_array($status, $allowedStatus, true)) {
		jsonResponse(false, "Invalid status.");
	}

	// =========================
	// Insert or Update
	// =========================
	$check = $pdo->prepare("SELECT user_id FROM goal_edit WHERE user_id = ?");
	$check->execute([$user_id]);
	$exists = $check->fetch();

	if ($exists) {
		$stmt = $pdo->prepare("
			UPDATE goal_edit
			SET title = ?, description = ?, deadLine = ?, priority = ?, status = ?
			WHERE user_id = ?
		");
		$stmt->execute([$goalTitle, $goalDescription, $goalDeadline, $priority, $status, $user_id]);
		
	} else {
		$stmt = $pdo->prepare("
			INSERT INTO goal_edit (user_id, title, description, deadLine, priority, status)
			VALUES (?, ?, ?, ?, ?, ?)
		");
		$stmt->execute([$user_id, $goalTitle, $goalDescription, $goalDeadline, $priority, $status]);
	}

	// گرفتن اطلاعات نهایی بعد از Update/Insert
	$stmt = $pdo->prepare("
        SELECT title, description, deadLine, priority, status, updated_at
        FROM goal_edit
        WHERE user_id = ?
    ");
	$stmt->execute([$user_id]);
	$updatedGoal = $stmt->fetch();

	if (!$updatedGoal) {
		Response(true, "", [
			"title" => "",
			"description" => "",
			"deadLine" => null,
			"priority" => "Medium",
			"status" => "Pending",
			"updated_at" => null,
		]);
	}

	jsonResponse(true, "Goal updated successfully.", [
		"title" => $updatedGoal["title"],
		"description" => $updatedGoal["description"],
		"deadLine" => $updatedGoal["deadLine"],
		"priority" => $updatedGoal["priority"],
		"status" => $updatedGoal["status"],
		"updated_at" => $updatedGoal["updated_at"],
	]);
} catch (PDOException $e) {
	error_log($e->getMessage());
	jsonResponse(false, $e->getMessage());
}
