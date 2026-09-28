<?php

header("Content-Type: application/json");

require_once "config.php";
require_once "cookie.php";

$user_id = getUserId();


function set_task(
	bool $success,
	string $message = ""
): void {

	exit(json_encode([
		"success" => $success,
		"message" => $message
	]));
}


// Required fields

$required_fields = [
	"task",
	"category",
	"duration_hour",
	"duration_minute",
	"priority"
];


foreach ($required_fields as $field) {

	if (!isset($_POST[$field])) {

		set_task(
			false,
			"Required task information is missing."
		);
	}
}


// Get values

$task = trim($_POST["task"]);
$category = $_POST["category"];
$priority = $_POST["priority"];

$duration_hour = (int) $_POST["duration_hour"];
$duration_minute = (int) $_POST["duration_minute"];


// Task validation

if ($task === "") {

	set_task(
		false,
		"Task title cannot be empty."
	);
}


if (strlen($task) < 3) {

	set_task(
		false,
		"Task title must be at least 3 characters."
	);
}


if (strlen($task) > 80) {

	set_task(
		false,
		"Task title cannot exceed 80 characters."
	);
}


// Category validation

$allowed_categories = [
	"Development",
	"Learning",
	"Health",
	"Hobby"
];


if (!in_array($category, $allowed_categories)) {

	set_task(
		false,
		"Invalid task category selected."
	);
}


// Priority validation

$allowed_priorities = [
	"High",
	"Medium",
	"Low"
];


if (!in_array($priority, $allowed_priorities)) {

	set_task(
		false,
		"Invalid priority value."
	);
}


// Duration validation

if ($duration_hour < 0 || $duration_hour > 8) {

	set_task(
		false,
		"Invalid duration hour."
	);
}

$time_minute = ($duration_hour * 60) + $duration_minute;


if ($time_minute <= 0) {

	set_task(
		false,
		"Task duration must be greater than zero."
	);
}

$stmt = $pdo->prepare("
INSERT INTO tasks(user_id, task, category, time, priority, state)
VALUES (?,?,?,?,?,?)
");

$stmt->execute([
	$user_id,
	$task,
	$category,
	$time_minute,
	$priority,
	"Incomplete"
]);

set_task(
	true,
	"Task added successfully."
);
