<div class="profile-modal-wrapper"
	data-profile_modal="<?= $profile_status ?>"
	role="dialog"
	aria-modal="true"
	aria-labelledby="profile-modal-title">

	<div class="profile-modal-overlay"></div>

	<div class="profile-modal-content">

		<form id="profileSetupForm"
			class="profile-modal-form"
			method="post"
			enctype="multipart/form-data">

			<!-- Header -->

			<header class="profile-modal-header">

				<h2 id="profile-modal-title">
					Welcome
				</h2>

				<p class="profile-modal-description">
					Complete your profile to personalize your workspace.
				</p>

			</header>

			<!-- Avatar -->

			<div class="profile-avatar-section">

				<label for="profileAvatar" class="profile-avatar-upload">

					<input
						type="file"
						id="profileAvatar"
						name="avatar"
						accept="image/png,image/jpeg,image/webp"
						hidden>

					<div class="profile-avatar-preview">

						<img
							id="profileAvatarPreview"
							src="Images/default-avatar.png"
							alt="">

						<div class="profile-avatar-overlay">

							<svg xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2">

								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M12 5v14M5 12h14" />

							</svg>

						</div>

					</div>

					<span class="profile-avatar-text">
						Upload Profile Picture
					</span>

					<small>
						PNG, JPG or WEBP
					</small>

				</label>

			</div>

			<!-- Form Fields -->

			<fieldset class="profile-form-fields">

				<!-- Display Name -->

				<div class="profile-form-group">

					<label for="displayName">
						Display Name
					</label>

					<input
						type="text"
						id="displayName"
						name="display_name"
						maxlength="50"
						autocomplete="off"
						placeholder="John Doe"
						required>

				</div>

				<!-- Daily Goal -->

				<div class="profile-form-group">

					<label for="dailyGoal">
						Daily Goal
					</label>

					<input
						type="text"
						id="dailyGoal"
						name="daily_goal"
						maxlength="255"
						placeholder="Finish dashboard UI">

					<small>
						Optional
					</small>

				</div>

				<!-- Focus Area -->

				<div class="profile-form-group">

					<label for="focusArea">
						Focus Area
					</label>

					<select
						id="focusArea"
						name="focus">

						<option value="development">
							Development
						</option>

						<option value="study">
							Study
						</option>

						<option value="fitness">
							Fitness
						</option>

						<option value="work">
							Work
						</option>

						<option value="personal" selected>
							Personal
						</option>

					</select>

				</div>

				<!-- Week Start -->

				<div class="profile-form-group">

					<label for="weekStart">
						Week Starts On
					</label>

					<select
						id="weekStart"
						name="week_start">

						<option value="saturday" selected>
							Saturday
						</option>

						<option value="sunday">
							Sunday
						</option>

						<option value="monday">
							Monday
						</option>

					</select>

				</div>

			</fieldset>

			<!-- Footer -->

			<footer class="profile-modal-footer">

				<button
					type="submit"
					class="btn btn-primary profile-submit-btn">

					Save & Continue

				</button>

			</footer>

		</form>

	</div>

</div>