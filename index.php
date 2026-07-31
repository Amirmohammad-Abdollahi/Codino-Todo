<?php
require_once "php-sql/cookie.php";
$user_id = getUserId();

require_once "php-sql/config.php";

$stmt = $pdo->prepare("SELECT * FROM users WHERE user_id = ?");
$stmt->execute([$user_id]);
$user = $stmt->fetch();

if (!$user) {
	$profile_status = "incomplete";
} elseif ($user["is_profile_completed"] == 0) {
	$profile_status = "incomplete";
} else {
	$profile_status = "completed";
}
?>

<!DOCTYPE html>
<html lang="en" dir="ltr" data-theme="dark">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Codino Todo App</title>
	<link rel="stylesheet" href="css/todo.css">
	<link rel="stylesheet" href="css/header.css">
	<link rel="stylesheet" href="css/variable.css">
	<link rel="stylesheet" href="css/modal-Goal.css">
	<link rel="stylesheet" href="css/formUser.css">
	<link rel="stylesheet" href="css/add-task.css">
	<link rel="stylesheet" href="css/load_animation.css">
</head>

<body>
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

				<section class="card habit-tracker">
					<!-- ترکر عادت‌ها -->
				</section>

				<section class="card quick-notes">
					<!-- یادداشت‌های سریع -->
				</section>
			</aside>
		</div>
		<?php require_once "Modal-Edit-Goal.php" ?>
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
	<script src="js/modal-Goal.js" type="module"></script>
	<script src="js/date-Picher.js" type="module"></script>
	<script src="js/formUser.js" type="module"></script>
	<script src="js/info_loader.js" type="module"></script>
	<script src="js/goal_process.js" type="module"></script>
	<script src="js/add_task.js" type="module"></script>
	<script src="js/todo.js" type="module"></script>
	<script src="js/export-input-value.js" type="module"></script>
</body>

</html>