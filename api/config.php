<?php

// config.example.php

$host = "localhost";
$username = "root";
$password = "";
$dbname = "todo_app";
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
