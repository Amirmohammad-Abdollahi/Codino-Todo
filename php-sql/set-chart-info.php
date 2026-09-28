<?php

header("Content-Type: application/json; charset=utf-8");

require_once "config.php";
require_once "cookie.php";


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


$user_id = getUserId();

$isGuest = empty($user_id);

$query_user_id = $isGuest ? 0 : $user_id;


$data_json = json_decode(
	file_get_contents("php://input"),
	true
);

$range = $data_json["data_target"] ?? null;


if (!$range) {
	Response(
		false,
		"Invalid data range."
	);
}


if (!in_array($range, ["week", "month", "year"], true)) {
	Response(
		false,
		"Invalid data range."
	);
}

if ($range == "week") {

	$week_start = "saturday";

	if (!$isGuest) {

		$stmt = $pdo->prepare("
            SELECT week_start
            FROM users
            WHERE user_id = :user_id
            LIMIT 1
        ");

		$stmt->execute([
			":user_id" => $user_id
		]);

		$user = $stmt->fetch(PDO::FETCH_ASSOC);

		if ($user && !empty($user["week_start"])) {
			$week_start = strtolower($user["week_start"]);
		}
	}


	$today = new DateTime(
		"now",
		new DateTimeZone("Asia/Tehran")
	);

	$days = [
		"sunday" => 0,
		"monday" => 1,
		"tuesday" => 2,
		"wednesday" => 3,
		"thursday" => 4,
		"friday" => 5,
		"saturday" => 6
	];

	$current_day = strtolower(
		$today->format("l")
	);

	$start_day_number = $days[$week_start];
	$current_day_number = $days[$current_day];

	$days_from_start =
		($current_day_number - $start_day_number + 7) % 7;

	$startOfWeek = clone $today;

	$startOfWeek->modify(
		"-{$days_from_start} days"
	);

	$startOfWeek->setTime(0, 0, 0);

	$endOfWeek = clone $startOfWeek;

	$endOfWeek->modify("+7 days");

	$stmt = $pdo->prepare("SELECT DATE(created_at) AS task_date, COUNT(*) AS total 
	FROM tasks 
	WHERE user_id = :user_id AND created_at >= :start AND created_at < :end
	GROUP BY DATE(created_at) ORDER BY task_date ASC");

	$stmt->execute([":user_id" => $user_id, ":start" => $startOfWeek->format("Y-m-d H:i:s"), ":end" => $endOfWeek->format("Y-m-d H:i:s")]);

	$totalTasks = $stmt->fetchAll(PDO::FETCH_ASSOC);

	$weeklyTotal = [];

	$day = clone $startOfWeek;

	for ($i = 0; $i < 7; $i++) {
		$date = $day->format("Y-m-d");
		$weeklyTotal[$date] = 0;
		$day->modify("+1 day");
	}

	foreach ($totalTasks as $task) {
		$date = $task["task_date"];
		$weeklyTotal[$date] = (int) $task["total"];
	}

	$stmt = $pdo->prepare("SELECT 
        DATE(completed_at) AS task_date,
        COUNT(*) AS total
    FROM tasks
    WHERE user_id = :user_id
      AND completed_at >= :start
      AND completed_at < :end
    GROUP BY DATE(completed_at)
    ORDER BY task_date ASC");

	$stmt->execute([
		":user_id" => $user_id,
		":start" => $startOfWeek->format("Y-m-d H:i:s"),
		":end" => $endOfWeek->format("Y-m-d H:i:s")
	]);

	$completedTasks = $stmt->fetchAll(PDO::FETCH_ASSOC);

	$completedWeekly = [];

	$day = clone $startOfWeek;

	for ($i = 0; $i < 7; $i++) {

		$date = $day->format("Y-m-d");

		$completedWeekly[$date] = 0;

		$day->modify("+1 day");
	}

	foreach ($completedTasks as $task) {

		$date = $task["task_date"];

		$completedWeekly[$date] = (int) $task["total"];
	}

	Response(true, "Weekly chart data calculated", [
		"start" => $startOfWeek->format("Y-m-d H:i:s"),
		"end" => $endOfWeek->format("Y-m-d H:i:s"),
		"total" => $weeklyTotal,
		"completed" => $completedWeekly
	]);
} elseif ($range == "month") {
	$today = new DateTime(
		"now",
		new DateTimeZone("Asia/Tehran")
	);

	$startOfMonth = clone $today;
	$startOfMonth->modify("first day of this month");
	$startOfMonth->setTime(0, 0, 0);

	$endOfMonth = clone $startOfMonth;
	$endOfMonth->modify("+1 month");

	$stmt = $pdo->prepare("SELECT 
        DATE(created_at) AS task_date,
        COUNT(*) AS total
    FROM tasks
    WHERE user_id = :user_id
      AND created_at >= :start
      AND created_at < :end
    GROUP BY DATE(created_at)
    ORDER BY task_date ASC");

	$stmt->execute([
		":user_id" => $user_id,
		":start" => $startOfMonth->format("Y-m-d H:i:s"),
		":end" => $endOfMonth->format("Y-m-d H:i:s")
	]);

	$totalTasks = $stmt->fetchAll(PDO::FETCH_ASSOC);

	$monthlyTotal = [];

	$day = clone $startOfMonth;

	while ($day < $endOfMonth) {

		$date = $day->format("Y-m-d");

		$monthlyTotal[$date] = 0;

		$day->modify("+1 day");
	}

	foreach ($totalTasks as $task) {

		$date = $task["task_date"];

		$monthlyTotal[$date] = (int) $task["total"];
	}

	$stmt = $pdo->prepare("SELECT 
        DATE(completed_at) AS task_date,
        COUNT(*) AS total
    FROM tasks
    WHERE user_id = :user_id
      AND completed_at >= :start
      AND completed_at < :end
    GROUP BY DATE(completed_at)
    ORDER BY task_date ASC");

	$stmt->execute([
		":user_id" => $user_id,
		":start" => $startOfMonth->format("Y-m-d H:i:s"),
		":end" => $endOfMonth->format("Y-m-d H:i:s")
	]);

	$completedTasks = $stmt->fetchAll(PDO::FETCH_ASSOC);

	$completedMonthly = [];

	$day = clone $startOfMonth;

	while ($day < $endOfMonth) {

		$date = $day->format("Y-m-d");

		$completedMonthly[$date] = 0;

		$day->modify("+1 day");
	}

	foreach ($completedTasks as $task) {

		$date = $task["task_date"];

		$completedMonthly[$date] = (int) $task["total"];
	}

	Response(true, "Monthly chart data calculated", [
		"start" => $startOfMonth->format("Y-m-d H:i:s"),
		"end" => $endOfMonth->format("Y-m-d H:i:s"),
		"total" => $monthlyTotal,
		"completed" => $completedMonthly
	]);
} elseif ($range == "year") {
	$today = new DateTime(
		"now",
		new DateTimeZone("Asia/Tehran")
	);

	$startOfYear = clone $today;
	$startOfYear->modify("first day of January");
	$startOfYear->setTime(0, 0, 0);

	$endOfYear = clone $startOfYear;
	$endOfYear->modify("+1 year");

	$stmt = $pdo->prepare("SELECT
        MONTH(created_at) AS task_month,
        COUNT(*) AS total
    FROM tasks
    WHERE user_id = :user_id
      AND created_at >= :start
      AND created_at < :end
    GROUP BY MONTH(created_at)
    ORDER BY task_month ASC");

	$stmt->execute([
		":user_id" => $user_id,
		":start" => $startOfYear->format("Y-m-d H:i:s"),
		":end" => $endOfYear->format("Y-m-d H:i:s")
	]);

	$totalTasks = $stmt->fetchAll(PDO::FETCH_ASSOC);

	$yearlyTotal = [];

	for ($month = 1; $month <= 12; $month++) {
		$yearlyTotal[$month] = 0;
	}

	foreach ($totalTasks as $task) {

		$month = (int) $task["task_month"];

		$yearlyTotal[$month] = (int) $task["total"];
	}

	$stmt = $pdo->prepare("SELECT
        MONTH(completed_at) AS task_month,
        COUNT(*) AS total
    FROM tasks
    WHERE user_id = :user_id
      AND completed_at >= :start
      AND completed_at < :end
    GROUP BY MONTH(completed_at)
    ORDER BY task_month ASC");

	$stmt->execute([
		":user_id" => $user_id,
		":start" => $startOfYear->format("Y-m-d H:i:s"),
		":end" => $endOfYear->format("Y-m-d H:i:s")
	]);

	$completedTasks = $stmt->fetchAll(PDO::FETCH_ASSOC);

	$completedYearly = [];

	for ($month = 1; $month <= 12; $month++) {
		$completedYearly[$month] = 0;
	}

	foreach ($completedTasks as $task) {

		$month = (int) $task["task_month"];

		$completedYearly[$month] = (int) $task["total"];
	}

	Response(true, "Yearly chart data calculated", [
		"start" => $startOfYear->format("Y-m-d H:i:s"),
		"end" => $endOfYear->format("Y-m-d H:i:s"),
		"total" => $yearlyTotal,
		"completed" => $completedYearly
	]);
}
