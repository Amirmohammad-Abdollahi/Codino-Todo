<?php

header("Content-Type: application/json");

require_once "../api/config.php";
require_once "../api/cookie.php";

$user_id = getUserId();


function Response(bool $success, string $message = "", array $data = []): void
{
	exit(json_encode([
		"success" => $success,
		"message" => $message,
		"data" => $data
	]));
}

$sort = $_GET["sort"] ?? "newest";

$status = $_GET["status"] ?? "all";

$category = $_GET["category"] ?? "all";

$priority = $_GET["priority"] ?? "all";



$sql = "
    SELECT 
        id_task,
        task,
        category,
        time,
        priority,
        state
    FROM tasks
    WHERE user_id = ?
";


$params = [$user_id];


// Status

if ($status !== "all") {

	$sql .= " AND state = ? ";

	$params[] = $status;
}


// Category

if ($category !== "all") {

	$sql .= " AND category = ? ";

	$params[] = $category;
}


// Priority

if ($priority !== "all") {

	$sql .= " AND priority = ? ";

	$params[] = $priority;
}



// Sort

switch ($sort) {

	case "priority_high":

		$sql .= "
            ORDER BY 
            FIELD(priority,'High','Medium','Low')
        ";

		break;


	case "priority_low":

		$sql .= "
            ORDER BY 
            FIELD(priority,'Low','Medium','High')
        ";

		break;


	case "duration_short":

		$sql .= " ORDER BY time ASC ";

		break;


	case "duration_long":

		$sql .= " ORDER BY time DESC ";

		break;


	case "category":

		$sql .= " ORDER BY category ASC ";

		break;


	case "oldest":

		$sql .= " ORDER BY created_at ASC ";

		break;


	default:

		$sql .= " ORDER BY created_at DESC ";

		break;
}



try {

	$stmt = $pdo->prepare($sql);

	$stmt->execute($params);

	$tasks = $stmt->fetchAll();


	Response(
		true,
		"Tasks loaded successfully.",
		$tasks
	);
} catch (PDOException $e) {

	Response(
		false,
		$e->getMessage()
	);
}
