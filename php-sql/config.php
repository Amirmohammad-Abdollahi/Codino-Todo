<?php

$host = "sql107.infinityfree.com";
$dbname = "if0_42916928_todo_app";
$username = "if0_42916928";
$password = "qOqHjBCBpSj";

try {
	$pdo = new PDO(
		"mysql:host=$host;dbname=$dbname;charset=utf8mb4",
		$username,
		$password,
		[
			PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
			PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
			PDO::ATTR_EMULATE_PREPARES => false
		]
	);
} catch (PDOException $e) {
	error_log($e->getMessage());
	die("Database Connection Failed.");
}
