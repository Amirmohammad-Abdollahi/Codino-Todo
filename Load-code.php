<style>
	.loader {

		position: fixed;
		inset: 0;

		display: flex;
		justify-content: center;
		align-items: center;

		background:
			radial-gradient(circle at top,
				rgba(59, 130, 246, .18),
				transparent 40%),
			var(--bg-primary);

		z-index: 9999;

		transition:
			opacity .5s ease,
			visibility .5s ease,
			transform .5s ease;

	}


	.loader.hide {

		opacity: 0;
		visibility: hidden;
		transform: scale(1.05);

	}




	.loader-glow {

		position: absolute;

		width: 400px;
		height: 400px;

		background:
			linear-gradient(135deg,
				var(--primary),
				var(--accent-purple));

		filter: blur(120px);

		opacity: .25;

	}




	.loader-card {

		position: relative;

		width: 360px;

		padding: 35px;

		border-radius: var(--radius-2xl);

		background: var(--glass);

		border: 1px solid var(--glass-border);

		backdrop-filter: blur(20px);

		box-shadow: var(--shadow-xl);

		text-align: center;

	}





	.loader-logo {

		width: 80px;
		height: 80px;

		margin: auto;

		position: relative;

	}



	.logo-ring {

		position: absolute;

		inset: 0;

		border-radius: 50%;

		border: 2px solid transparent;

		border-top-color: var(--primary);

		animation: spin 1.5s linear infinite;

	}



	.logo-circle {


		position: absolute;

		inset: 12px;

		display: flex;

		align-items: center;
		justify-content: center;


		border-radius: 50%;


		background:
			var(--gradient-primary);

	}


	.logo-circle svg {

		width: 35px;

		fill: none;

		stroke: white;

		stroke-width: 2.5;

		stroke-linecap: round;

	}





	.loader-card h2 {

		margin-top: 20px;

		color: var(--text-primary);

		font-size: var(--text-xl);

	}




	.loader-status {

		margin-top: 10px;

		color: var(--text-muted);

		display: flex;

		justify-content: center;

		align-items: center;

		gap: 6px;

	}



	.dots {

		display: flex;
		gap: 4px;

	}


	.dots i {

		width: 5px;
		height: 5px;

		border-radius: 50%;

		background: var(--primary);

		animation: bounce 1.2s infinite;

	}


	.dots i:nth-child(2) {

		animation-delay: .2s;

	}


	.dots i:nth-child(3) {

		animation-delay: .4s;

	}





	.loader-steps {

		margin-top: 30px;

		text-align: left;

	}



	.step {

		display: flex;

		align-items: center;

		gap: 14px;

		margin-bottom: 18px;

		color: var(--text-muted);

		transition: .3s;

	}



	.step span {


		width: 12px;

		height: 12px;

		border-radius: 50%;

		background: var(--border-color);

		position: relative;

	}



	.step.active span {

		background: var(--primary);

		box-shadow:
			0 0 15px var(--primary);

		animation: pulse 1.2s infinite;

	}


	@keyframes pulse {

		50% {

			transform: scale(1.25);

			opacity: .6;

		}

	}


	.step.done span {

		background: var(--success);

	}



	.step p {

		margin: 0;

		font-size: var(--text-sm);

	}




	.loader-progress {

		height: 6px;

		margin-top: 25px;

		background: var(--overlay);

		border-radius: 50px;

		overflow: hidden;

	}



	.progress-bar {

		width: 0%;

		height: 100%;

		border-radius: inherit;

		background: var(--gradient-primary);

		transition: width .4s ease;

	}




	@keyframes spin {

		to {
			transform: rotate(360deg);
		}

	}



	@keyframes bounce {

		50% {
			transform: translateY(-4px);
		}

	}
</style>
<div class="loader" id="loader">

	<div class="loader-glow"></div>

	<div class="loader-card">

		<div class="loader-logo">

			<div class="logo-ring"></div>

			<div class="logo-circle">

				<svg viewBox="0 0 24 24">
					<path d="M5 13L10 18L19 7" />
				</svg>

			</div>

		</div>


		<h2>
			Codino Todo
		</h2>


		<p class="loader-status">
			Preparing workspace
			<span class="dots">
				<i></i>
				<i></i>
				<i></i>
			</span>
		</p>



		<div class="loader-steps">

			<div class="step active" data-step="init">
				<span></span>
				<p>Initializing App</p>
			</div>


			<div class="step" data-step="user">
				<span></span>
				<p>Loading User</p>
			</div>


			<div class="step" data-step="tasks">
				<span></span>
				<p>Loading Workspace</p>
			</div>


			<div class="step" data-step="ready">
				<span></span>
				<p>Workspace Ready</p>
			</div>

		</div>



		<div class="loader-progress">

			<div class="progress-bar"></div>

		</div>


	</div>

</div>