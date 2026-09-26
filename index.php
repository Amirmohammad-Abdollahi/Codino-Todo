<?php
require_once "php-sql/cookie.php";
$user_id = getUserId();

require_once "php-sql/config.php";

$stmt = $pdo->prepare("SELECT * FROM users WHERE user_id = ?");
$stmt->execute([$user_id]);
$user = $stmt->fetch();

if (!$user) {
	$profile_status = "incomplete";
	$state_log = "out";
} elseif ($user["is_profile_completed"] == 0) {
	$profile_status = "incomplete";
	$state_log = "out";
} else {
	$profile_status = "completed";
	$state_log = "in";
}
?>

<!DOCTYPE html>
<html lang="en" dir="ltr" data-theme="dark">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Codino Todo App</title>
	<link rel="icon" href="icons/CODINO.ico">
	<link rel="stylesheet" href="css/todo.css">
	<link rel="stylesheet" href="css/header.css">
	<link rel="stylesheet" href="css/variable.css">
	<link rel="stylesheet" href="css/modal-Goal.css">
	<link rel="stylesheet" href="css/formUser.css">
	<link rel="stylesheet" href="css/add-task.css">
	<link rel="stylesheet" href="css/chart.css">
	<link rel="stylesheet" href="css/focus.css">
	<link rel="stylesheet" href="css/animations.css">
	<link rel="stylesheet" href="css/responsive.css">
</head>

<body>
	<div class="message-box-container" data-log="<?= $state_log ?>" data-view="hide">
		<div class="message-box-svg-container">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="size-6">
				<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
			</svg>
		</div>
		<p>Text For Example</p>
	</div>
	<div class="app-container" data-state="unload">
		<?php require_once "Load-code.php" ?>
		<?php require_once "formUser.php" ?>
		<?php require_once "header.php" ?>

		<div class="dashboard">
			<!-- Main Content -->
			<main class="main-content">
				<section class="card todo-list">

					<!-- ================= Header ================= -->

					<header class="todo-header">

						<div class="todo-header__left">

							<div class="todo-header__icon">
								<svg xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2">

									<polyline points="20 6 9 17 4 12" />

								</svg>
							</div>

							<div class="todo-header__content">

								<h2 class="todo-header__title">
									Today's Tasks
								</h2>

								<p class="todo-header__subtitle">
									Stay focused and finish today's goals
								</p>

							</div>

						</div>


						<div class="todo-header__right">

							<div class="todo-counter">

								<span class="todo-counter__number">
									0
								</span>

								<span class="todo-counter__label">
									Tasks
								</span>

							</div>

						</div>

					</header>


					<!-- ================= Toolbar ================= -->

					<div class="todo-toolbar">

						<div class="todo-sort">

							<span class="todo-sort__label">Sort</span>

							<div class="todo-sort-dropdown">

								<button class="todo-sort__button" type="button">

									<span class="sort-current">Newest</span>

									<svg viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2">

										<polyline points="6 9 12 15 18 9" />

									</svg>

								</button>

								<div class="todo-sort-menu">

									<button class="sort-item active" data-sort="newest">

										<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
											<path d="M12 5v14" />
											<polyline points="7 10 12 5 17 10" />
										</svg>

										<span>Newest First</span>

									</button>

									<button class="sort-item" data-sort="oldest">

										<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
											<path d="M12 5v14" />
											<polyline points="7 14 12 19 17 14" />
										</svg>

										<span>Oldest First</span>

									</button>

									<button class="sort-item" data-sort="priority_high">

										<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
											<path d="M12 3l2.8 5.7L21 10l-4.5 4.4L17.6 21 12 18l-5.6 3 1.1-6.6L3 10l6.2-1.3L12 3z" />
										</svg>

										<span>Priority (High → Low)</span>

									</button>

									<button class="sort-item" data-sort="priority_low">

										<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
											<path d="M12 21l-2.8-5.7L3 14l4.5-4.4L6.4 3 12 6l5.6-3-1.1 6.6L21 14l-6.2 1.3L12 21z" />
										</svg>

										<span>Priority (Low → High)</span>

									</button>

									<button class="sort-item" data-sort="duration_short">

										<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
											<circle cx="12" cy="13" r="8" />
											<path d="M12 9v4l2 2" />
											<path d="M9 2h6" />
										</svg>

										<span>Shortest Duration</span>

									</button>

									<button class="sort-item" data-sort="duration_long">

										<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
											<circle cx="12" cy="13" r="8" />
											<path d="M12 13V9" />
											<path d="M9 2h6" />
										</svg>

										<span>Longest Duration</span>

									</button>

									<button class="sort-item" data-sort="category">

										<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
											<rect x="3" y="4" width="7" height="7" rx="2" />
											<rect x="14" y="4" width="7" height="7" rx="2" />
											<rect x="3" y="15" width="7" height="7" rx="2" />
											<rect x="14" y="15" width="7" height="7" rx="2" />
										</svg>

										<span>Category (A → Z)</span>

									</button>

								</div>

							</div>

						</div>

						<div class="todo-filter">

							<button class="todo-filter__button" type="button">

								<svg viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2">

									<polygon points="3 4 21 4 14 12 14 19 10 21 10 12 3 4" />

								</svg>

								<span>Filter</span>

								<svg viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2">

									<polyline points="6 9 12 15 18 9" />

								</svg>

							</button>

							<div class="todo-filter-menu">

								<!-- Status -->

								<div class="filter-group">

									<div class="filter-group__title">

										<svg viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="2">

											<circle cx="12" cy="12" r="9" />
											<polyline points="8 12 11 15 16 9" />

										</svg>

										<span>Status</span>

									</div>

									<button class="filter-item active" data-filter="status" data-value="all">
										All Tasks
									</button>

									<button class="filter-item" data-filter="status" data-value="Complete">
										Completed
									</button>

									<button class="filter-item" data-filter="status" data-value="Incomplete">
										Incomplete
									</button>

								</div>

								<hr>

								<!-- Category -->

								<div class="filter-group">

									<div class="filter-group__title">

										<svg viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="2">

											<rect x="3" y="4" width="8" height="7" rx="2" />
											<rect x="13" y="4" width="8" height="7" rx="2" />
											<rect x="3" y="13" width="8" height="7" rx="2" />
											<rect x="13" y="13" width="8" height="7" rx="2" />

										</svg>

										<span>Category</span>

									</div>

									<button class="filter-item active" data-filter="category" data-value="all">
										All Categories
									</button>

									<button class="filter-item" data-filter="category" data-value="Development">
										Development
									</button>

									<button class="filter-item" data-filter="category" data-value="Learning">
										Learning
									</button>

									<button class="filter-item" data-filter="category" data-value="Health">
										Health
									</button>

									<button class="filter-item" data-filter="category" data-value="Hobby">
										Hobby
									</button>

								</div>

								<hr>

								<!-- Priority -->

								<div class="filter-group">

									<div class="filter-group__title">

										<svg viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="2">

											<path d="M12 3l2.8 5.8L21 10l-4.5 4.3L17.6 21 12 18l-5.6 3 1.1-6.7L3 10l6.2-1.2L12 3z" />

										</svg>

										<span>Priority</span>

									</div>

									<button class="filter-item active" data-filter="priority" data-value="all">
										All Priorities
									</button>

									<button class="filter-item" data-filter="priority" data-value="High">
										High
									</button>

									<button class="filter-item" data-filter="priority" data-value="Medium">
										Medium
									</button>

									<button class="filter-item" data-filter="priority" data-value="Low">
										Low
									</button>

								</div>
								<button class="filter-reset">
									Clear filters
								</button>

							</div>

						</div>

					</div>
					<!-- ================= Body ================= -->

					<div class="todo-body">

						<div class="todo-items">
						</div>

					</div>


					<!-- ================= Footer ================= -->
					<footer class="todo-footer">

						<button
							class="todo-add-button"
							type="button">

							+ Add new task

						</button>

					</footer>
					<?php require_once "add-task.php" ?>
					<?php require_once "edit-task.php" ?>
				</section>
				<section class="card todo-chart">
					<!-- چارت و آمار -->
					<div class="header-chart">
						<div class="title-chart-section">
							<div class="shape-title">
								<img src="Images/chart-svg.png" alt="chart-svg">
							</div>
							<div class="title-text">
								<h2>Overview</h2>
								<p>Track your completed tasks</p>
							</div>
						</div>
						<div class="select-chart-date" data-dropdown="hide">
							<button type="button" class="select-date-btn">
								<p>This Week</p>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
									<polyline points="6 9 12 15 18 9" />
								</svg>
							</button>
							<div class="select-date-box">
								<p class="date-chart-item" data-range="week">This Week</p>
								<p class="date-chart-item" data-range="month">This Month</p>
								<p class="date-chart-item" data-range="year">This Year</p>
							</div>
						</div>
					</div>
					<div class="chart-container">

						<div class="chart-state" data-state="loading">
							<div class="chart-state-content">

								<span class="chart-state-spinner"></span>

								<p class="chart-state-text">
									Loading chart...
								</p>

								<button class="chart-state-action" type="button">
									Try again
								</button>

							</div>
						</div>

						<canvas id="productivityChart"></canvas>
					</div>
				</section>
			</main>

			<!-- Sidebar -->
			<aside class="sidebar">

				<!-- Today's Goal Card -->
				<section class="card today-goal">
					<!-- Header -->
					<div class="goal-header">
						<div class="goal-header-left">
							<div class="goal-icon">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
									<circle cx="12" cy="12" r="10" />
									<circle cx="12" cy="12" r="6" />
									<circle cx="12" cy="12" r="2" />
								</svg>
							</div>
							<div class="goal-title-wrapper">
								<h3 class="goal-title">Today’s Goal</h3>
								<span class="goal-subtitle">Focus on what matters most</span>
							</div>
						</div>

						<button class="goal-edit-btn" aria-label="Edit today’s goal">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
								<path d="M15 5l4 4" />
							</svg>
							<span>Edit</span>
						</button>
					</div>

					<!-- Body -->
					<div class="goal-body">
						<div class="goal-content">
							<h2 class="goal-name">Build and ship the new dashboard</h2>
							<p class="goal-description">
								Complete the remaining UI components and prepare the backend for live data.
							</p>
						</div>

						<!-- Properties -->
						<div class="goal-properties">

							<div class="goal-badge Priority High">
								<span class="badge-dot"></span>
								<span class="badge-text">High</span>
							</div>

							<div class="goal-badge Status Progress">
								<span class="badge-dot"></span>
								<span class="badge-text">Progress</span>
							</div>

							<div class="goal-deadline" aria-label="Deadline">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
									stroke="currentColor" stroke-width="2" stroke-linecap="round"
									stroke-linejoin="round">
									<rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
									<line x1="16" y1="2" x2="16" y2="6" />
									<line x1="8" y1="2" x2="8" y2="6" />
									<line x1="3" y1="10" x2="21" y2="10" />
								</svg>
								<span>Due tomorrow</span>
							</div>

						</div>

						<!-- Progress -->
						<div class="goal-progress">
							<div class="progress-header">
								<span class="progress-label">Progress</span>
								<span class="progress-goal-value">0%</span>
							</div>
							<div class="progress-track">
								<div class="progress-fill" style="width: 0%;"></div>
							</div>
						</div>

						<!-- Stats -->
						<div class="goal-stats">
							<div class="stat-item">
								<div class="stat-icon">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
										<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
										<polyline points="22 4 12 14.01 9 11.01" />
									</svg>
								</div>
								<div class="stat-content">
									<span class="stat-label">Tasks</span>
									<span class="stat-value">0 / 0</span>
								</div>
							</div>

							<div class="stat-item">
								<div class="stat-icon">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round">
										<circle cx="12" cy="12" r="10" />
										<polyline points="12 6 12 12 16 14" />
									</svg>
								</div>
								<div class="stat-content">
									<span class="stat-label">Time left</span>
									<span class="stat-value stat-daedline">2h 30m</span>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section class="card focus-box">
					<div class="focus-header">
						<div class="focus-title-box">
							<div class="focus-icon">
								<svg
									class="focus-icon-svg-box"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
									aria-hidden="true">
									<defs>
										<linearGradient
											id="focusLightningGradient"
											x1="5"
											y1="3"
											x2="19"
											y2="21"
											gradientUnits="userSpaceOnUse">
											<stop offset="0%" stop-color="#FFF176" />
											<stop offset="45%" stop-color="#FFD54F" />
											<stop offset="100%" stop-color="#FFB300" />
										</linearGradient>
									</defs>

									<path
										d="M13.2 2L4 13.2h6.4L9.2 22 20 9.2h-6.5L13.2 2Z"
										fill="url(#focusLightningGradient)" />
								</svg>
							</div>

							<div class="focus-title">
								<h3>Focus Session</h3>
								<p>Stay focused. Get things done.</p>
							</div>
						</div>

						<button type="button" class="focus-settings-btn">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
								<path fill-rule="evenodd" d="M11.828 2.25c-.916 0-1.699.663-1.85 1.567l-.091.549a.798.798 0 0 1-.517.608 7.45 7.45 0 0 0-.478.198.798.798 0 0 1-.796-.064l-.453-.324a1.875 1.875 0 0 0-2.416.2l-.243.243a1.875 1.875 0 0 0-.2 2.416l.324.453a.798.798 0 0 1 .064.796 7.448 7.448 0 0 0-.198.478.798.798 0 0 1-.608.517l-.55.092a1.875 1.875 0 0 0-1.566 1.849v.344c0 .916.663 1.699 1.567 1.85l.549.091c.281.047.508.25.608.517.06.162.127.321.198.478a.798.798 0 0 1-.064.796l-.324.453a1.875 1.875 0 0 0 .2 2.416l.243.243c.648.648 1.67.733 2.416.2l.453-.324a.798.798 0 0 1 .796-.064c.157.071.316.137.478.198.267.1.47.327.517.608l.092.55c.15.903.932 1.566 1.849 1.566h.344c.916 0 1.699-.663 1.85-1.567l.091-.549a.798.798 0 0 1 .517-.608 7.52 7.52 0 0 0 .478-.198.798.798 0 0 1 .796.064l.453.324a1.875 1.875 0 0 0 2.416-.2l.243-.243c.648-.648.733-1.67.2-2.416l-.324-.453a.798.798 0 0 1-.064-.796c.071-.157.137-.316.198-.478.1-.267.327-.47.608-.517l.55-.091a1.875 1.875 0 0 0 1.566-1.85v-.344c0-.916-.663-1.699-1.567-1.85l-.549-.091a.798.798 0 0 1-.608-.517 7.507 7.507 0 0 0-.198-.478.798.798 0 0 1 .064-.796l.324-.453a1.875 1.875 0 0 0-.2-2.416l-.243-.243a1.875 1.875 0 0 0-2.416-.2l-.453.324a.798.798 0 0 1-.796.064 7.462 7.462 0 0 0-.478-.198.798.798 0 0 1-.517-.608l-.091-.55a1.875 1.875 0 0 0-1.85-1.566h-.344ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" clip-rule="evenodd" />
							</svg>
							<p>Settings</p>
						</button>
					</div>

					<div class="focus-main">
						<div class="focus-timer">

							<svg class="focus-ring" viewBox="0 0 200 200">

								<defs>
									<!-- Gradient -->
									<linearGradient id="focus-gradient"
										x1="0%"
										y1="0%"
										x2="100%"
										y2="100%">

										<stop offset="0%" stop-color="#3B82F6" />
										<stop offset="100%" stop-color="#8B5CF6" />

									</linearGradient>

									<!-- Glow -->
									<filter id="focus-glow"
										x="-50%"
										y="-50%"
										width="200%"
										height="200%">

										<feGaussianBlur
											stdDeviation="4"
											result="blur" />

										<feMerge>
											<feMergeNode in="blur" />
											<feMergeNode in="SourceGraphic" />
										</feMerge>

									</filter>
								</defs>


								<!-- Background Circle -->

								<circle
									class="focus-ring-bg"
									cx="100"
									cy="100"
									r="82" />


								<!-- Progress Circle -->

								<circle
									class="focus-ring-progress"
									cx="100"
									cy="100"
									r="82" />

							</svg>


							<!-- Timer -->

							<div class="focus-time">
								<span id="hour-span-txt">00</span>:<span id="minute-span-txt">00</span>:<span id="second-span-txt">00</span>
							</div>

						</div>

						<div class="focus-info">
							<div class="focus-task">
								<p>There is no task</p>
							</div>

							<div class="focus-buttons" data-state="stop">

								<!-- STOP STATE -->
								<div class="focus-buttons-stop">
									<button class="focus-start-btn" type="button">
										<svg xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											fill="currentColor">
											<path fill-rule="evenodd"
												d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
												clip-rule="evenodd" />
										</svg>

										<p>Start Focus</p>
									</button>

									<button class="focus-reset-btn" type="button">
										<svg xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											fill="currentColor">
											<path fill-rule="evenodd"
												d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z"
												clip-rule="evenodd" />
										</svg>

										<p>Reset</p>
									</button>
								</div>


								<!-- START / PENDING STATE -->
								<div class="focus-buttons-active">

									<button class="focus-stop-btn" type="button">
										<svg xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											fill="currentColor">
											<path fill-rule="evenodd"
												d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm6.75-1.5a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-.75.75h-4.5a.75.75 0 0 1-.75-.75v-3Z"
												clip-rule="evenodd" />
										</svg>

										<p>Stop</p>
									</button>


									<button class="focus-pause-btn" type="button">

										<!-- PAUSE ICON -->
										<svg class="focus-pause-icon"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											fill="currentColor">
											<path fill-rule="evenodd"
												d="M6.75 5.25a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm6.75 0a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1-.75-.75V5.25Z"
												clip-rule="evenodd" />
										</svg>

										<!-- PLAY ICON -->
										<svg class="focus-resume-icon"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											fill="currentColor">
											<path fill-rule="evenodd"
												d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
												clip-rule="evenodd" />
										</svg>

										<p class="focus-pause-text">Pause</p>

									</button>

								</div>

							</div>
						</div>
					</div>
				</section>

				<section class="card quick-notes">
					<?php require_once "quick-notes.php"; ?>
				</section>
			</aside>
		</div>
		<?php require_once "Modal-Edit-Goal.php" ?>
		<?php require_once "modal-note_add.php" ?>
		<?php require_once "focus-modal.php" ?>
	</div>

	<!-- Scripts -->
	<script>
		const container = document.querySelector(".app-container");

		function loaded() {
			container.dataset.state = "load";
		}

		function unloaded() {
			container.dataset.state = "unload";
		}
	</script>
	<script src="js/load-animation.js" type="module"></script>
	<script src="js/header.js" type="module"></script>
	<script src="js/add-task-dropdown.js" type="module"></script>
	<script src="js/modal-Goal.js" type="module"></script>
	<script src="js/date-Picher.js" type="module"></script>
	<script src="js/formUser.js" type="module"></script>
	<script src="js/goal_process.js" type="module"></script>
	<script src="js/add_task.js" type="module"></script>
	<script src="js/export-input-value.js" type="module"></script>
	<script src="js/note-item.js" type="module"></script>
	<script src="js/quick_notes.js" type="module"></script>
	<script src="js/info_loader.js" type="module"></script>
	<script src="Libraries/chart.umd.js"></script>
	<script src="js/chart.js" type="module"></script>
	<script src="js/focus.js" type="module"></script>
</body>

</html>