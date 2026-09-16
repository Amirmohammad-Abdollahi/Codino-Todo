<div
	class="focus-session-modal"
	data-view="hide"
	role="dialog"
	aria-modal="true"
	aria-labelledby="focus-session-modal-title">

	<div class="focus-session-backdrop"></div>

	<div class="focus-session-card">

		<!-- Header -->
		<header class="focus-session-header">

			<div class="focus-session-title-box">

				<div class="focus-session-icon">

					<svg
						class="focus-session-icon-svg"
						viewBox="0 0 24 24"
						fill="none"
						aria-hidden="true">

						<path
							d="M13 2L4 14H11L10 22L20 9H13L13 2Z"
							fill="url(#focusSessionGradient)" />

						<defs>
							<linearGradient
								id="focusSessionGradient"
								x1="4"
								y1="2"
								x2="20"
								y2="22"
								gradientUnits="userSpaceOnUse">

								<stop
									offset="0%"
									stop-color="#3b82f6" />

								<stop
									offset="100%"
									stop-color="#8b5cf6" />

							</linearGradient>
						</defs>

					</svg>

				</div>

				<div class="focus-session-title-content">

					<h2
						id="focus-session-modal-title"
						class="focus-session-title">
						Focus Session
					</h2>

					<p class="focus-session-description">
						Set your task and focus duration.
					</p>

				</div>

			</div>

			<button
				type="button"
				class="focus-session-close"
				aria-label="Close">

				&times;

			</button>

		</header>


		<form
			class="focus-session-form"
			autocomplete="off">


			<!-- Task -->
			<section class="focus-session-section">

				<div class="focus-session-section-header">

					<label
						class="focus-session-label"
						for="focus-session-task">

						Task

					</label>

					<span class="focus-session-required">
						Required
					</span>

				</div>


				<div class="focus-task-input-box">
					<button
						type="button"
						id="focus-session-task"
						class="focus-session-task-select">

						<span class="focus-session-task-placeholder">
							Select a task
						</span>

						<span
							class="focus-session-task-arrow"
							aria-hidden="true">

							&rarr;

						</span>

					</button>
					<div class="focus-task-dropdown" data-dropdown="show">
						<div class="header-select-focus-dropdown">
							<h4>Select a task</h4>
							<p id="close-select-task-btn">&times;</p>
						</div>
					</div>
				</div>
			</section>


			<!-- Duration -->
			<section class="focus-session-section">

				<div class="focus-session-section-header">

					<span class="focus-session-label">
						Duration
					</span>

					<span class="focus-session-duration-hint">
						Set your focus time
					</span>

				</div>


				<div class="focus-session-duration-picker">


					<!-- Hour -->
					<div class="focus-session-wheel">

						<span class="focus-session-wheel-label">
							Hour
						</span>

						<div
							class="focus-session-wheel-viewport">

							<div class="focus-session-wheel-list" data-unit="hour">

							</div>

						</div>

					</div>


					<span
						class="focus-session-time-separator"
						aria-hidden="true">

						:

					</span>


					<!-- Minute -->
					<div class="focus-session-wheel">

						<span class="focus-session-wheel-label">
							Minute
						</span>

						<div
							class="focus-session-wheel-viewport">

							<div class="focus-session-wheel-list" data-unit="minute">

							</div>

						</div>

					</div>


					<span
						class="focus-session-time-separator"
						aria-hidden="true">

						:

					</span>


					<!-- Second -->
					<div class="focus-session-wheel">

						<span class="focus-session-wheel-label">
							Second
						</span>

						<div
							class="focus-session-wheel-viewport">

							<div class="focus-session-wheel-list" data-unit="second">

							</div>

						</div>

					</div>

				</div>

			</section>


			<!-- Submit -->
			<button
				type="submit"
				class="focus-session-submit">

				<svg
					class="focus-session-submit-icon"
					viewBox="0 0 24 24"
					fill="none"
					aria-hidden="true">

					<path
						d="M13 2L4 14H11L10 22L20 9H13L13 2Z"
						fill="currentColor" />

				</svg>

				<span>
					Start Focus
				</span>

			</button>

		</form>

	</div>

</div>