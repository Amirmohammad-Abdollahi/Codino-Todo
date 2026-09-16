<style>
	/* =========================================================
   CODINO TODO — ADD NOTE MODAL
   Complete polished version
   Dark / Light
   Smooth transitions
   Existing HTML compatible
   ========================================================= */


	/* =========================================================
   THEME
   ========================================================= */

	[data-theme="dark"] {
		--note-backdrop:
			rgba(4, 9, 18, 0.68);
	}

	[data-theme="light"] {
		--note-backdrop:
			rgba(15, 23, 42, 0.24);
	}


	/* =========================================================
   MODAL WRAPPER
   ========================================================= */

	.container_add_note {
		position: fixed;
		inset: 0;

		z-index: var(--z-modal);

		display: flex;
		align-items: center;
		justify-content: center;

		padding:
			var(--spacing-lg);

		/*
     * Important:
     * Do not animate display or visibility.
     * We animate opacity + child transform.
     */
		opacity: 1;

		pointer-events: auto;

		/*
     * This is intentionally on the base state.
     * The hidden state only changes values.
     */
		transition:
			opacity 320ms cubic-bezier(0.22, 1, 0.36, 1);
	}


	/* =========================================================
   BACKDROP
   ========================================================= */

	.backdrop_note_form {
		position: absolute;
		inset: 0;

		cursor: pointer;

		background:
			radial-gradient(circle at 50% 42%,
				color-mix(in srgb,
					var(--accent-purple) 10%,
					transparent) 0%,
				transparent 48%),
			var(--note-backdrop);

		backdrop-filter:
			blur(0px);

		-webkit-backdrop-filter:
			blur(0px);

		opacity: 1;

		transition:
			opacity 320ms cubic-bezier(0.22, 1, 0.36, 1),

			backdrop-filter 420ms cubic-bezier(0.22, 1, 0.36, 1),

			-webkit-backdrop-filter 420ms cubic-bezier(0.22, 1, 0.36, 1);
	}


	/*
 * Modal open state
 */

	.container_add_note[data-form="show"] .backdrop_note_form {

		backdrop-filter:
			blur(14px);

		-webkit-backdrop-filter:
			blur(14px);
	}


	/* =========================================================
   FORM CARD
   ========================================================= */

	.add_note_form {
		position: relative;

		z-index: 2;

		width:
			min(100%, 430px);

		min-width: 0;

		display: flex;
		flex-direction: column;

		gap:
			1.05rem;

		padding:
			1.4rem;

		background:
			linear-gradient(145deg,
				color-mix(in srgb,
					var(--bg-surface) 96%,
					var(--accent-purple) 4%),
				var(--bg-surface));

		border:
			1px solid color-mix(in srgb,
				var(--border-color) 88%,
				var(--accent-purple) 12%);

		border-radius:
			var(--radius-xl);

		box-shadow:
			var(--shadow-xl),
			0 0 60px color-mix(in srgb,
				var(--accent-purple) 8%,
				transparent);

		opacity: 1;

		transform:
			translate3d(0, 0, 0) scale(1) rotateX(0deg);

		transform-origin:
			center center;

		will-change:
			opacity,
			transform;

		transition:
			opacity 280ms cubic-bezier(0.22, 1, 0.36, 1),

			transform 420ms cubic-bezier(0.16, 1, 0.3, 1),

			box-shadow 300ms ease;
	}


	/* =========================================================
   FORM DECORATIVE HIGHLIGHTS
   ========================================================= */

	.add_note_form::before {
		content: "";

		position: absolute;

		top: 0;
		left: 12%;
		right: 12%;

		height: 1px;

		border-radius:
			var(--radius-round);

		background:
			linear-gradient(90deg,
				transparent,
				color-mix(in srgb,
					var(--accent-purple) 55%,
					transparent),
				color-mix(in srgb,
					var(--primary) 30%,
					transparent),
				transparent);

		opacity:
			0.7;

		pointer-events: none;
	}


	.add_note_form::after {
		content: "";

		position: absolute;

		width: 160px;
		height: 160px;

		top: -100px;
		right: -90px;

		border-radius: 50%;

		background:
			color-mix(in srgb,
				var(--accent-purple) 11%,
				transparent);

		filter:
			blur(40px);

		pointer-events: none;

		z-index: -1;
	}


	/* =========================================================
   INPUT GROUP
   ========================================================= */

	.input_note_box {
		position: relative;

		width: 100%;

		display: flex;
		flex-direction: column;

		gap:
			0.4rem;

		min-width: 0;
	}


	/* =========================================================
   SHARED INPUT STYLING
   ========================================================= */

	.input_note_box input,
	.input_note_box textarea,
	.input_note_box select {
		width: 100%;

		margin: 0;

		border:
			1px solid var(--border-color);

		border-radius:
			var(--radius-md);

		background:
			color-mix(in srgb,
				var(--bg-surface) 84%,
				var(--glass));

		color:
			var(--text-primary);

		font-family:
			inherit;

		font-size:
			var(--text-sm);

		font-weight:
			450;

		outline:
			none;

		appearance:
			none;

		box-shadow:
			inset 0 1px 0 rgba(255, 255, 255, 0.02);

		transition:
			border-color 200ms ease,

			background-color 200ms ease,

			box-shadow 250ms cubic-bezier(0.22, 1, 0.36, 1),

			color 180ms ease,

			transform 200ms cubic-bezier(0.22, 1, 0.36, 1);
	}


	/* =========================================================
   TEXT INPUT
   ========================================================= */

	.input_note_box input {
		height:
			50px;

		padding:
			0.95rem 0.9rem 0.3rem;
	}


	/* =========================================================
   TEXTAREA
   ========================================================= */

	.input_note_box textarea {
		min-height:
			135px;

		max-height:
			280px;

		resize:
			vertical;

		padding:
			1.05rem 0.9rem 0.7rem;

		line-height:
			1.65;

		overflow-y:
			auto;
	}


	/* Textarea scrollbar */

	.input_note_box textarea::-webkit-scrollbar {
		width:
			4px;
	}

	.input_note_box textarea::-webkit-scrollbar-track {
		background:
			transparent;
	}

	.input_note_box textarea::-webkit-scrollbar-thumb {
		background:
			var(--scroll-thumb);

		border-radius:
			var(--radius-round);
	}


	/* =========================================================
   SELECT
   ========================================================= */

	.input_note_box select {
		height:
			48px;

		padding:
			0 2.5rem 0 0.9rem;

		cursor:
			pointer;

		/*
     * Custom arrow.
     */
		background-image:
			linear-gradient(45deg,
				transparent 50%,
				var(--text-muted) 50%),
			linear-gradient(135deg,
				var(--text-muted) 50%,
				transparent 50%);

		background-position:
			calc(100% - 18px) 20px,
			calc(100% - 13px) 20px;

		background-size:
			5px 5px,
			5px 5px;

		background-repeat:
			no-repeat;
	}


	.input_note_box select option {
		background:
			var(--bg-surface);

		color:
			var(--text-primary);
	}


	/* =========================================================
   INPUT HOVER
   ========================================================= */

	.input_note_box input:hover,
	.input_note_box textarea:hover,
	.input_note_box select:hover {

		border-color:
			color-mix(in srgb,
				var(--primary) 28%,
				var(--border-color));

		background:
			color-mix(in srgb,
				var(--bg-surface-hover) 48%,
				var(--glass));
	}


	/* =========================================================
   INPUT FOCUS
   ========================================================= */

	.input_note_box input:focus,
	.input_note_box textarea:focus,
	.input_note_box select:focus {

		border-color:
			color-mix(in srgb,
				var(--primary) 82%,
				var(--border-color));

		background:
			var(--bg-surface);

		box-shadow:
			0 0 0 3px color-mix(in srgb,
				var(--primary) 11%,
				transparent),

			0 7px 20px color-mix(in srgb,
				var(--primary) 7%,
				transparent),

			inset 0 1px 0 rgba(255, 255, 255, 0.03);

		transform:
			translateY(-1px);
	}


	/* =========================================================
   FLOATING LABEL
   ========================================================= */

	.label_note_input {
		position: absolute;

		left:
			0.75rem;

		top:
			0.95rem;

		z-index: 3;

		max-width:
			calc(100% - 1.5rem);

		margin: 0;

		padding:
			0 0.3rem;

		color:
			var(--text-muted);

		font-size:
			var(--text-sm);

		font-weight:
			500;

		line-height:
			1;

		white-space:
			nowrap;

		overflow:
			hidden;

		text-overflow:
			ellipsis;

		pointer-events:
			none;

		background:
			transparent;

		border-radius:
			var(--radius-round);

		transform:
			translateY(0) scale(1);

		transform-origin:
			left center;

		/*
     * This is the important part.
     */
		transition:
			top 220ms cubic-bezier(0.22, 1, 0.36, 1),

			left 220ms cubic-bezier(0.22, 1, 0.36, 1),

			color 180ms ease,

			font-size 220ms cubic-bezier(0.22, 1, 0.36, 1),

			background-color 180ms ease,

			padding 220ms cubic-bezier(0.22, 1, 0.36, 1),

			transform 220ms cubic-bezier(0.22, 1, 0.36, 1);
	}


	/* =========================================================
   LABEL — EMPTY STATE
   ========================================================= */

	.input_note_box input:placeholder-shown~.label_note_input,

	.input_note_box textarea:placeholder-shown~.label_note_input {

		top:
			0.95rem;

		left:
			0.75rem;

		padding:
			0 0.3rem;

		color:
			var(--text-muted);

		font-size:
			var(--text-sm);

		background:
			transparent;

		transform:
			translateY(0) scale(1);
	}


	/* =========================================================
   LABEL — FOCUS
   ========================================================= */

	.input_note_box input:focus~.label_note_input,

	.input_note_box textarea:focus~.label_note_input {

		top:
			-7px;

		left:
			0.65rem;

		padding:
			0 0.3rem;

		color:
			var(--primary);

		font-size:
			0.7rem;

		background:
			var(--bg-surface);

		transform:
			translateY(0) scale(1);
	}


	/* =========================================================
   LABEL — HAS VALUE
   ========================================================= */

	.input_note_box input:not(:placeholder-shown)~.label_note_input,

	.input_note_box textarea:not(:placeholder-shown)~.label_note_input {

		top:
			-7px;

		left:
			0.65rem;

		padding:
			0 0.3rem;

		color:
			var(--text-muted);

		font-size:
			0.7rem;

		background:
			var(--bg-surface);

		transform:
			translateY(0) scale(1);
	}


	/*
 * Focus + value gets accent color.
 */

	.input_note_box input:not(:placeholder-shown):focus~.label_note_input,

	.input_note_box textarea:not(:placeholder-shown):focus~.label_note_input {

		color:
			var(--primary);
	}


	/* =========================================================
   SELECT LABEL
   ========================================================= */

	.input_note_box:has(select) .label_note_input {

		position: static;

		display: block;

		max-width:
			none;

		margin:
			0 0 0.05rem;

		padding:
			0;

		color:
			var(--text-secondary);

		font-size:
			var(--text-xs);

		font-weight:
			600;

		line-height:
			1.3;

		background:
			transparent;

		transform:
			none;

		pointer-events:
			auto;
	}


	/* =========================================================
   BUTTON WRAPPER
   ========================================================= */

	.note_add_btn_box {
		position: relative;

		width: 100%;

		height:
			50px;

		margin-top:
			0.1rem;

		border-radius:
			var(--radius-md);
	}


	/* =========================================================
   BUTTON GLOW
   ========================================================= */

	.glow_add_btn {
		position: absolute;

		inset:
			3px 2px 1px;

		border-radius:
			var(--radius-md);

		background:
			var(--gradient-primary);

		filter:
			blur(10px);

		opacity:
			0.35;

		transform:
			scale(0.965);

		transition:
			opacity 250ms ease,

			transform 300ms cubic-bezier(0.22, 1, 0.36, 1),

			filter 300ms ease;
	}


	/* =========================================================
   ADD BUTTON
   ========================================================= */

	.note_add_btn {
		position: relative;

		width: 100%;
		height: 100%;

		display: flex;
		align-items: center;
		justify-content: center;

		padding:
			0 1rem;

		border:
			1px solid color-mix(in srgb,
				var(--primary) 30%,
				transparent);

		border-radius:
			var(--radius-md);

		background:
			linear-gradient(135deg,
				var(--primary),
				var(--accent-purple));

		color:
			#ffffff;

		font-family:
			inherit;

		font-size:
			var(--text-sm);

		font-weight:
			700;

		letter-spacing:
			0.01em;

		cursor:
			pointer;

		box-shadow:
			var(--shadow-sm),

			inset 0 1px 0 rgba(255, 255, 255, 0.17);

		transform:
			translateY(0);

		transition:
			transform 180ms cubic-bezier(0.22, 1, 0.36, 1),

			filter 180ms ease,

			box-shadow 220ms ease;
	}


	/* =========================================================
   BUTTON HOVER
   ========================================================= */

	.note_add_btn_box:hover .note_add_btn {

		transform:
			translateY(-2px);

		filter:
			brightness(1.045);

		box-shadow:
			var(--shadow-md),

			0 0 22px color-mix(in srgb,
				var(--accent-purple) 16%,
				transparent),

			inset 0 1px 0 rgba(255, 255, 255, 0.2);
	}


	.note_add_btn_box:hover .glow_add_btn {

		opacity:
			0.65;

		transform:
			scale(1);

		filter:
			blur(13px);
	}


	/* =========================================================
   BUTTON ACTIVE
   ========================================================= */

	.note_add_btn:active {

		transform:
			translateY(0) scale(0.985);

		box-shadow:
			var(--shadow-xs);
	}


	/* =========================================================
   BUTTON FOCUS
   ========================================================= */

	.note_add_btn:focus-visible {

		outline:
			none;

		box-shadow:
			var(--focus-ring),

			0 0 22px color-mix(in srgb,
				var(--accent-purple) 13%,
				transparent);
	}


	/* =========================================================
   MODAL HIDDEN STATE
   ========================================================= */

	.container_add_note[data-form="hide"] {

		opacity:
			0;

		pointer-events:
			none;
	}


	/* Backdrop disappears */

	.container_add_note[data-form="hide"] .backdrop_note_form {

		opacity:
			0;

		backdrop-filter:
			blur(0);

		-webkit-backdrop-filter:
			blur(0);
	}


	/* Form slides down + shrinks */

	.container_add_note[data-form="hide"] .add_note_form {

		opacity:
			0;

		transform:
			translate3d(0, 28px, 0) scale(0.96) rotateX(-2deg);

		box-shadow:
			var(--shadow-sm);
	}


	/* =========================================================
   OPEN STATE
   ========================================================= */

	.container_add_note[data-form="show"] .add_note_form {

		opacity:
			1;

		transform:
			translate3d(0, 0, 0) scale(1) rotateX(0deg);
	}


	/* =========================================================
   MOBILE
   ========================================================= */

	@media (max-width: 560px) {

		.container_add_note {
			padding:
				0.75rem;
		}

		.add_note_form {

			width:
				100%;

			padding:
				1.15rem;

			gap:
				0.95rem;

			border-radius:
				var(--radius-lg);
		}

		.input_note_box input {
			height:
				48px;
		}

		.input_note_box textarea {
			min-height:
				125px;
		}

		.note_add_btn_box {
			height:
				48px;
		}
	}


	/* =========================================================
   SMALL MOBILE
   ========================================================= */

	@media (max-width: 380px) {

		.container_add_note {
			padding:
				0.55rem;
		}

		.add_note_form {

			padding:
				1rem;

			gap:
				0.85rem;

			border-radius:
				var(--radius-md);
		}

		.input_note_box input {
			height:
				46px;
		}

		.input_note_box textarea {
			min-height:
				110px;
		}

		.note_add_btn_box {
			height:
				46px;
		}
	}
</style>
<div class="container_add_note" data-form="hide">
	<div class="backdrop_note_form"></div>
	<form method="post" class="add_note_form">
		<div class="input_note_box"> <input type="text" name="note_title" id="note_title" class="input_note" placeholder=" "> <label for="note_title" class="label_note_input">Title</label> </div>
		<div class="input_note_box"> <textarea name="note_description" id="note_description" class="input_note" placeholder=" "></textarea> <label for="note_description" class="label_note_input">Description</label> </div>
		<div class="input_note_box"> <label for="note_pin_input" class="label_note_input">Pin</label> <select name="note_pin_input" id="note_pin_input">
				<option value="0">unpin</option>
				<option value="1">pin</option>
			</select> </div>
		<div class="note_add_btn_box">
			<div class="glow_add_btn"></div> <button type="submit" class="note_add_btn">Add note</button>
		</div>
	</form>
</div>