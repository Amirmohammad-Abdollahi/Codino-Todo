<div class="modal-wrapper" data-modal="hide" role="dialog" aria-modal="true" aria-labelledby="modal-title">
	<div class="modal-content modalEditGoal">
		<form method="post" class="modal-form" id="goalForm">

			<div class="modal-header">
				<h3 id="modal-title">Edit Goal</h3>
				<button type="button" class="modal-close" aria-label="Close modal">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
						<path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
					</svg>
				</button>
			</div>

			<div class="form-group">
				<label for="goalTitle">Goal Title</label>
				<input type="text" id="goalTitle" name="goalTitle" maxlength="80">
				<div class="char-count char-title-count" data-titleError="no">
					<span>42</span>/80
				</div>
			</div>

			<div class="form-group">
				<label for="goalDescription">Description</label>
				<textarea id="goalDescription" name="goalDescription" maxlength="200"></textarea>
				<div class="char-count char-description-count" data-descriptionError="no">
					<span>87</span>/200
				</div>
			</div>


			<div class="form-group">
				<label for="goalDeadline">Deadline</label>

				<div class="date-picker" id="goalDeadlinePicker">

					<div class="date-picker__input-wrapper">

						<input
							id="goalDeadline"
							class="date-picker__input"
							type="text"
							placeholder="YYYY-MM-DD"
							autocomplete="off"
							readonly
							name="goalDeadline"
							aria-haspopup="dialog"
							aria-expanded="false"
							aria-controls="goalDeadlineCalendar"
							aria-label="data-picker">

						<button
							type="button"
							class="date-picker__toggle"
							aria-label="Open calendar">

							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2">
								<rect x="3" y="5" width="18" height="16" rx="2"></rect>

								<line x1="16" y1="3" x2="16" y2="7"></line>

								<line x1="8" y1="3" x2="8" y2="7"></line>

								<line x1="3" y1="11" x2="21" y2="11"></line>

							</svg>

						</button>

					</div>

					<div
						id="goalDeadlineCalendar"
						class="date-picker__panel"
						role="dialog"
						aria-modal="false"
						hidden>

						<!-- Header -->

						<header class="date-picker__header">

							<button
								type="button"
								class="date-picker__nav date-picker__prev"
								aria-label="Previous month">

								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="currentColor">
									<path d="M15.5 19L8.5 12L15.5 5" />
								</svg>

							</button>

							<div class="date-picker__title">

								<button
									type="button"
									class="date-picker__month-trigger">
									<span class="date-picker__month-text">
										January
									</span>
								</button>

								<button
									type="button"
									class="date-picker__year-trigger">
									<span class="date-picker__year-text">
										2026
									</span>
								</button>

							</div>

							<button
								type="button"
								class="date-picker__nav date-picker__next"
								aria-label="Next month">

								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="currentColor">
									<path d="M8.5 5L15.5 12L8.5 19" />
								</svg>

							</button>

						</header>

						<!-- Week Days -->

						<div
							class="date-picker__weekdays"
							aria-hidden="true">

							<span>Su</span>
							<span>Mo</span>
							<span>Tu</span>
							<span>We</span>
							<span>Th</span>
							<span>Fr</span>
							<span>Sa</span>

						</div>

						<!-- Days -->

						<div
							class="date-picker__days"
							role="grid">

							<!-- JS -->

						</div>

						<!-- Month Picker -->

						<div
							class="date-picker__months"
							hidden>

							<!-- JS -->

						</div>

						<!-- Year Picker -->

						<div
							class="date-picker__years"
							hidden>

							<!-- JS -->

						</div>

						<!-- Footer -->

						<footer class="date-picker__footer">

							<button
								type="button"
								class="date-picker__today">
								Today
							</button>

							<button
								type="button"
								class="date-picker__clear">
								Clear
							</button>

						</footer>

					</div>

				</div>

			</div>
			<div class="form-row">
				<div class="form-group dataPriority">
					<select name="btnPriority" class="btnPriority">
						<option value="" disabled selected>Priority</option>
						<option value="Low">Low</option>
						<option value="Medium">Medium</option>
						<option value="High">High</option>
					</select>
				</div>

				<div class="form-group dataStatus">
					<select class="btnStatus" name="btnStatus">
						<option value="" disabled selected>Status</option>
						<option value="Pending">Pending</option>
						<option value="Progress">Progress</option>
						<option value="Completed">Completed</option>
					</select>
				</div>
			</div>

			<input type="hidden" name="priority" id="priority">
			<input type="hidden" name="status" id="status">

			<div class="modal-actions">
				<button type="button" class="btn btn-secondary">Cancel</button>
				<button type="submit" class="btn btn-primary">
					<span>Save Changes</span>
				</button>
			</div>
		</form>
	</div>
	<!-- Backdrop -->
	<div class="modal-backdrop"></div>
</div>