<?php

function getUserId()
{
	if (isset($_COOKIE["user_id"])) {
		return $_COOKIE["user_id"];
	}

	$userId = bin2hex(random_bytes(32));

	setcookie(
		"user_id",
		$userId,
		[
			"expires" => time() + (60 * 60 * 24 * 365 * 5),
			"path" => "/",
			"httponly" => true,
			"samesite" => "Lax"
		]

	);

	return $userId;
}
