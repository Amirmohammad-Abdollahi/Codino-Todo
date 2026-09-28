<section class="app-header">
	<!-- Greeting -->
	<div class="header-left">
		<div class="greeting-title">
			<h2>
				<div id="header-title-text-fully"><span id="title-header-left"></span>,</div>
				<div id="usernameView">User</div>
			</h2>
			<img src="./asset/icons/Sun-greeting-Icom.png" alt="svg خورشید" loading="lazy">
		</div>
		<div class="greeting-subtitle">
			<p></p>
		</div>
	</div>

	<!-- Header Panel (Widgets) -->
	<div class="header-panel">
		<!-- Progress Widget -->
		<div class="header-widget progress-widget">
			<div class="progress-circle" data-progress="0">
				<svg class="progress-ring" viewBox="0 0 120 120">
					<defs>
						<linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
							<stop offset="0%" stop-color="#3b82f6" />
							<stop offset="100%" stop-color="#8b5cf6" />
						</linearGradient>
					</defs>

					<!-- Background Circle -->
					<circle class="progress-bg" cx="60" cy="60" r="50" />

					<!-- Progress Circle -->
					<circle class="progress-value" cx="60" cy="60" r="50" />
				</svg>

				<div class="progress-text">
					<span class="progress-percent"></span>
				</div>
			</div>

			<div class="progress-info">
				<h3 class="progress-title">Today Progress</h3>
				<p class="progress-label">Keep Going!</p>
			</div>
		</div>

		<!-- Streak Widget -->
		<div class="header-widget streak-widget">
			<div class="header-widget__icon streak-icon">
				<svg
					class="icon-fire"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 64 64">

					<defs>
						<linearGradient id="fireGradient" x1="0%" y1="100%" x2="100%" y2="0%">
							<stop offset="0%" stop-color="#f59e0b" />
							<stop offset="55%" stop-color="#fb923c" />
							<stop offset="100%" stop-color="#ef4444" />
						</linearGradient>

						<linearGradient id="fireInner" x1="0%" y1="100%" x2="100%" y2="0%">
							<stop offset="0%" stop-color="#fde68a" />
							<stop offset="100%" stop-color="#ffffff" />
						</linearGradient>

						<filter id="glow">
							<feGaussianBlur stdDeviation="2.5" result="blur" />
							<feMerge>
								<feMergeNode in="blur" />
								<feMergeNode in="SourceGraphic" />
							</feMerge>
						</filter>
					</defs>

					<!-- شعله بیرونی -->
					<path
						filter="url(#glow)"
						fill="url(#fireGradient)"
						d="M34 4
           C41 13 44 20 41 28
           C47 26 54 34 54 43
           C54 54 45 60 32 60
           C19 60 10 52 10 41
           C10 28 19 21 25 16
           C26 25 30 30 34 33
           C36 23 37 14 34 4Z" />

					<!-- شعله داخلی -->
					<path
						fill="url(#fireInner)"
						d="M33 20
           C36 25 37 29 35 34
           C39 34 43 38 43 44
           C43 50 38 54 32 54
           C26 54 21 49 21 43
           C21 36 25 33 28 29
           C29 34 31 37 33 39
           C34 33 35 27 33 20Z" />

				</svg>
			</div>
			<div class="header-widget__info streak-info">
				<div class="header-widget__value streak-value">unknown</div>
				<div class="header-widget__label streak-label">Current Streak</div>
			</div>
		</div>

		<!-- Date Widget -->
		<div class="header-widget date-widget">
			<div class="header-widget__icon">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
					<rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
					<line x1="16" y1="2" x2="16" y2="6" />
					<line x1="8" y1="2" x2="8" y2="6" />
					<line x1="3" y1="10" x2="21" y2="10" />
				</svg>
			</div>
			<div class="header-widget__info">
				<div class="header-widget__value date-value">
					<h4></h4>
				</div>
				<p class="header-widget__label date-label"></p>
			</div>
		</div>

		<!-- Time Widget -->
		<div class="header-widget time-widget">
			<div class="header-widget__icon">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
					<circle cx="12" cy="12" r="10" />
					<polyline points="12 6 12 12 16 14" />
				</svg>
			</div>
			<div class="header-widget__info">
				<div class="header-widget__value time-value">
					<h4></h4>
				</div>
				<p class="header-widget__label time-label">Local Time</p>
			</div>
		</div>

		<!-- Theme Toggle -->
		<div class="header-widget theme-widget">
			<div class="theme-toggle">
				<div class="theme-switch">
					<div class="theme-thumb"></div>
					<div class="theme-icon theme-icon--sun">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
							<circle cx="12" cy="12" r="5" />
							<line x1="12" y1="1" x2="12" y2="3" />
							<line x1="12" y1="21" x2="12" y2="23" />
							<line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
							<line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
							<line x1="1" y1="12" x2="3" y2="12" />
							<line x1="21" y1="12" x2="23" y2="12" />
							<line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
							<line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
						</svg>
					</div>
					<div class="theme-icon theme-icon--moon">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
							<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
						</svg>
					</div>
				</div>
			</div>
		</div>

		<!-- Profile -->
		<div class="profile">
			<img src="asset/default-avatar.png" alt="Profile Image" draggable="false">
		</div>
	</div>
</section>