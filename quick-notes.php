<style>
	/* 
   CODINO — QUICK NOTES
   Premium / Clean / Dark & Light / Responsive
   Works with existing HTML structure
    */


	/* 
   CARD LAYOUT
    */

	.quick-notes {
		/*
     * The sidebar itself is a flex column.
     * The notes card receives the remaining height.
     */
		flex: 1 1 0;
		min-height: 0 !important;

		display: grid;
		grid-template-rows: auto minmax(0, 1fr) auto;

		gap: var(--spacing-md);

		/*
     * The parent .card already provides padding,
     * so we don't override it here.
     */
	}


	/* 
   HEADER
    */

	.quick_header {
		display: flex;
		align-items: center;
		justify-content: space-between;

		gap: var(--spacing-md);

		min-width: 0;
		flex-shrink: 0;
	}


	/* ---------- Header left ---------- */

	.quick_title {
		display: flex;
		align-items: center;

		gap: var(--spacing-md);

		min-width: 0;
	}


	/* ---------- Icon ---------- */

	.svg_box_title {
		position: relative;

		width: 44px;
		height: 44px;

		flex: 0 0 44px;

		display: flex;
		align-items: center;
		justify-content: center;

		padding: 9px;

		color: var(--accent-purple);

		background:
			linear-gradient(145deg,
				color-mix(in srgb,
					var(--accent-purple) 18%,
					transparent),
				color-mix(in srgb,
					var(--primary) 7%,
					transparent));

		border:
			1px solid color-mix(in srgb,
				var(--accent-purple) 22%,
				var(--glass-border));

		border-radius: var(--radius-md);

		box-shadow:
			inset 0 1px 0 rgba(255, 255, 255, 0.05),
			0 4px 16px color-mix(in srgb,
				var(--accent-purple) 7%,
				transparent);

		overflow: hidden;
	}


	/*
 * Very subtle highlight on the icon box.
 */

	.svg_box_title::after {
		content: "";

		position: absolute;

		width: 22px;
		height: 22px;

		top: -12px;
		right: -10px;

		border-radius: 50%;

		background:
			color-mix(in srgb,
				var(--accent-purple) 18%,
				transparent);

		filter: blur(10px);

		pointer-events: none;
	}


	.svg_box_title svg {
		width: 100%;
		height: 100%;

		display: block;

		position: relative;
		z-index: 1;
	}


	/* ---------- Header text ---------- */

	.text_box_title {
		display: flex;
		flex-direction: column;

		min-width: 0;

		gap: 2px;
	}


	.text_box_title h3 {
		margin: 0;

		color: var(--text-primary);

		font-size: var(--text-lg);
		font-weight: 750;

		line-height: 1.25;

		letter-spacing: -0.015em;

		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}


	.text_box_title p {
		margin: 0;

		color: var(--text-muted);

		font-size: var(--text-xs);
		font-weight: 500;

		line-height: 1.35;

		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}


	/* 
   NEW NOTE BUTTON
    */

	.quick_btn_title {
		flex-shrink: 0;

		display: inline-flex;
		align-items: center;
		justify-content: center;

		gap: 6px;

		min-height: 36px;

		padding: 0.55rem 0.8rem;

		border:
			1px solid color-mix(in srgb,
				var(--accent-purple) 24%,
				var(--glass-border));

		border-radius: var(--radius-round);

		background:
			color-mix(in srgb,
				var(--accent-purple) 7%,
				var(--glass));

		color: var(--accent-purple);

		font-size: var(--text-xs);
		font-weight: 650;

		white-space: nowrap;

		cursor: pointer;

		box-shadow:
			inset 0 1px 0 rgba(255, 255, 255, 0.035),
			var(--shadow-xs);

		transition:
			transform var(--transition-fast),
			background-color var(--transition-fast),
			border-color var(--transition-fast),
			box-shadow var(--transition-fast),
			color var(--transition-fast);
	}


	.quick_btn_title svg {
		width: 15px;
		height: 15px;

		flex-shrink: 0;
	}


	.quick_btn_title:hover {
		background:
			color-mix(in srgb,
				var(--accent-purple) 12%,
				var(--glass));

		border-color:
			color-mix(in srgb,
				var(--accent-purple) 38%,
				var(--glass-border));

		box-shadow:
			0 4px 16px color-mix(in srgb,
				var(--accent-purple) 9%,
				transparent);
	}


	.quick_btn_title:active {
		transform: scale(0.97);
	}


	.quick_btn_title:focus-visible {
		outline: none;

		box-shadow:
			var(--focus-ring),
			0 4px 16px color-mix(in srgb,
				var(--accent-purple) 9%,
				transparent);
	}


	/* 
   NOTES SCROLL AREA
    */

	.quick_main {
		min-width: 0;
		min-height: 0;

		display: flex;
		flex-direction: column;

		overflow-x: hidden;
		overflow-y: auto;

		padding: 2px;

		border-radius: var(--radius-md);

		/*
     * Prevent the scrollbar from feeling glued
     * to the cards.
     */
		scrollbar-gutter: stable;
	}


	/* Inner list */

	.child_quick_main {
		width: 100%;
		min-width: 0;

		display: flex;
		flex-direction: column;

		gap: 0.65rem;

		/*
     * IMPORTANT:
     * min-content lets each note grow naturally
     * when its text becomes taller.
     */
		min-height: min-content;

		padding: 2px 4px 2px 0;
	}


	/* 
   SCROLLBAR
    */

	.quick_main::-webkit-scrollbar {
		width: 5px;
	}


	.quick_main::-webkit-scrollbar-track {
		background: transparent;
	}


	.quick_main::-webkit-scrollbar-thumb {
		background:
			color-mix(in srgb,
				var(--scroll-thumb) 80%,
				transparent);

		border-radius: var(--radius-round);

		transition:
			background-color var(--transition-fast);
	}


	.quick_main::-webkit-scrollbar-thumb:hover {
		background:
			linear-gradient(180deg,
				var(--primary),
				var(--accent-purple));
	}


	/* Firefox */

	.quick_main {
		scrollbar-width: thin;

		scrollbar-color:
			var(--scroll-thumb) transparent;
	}


	/* 
   NOTE CARD
    */

	.message_note_box {
		position: relative;

		width: 100%;
		min-width: 0;

		/*
     * DO NOT set a fixed height.
     * The content is allowed to make the card taller.
     */
		height: auto;
		min-height: 104px;

		display: flex;
		flex-direction: column;

		gap: 0.55rem;

		padding:
			0.9rem 0.95rem 0.8rem;

		border:
			1px solid var(--glass-border);

		border-radius: var(--radius-md);

		background:
			linear-gradient(145deg,
				color-mix(in srgb,
					var(--bg-surface) 94%,
					var(--accent-purple) 6%),
				var(--glass));

		box-shadow:
			var(--shadow-xs),
			inset 0 1px 0 rgba(255, 255, 255, 0.035);

		overflow: visible;

		isolation: isolate;

		transition:
			transform var(--transition-fast),
			border-color var(--transition-fast),
			box-shadow var(--transition-fast),
			background-color var(--transition-fast);
	}


	/*
 * Tiny accent line on the left.
 * Barely visible on normal cards.
 */

	.message_note_box::before {
		content: "";

		position: absolute;

		top: 12px;
		bottom: 12px;
		left: 0;

		width: 2px;

		border-radius: var(--radius-round);

		background:
			color-mix(in srgb,
				var(--accent-purple) 0%,
				transparent);

		transition:
			background-color var(--transition-normal);
	}


	/* ---------- Hover ---------- */

	.message_note_box:hover {
		transform: translateY(-1px);

		border-color:
			color-mix(in srgb,
				var(--accent-purple) 22%,
				var(--glass-border));

		background:
			linear-gradient(145deg,
				color-mix(in srgb,
					var(--bg-surface-hover) 95%,
					var(--accent-purple) 5%),
				var(--glass));

		box-shadow:
			var(--shadow-sm),
			0 8px 22px color-mix(in srgb,
				var(--accent-purple) 7%,
				transparent);
	}


	.message_note_box:hover::before {
		background:
			color-mix(in srgb,
				var(--accent-purple) 50%,
				transparent);
	}


	/* 
   NOTE HEADER
    */

	.header_note_main {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;

		gap: 0.6rem;

		min-width: 0;
	}


	/* 
   NOTE TITLE
    */

	.title_note_box {
		flex: 1 1 auto;

		min-width: 0;
	}


	.title_note_box h3 {
		margin: 0;

		color: var(--text-primary);

		font-size: var(--text-md);
		font-weight: 700;

		line-height: 1.35;

		letter-spacing: -0.01em;

		/*
     * Long titles are allowed to wrap.
     */
		white-space: normal;

		overflow-wrap: anywhere;
		word-break: break-word;
	}


	/* 
   HEADER ACTIONS
    */

	.btn_title_note {
		flex-shrink: 0;

		display: flex;
		align-items: center;

		gap: 3px;
	}


	/* Pin + menu */

	.pin_message_note,
	.menu_message_note {
		width: 26px;
		height: 26px;

		flex: 0 0 26px;

		display: flex;
		align-items: center;
		justify-content: center;

		color: var(--text-muted);

		border-radius: var(--radius-sm);

		transition:
			background-color var(--transition-fast),
			color var(--transition-fast),
			transform var(--transition-fast);
	}


	.pin_message_note svg,
	.menu_message_note svg {
		width: 16px;
		height: 16px;

		display: block;
	}


	/* Menu */

	.menu_message_note {
		cursor: pointer;
	}


	.menu_message_note:hover {
		color: var(--text-primary);

		background: var(--overlay);
	}


	.menu_message_note:active {
		transform: scale(0.92);
	}


	/* Keyboard accessibility */

	.menu_message_note:focus-visible {
		outline: none;

		box-shadow: var(--focus-ring);
	}


	/* Pin icon is hidden unless pinned */

	.pin_message_note {
		display: none;

		transform:
			rotate(30deg) translateY(-1px);
	}


	/* 
   NOTE DESCRIPTION
    */

	.description_note {
		min-width: 0;

		width: 100%;

		/*
     * Allows the paragraph to determine
     * the card height.
     */
		height: auto;
	}


	.description_note p {
		margin: 0;

		width: 100%;

		color: var(--text-opacity2);

		font-size: var(--text-sm);
		font-weight: 400;

		line-height: 1.65;

		/*
     * Normal text wraps naturally.
     */
		white-space: normal;

		/*
     * Extremely long strings won't break the card.
     */
		overflow-wrap: anywhere;
		word-break: break-word;

		/*
     * Preserve whitespace entered by the user
     * without forcing horizontal overflow.
     */
		text-wrap: pretty;
	}


	/* 
   NOTE TIME
    */

	.time_note_ago {
		width: 100%;

		display: flex;
		align-items: center;
		justify-content: flex-end;

		margin-top: auto;

		padding-top: 0.1rem;
	}


	.time_note_ago p {
		margin: 0;

		color: var(--text-muted);

		font-size: 0.68rem;
		font-weight: 500;

		line-height: 1.2;

		white-space: nowrap;
	}


	/* 
   PINNED NOTE
    */

	.message_note_box[data-pin="1"] {
		background:
			linear-gradient(145deg,
				color-mix(in srgb,
					var(--accent-purple) 9%,
					var(--bg-surface)),
				color-mix(in srgb,
					var(--accent-purple) 3%,
					var(--glass)));

		border-color:
			color-mix(in srgb,
				var(--accent-purple) 28%,
				var(--glass-border));

		box-shadow:
			var(--shadow-xs),
			inset 0 1px 0 rgba(255, 255, 255, 0.045),
			0 0 18px color-mix(in srgb,
				var(--accent-purple) 6%,
				transparent);
	}


	.message_note_box[data-pin="1"]::before {
		background:
			linear-gradient(180deg,
				var(--primary),
				var(--accent-purple));
	}


	.message_note_box[data-pin="1"] .title_note_box h3 {
		color:
			color-mix(in srgb,
				var(--accent-purple) 88%,
				var(--text-primary));
	}


	.message_note_box[data-pin="1"] .description_note p {
		color:
			color-mix(in srgb,
				var(--accent-purple) 42%,
				var(--text-primary));
	}


	.message_note_box[data-pin="1"] .time_note_ago p {
		color:
			color-mix(in srgb,
				var(--accent-purple) 62%,
				var(--text-muted));
	}


	.message_note_box[data-pin="1"] .menu_message_note {
		color:
			color-mix(in srgb,
				var(--accent-purple) 80%,
				var(--text-muted));
	}


	.message_note_box[data-pin="1"] .pin_message_note {
		display: flex;

		color:
			color-mix(in srgb,
				var(--accent-purple) 85%,
				var(--text-primary));
	}


	/* 
   NOTE DROPDOWN
    */

	.dropdown_note_message {
		position: absolute;

		top: 43px;
		right: 10px;

		min-width: 154px;

		display: flex;
		align-items: stretch;

		gap: 5px;

		padding: 5px;

		background:
			color-mix(in srgb,
				var(--bg-surface) 94%,
				transparent);

		border:
			1px solid var(--border-color);

		border-radius: var(--radius-md);

		box-shadow:
			var(--shadow-lg);

		backdrop-filter:
			var(--blur-glass);

		-webkit-backdrop-filter:
			var(--blur-glass);

		z-index: var(--z-dropdown);

		transform-origin:
			top right;

		will-change:
			transform,
			opacity;
	}


	/* Dropdown arrow */

	.dropdown_note_message::before {
		content: "";

		position: absolute;

		width: 10px;
		height: 10px;

		top: -5px;
		right: 11px;

		background:
			var(--bg-surface);

		border-left:
			1px solid var(--border-color);

		border-top:
			1px solid var(--border-color);

		transform:
			rotate(45deg);

		z-index: -1;
	}


	/* 
   DROPDOWN BUTTONS
    */

	.pin_mess_note,
	.delete_mess_note {
		flex: 1;

		min-height: 34px;

		display: flex;
		align-items: center;
		justify-content: center;

		gap: 5px;

		padding:
			0.4rem 0.55rem;

		border:
			1px solid transparent;

		border-radius: var(--radius-sm);

		background:
			var(--glass);

		color: var(--text-secondary);

		font-size: var(--text-xs);
		font-weight: 600;

		cursor: pointer;

		transition:
			background-color var(--transition-fast),
			color var(--transition-fast),
			border-color var(--transition-fast),
			transform var(--transition-fast);
	}


	.pin_mess_note svg,
	.delete_mess_note svg {
		width: 17px;
		height: 17px;

		flex-shrink: 0;
	}


	.pin_mess_note svg {
		transform: rotate(20deg);
	}


	.pin_mess_note:hover {
		color: var(--accent-purple);

		background:
			color-mix(in srgb,
				var(--accent-purple) 11%,
				transparent);

		border-color:
			color-mix(in srgb,
				var(--accent-purple) 18%,
				transparent);
	}


	.delete_mess_note {
		color: var(--accent-red);
	}


	.delete_mess_note:hover {
		background:
			var(--accent-red-opacity);

		border-color:
			color-mix(in srgb,
				var(--accent-red) 20%,
				transparent);
	}


	.pin_mess_note:active,
	.delete_mess_note:active {
		transform: scale(0.96);
	}


	/* 
   DROPDOWN STATES
    */

	[data-dropdown="hide"] .dropdown_note_message {
		opacity: 0;

		visibility: hidden;

		pointer-events: none;
		user-select: none;

		transform:
			translateY(-6px) scale(0.94);

		z-index: -1;
	}


	[data-dropdown="show"] .dropdown_note_message {
		opacity: 1;

		visibility: visible;

		pointer-events: auto;

		z-index: var(--z-dropdown);

		animation:
			quick-note-dropdown-in 180ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
	}


	@keyframes quick-note-dropdown-in {
		from {
			opacity: 0;

			transform:
				translateY(-6px) scale(0.94);
		}

		to {
			opacity: 1;

			transform:
				translateY(0) scale(1);
		}
	}


	/* 
   EMPTY STATE
    */

	/*
 * IMPORTANT:
 * Your current JS generates:
 *
 * #note_box_empty
 *
 * NOT .note_box_empty
 */

	#note_box_empty {
		width: 100%;
		min-height: 132px;

		display: flex;
		flex-direction: column;

		align-items: center;
		justify-content: center;

		gap: 5px;

		padding: 1rem;

		text-align: center;

		background:
			linear-gradient(145deg,
				color-mix(in srgb,
					var(--accent-purple) 5%,
					var(--glass)),
				var(--glass));

		border:
			1px dashed color-mix(in srgb,
				var(--accent-purple) 20%,
				var(--glass-border));

		border-radius: var(--radius-md);

		box-shadow:
			inset 0 1px 0 rgba(255, 255, 255, 0.03);
	}


	#note_box_empty h3 {
		margin: 0;

		color: var(--text-secondary);

		font-size: var(--text-sm);
		font-weight: 650;
	}


	#note_box_empty p {
		margin: 0;

		max-width: 220px;

		color: var(--text-muted);

		font-size: var(--text-xs);
		line-height: 1.5;
	}


	/* 
   ADD QUICK NOTE BUTTON
    */

	.quick_button_add {
		min-width: 0;

		width: 100%;

		flex-shrink: 0;
	}


	.add_quick_note {
		width: 100%;

		min-height: 42px;

		display: flex;
		align-items: center;
		justify-content: center;

		padding:
			0.65rem 1rem;

		color: var(--accent-purple);

		background:
			linear-gradient(145deg,
				color-mix(in srgb,
					var(--accent-purple) 7%,
					var(--bg-surface)),
				var(--bg-surface));

		border:
			1px solid color-mix(in srgb,
				var(--accent-purple) 18%,
				var(--glass-border));

		border-radius: var(--radius-md);

		font-size: var(--text-sm);
		font-weight: 650;

		cursor: pointer;

		box-shadow:
			var(--shadow-xs),
			inset 0 1px 0 rgba(255, 255, 255, 0.04);

		transition:
			transform var(--transition-fast),
			background-color var(--transition-fast),
			border-color var(--transition-fast),
			box-shadow var(--transition-fast);
	}


	.add_quick_note:hover {
		background:
			linear-gradient(145deg,
				color-mix(in srgb,
					var(--accent-purple) 11%,
					var(--bg-surface-hover)),
				var(--bg-surface-hover));

		border-color:
			color-mix(in srgb,
				var(--accent-purple) 30%,
				var(--glass-border));

		box-shadow:
			var(--shadow-sm),
			0 0 18px color-mix(in srgb,
				var(--accent-purple) 7%,
				transparent);
	}


	.add_quick_note:active {
		transform: scale(0.985);
	}


	.add_quick_note:focus-visible {
		outline: none;

		box-shadow:
			var(--focus-ring);
	}


	/* 
   RESPONSIVE
    */

	@media (max-width: 1100px) {

		.quick_header {
			gap: 0.5rem;
		}

		.quick_btn_title {
			padding-inline: 0.65rem;
		}

		.text_box_title p {
			display: none;
		}
	}


	@media (max-width: 768px) {

		.quick-notes {
			gap: var(--spacing-sm);
		}

		.svg_box_title {
			width: 44px;
			height: 44px;

			flex-basis: 44px;

			padding: 2px;
		}

		.quick_title {
			gap: 0.65rem;
		}

		.text_box_title h3 {
			font-size: var(--text-md);
		}

		.quick_btn_title {
			min-height: 34px;

			padding:
				0.5rem 0.65rem;

			font-size: 0.72rem;
		}

		.message_note_box {
			padding:
				0.8rem 0.85rem 0.75rem;
		}
	}


	@media (max-width: 480px) {

		.quick_header {
			align-items: center;
		}

		.svg_box_title {
			width: 38px;
			height: 38px;

			flex-basis: 38px;
		}

		.text_box_title h3 {
			font-size: 0.95rem;
		}

		.quick_btn_title {
			font-size: 0;

			width: 34px;
			height: 34px;

			padding: 0;

			border-radius: 50%;
		}

		.quick_btn_title svg {
			width: 16px;
			height: 16px;
		}

		.message_note_box {
			min-height: 96px;
		}

		.dropdown_note_message {
			right: 5px;
		}

		.add_quick_note {
			min-height: 40px;

			font-size: var(--text-xs);
		}
	}
</style>
<div class="quick_header">
	<div class="quick_title">
		<div class="svg_box_title">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <!-- Note -->
				<rect x="16" y="10" width="32" height="44" rx="4" /> <!-- Lines -->
				<path d="M23 22H41">
					<animate attributeName="stroke-dasharray" values="0 18;18 0;18 0" dur="2.5s" repeatCount="indefinite" />
				</path>
				<path d="M23 30H38">
					<animate attributeName="stroke-dasharray" values="0 15;15 0;15 0" dur="2.5s" begin="0.25s" repeatCount="indefinite" />
				</path>
				<path d="M23 38H35">
					<animate attributeName="stroke-dasharray" values="0 12;12 0;12 0" dur="2.5s" begin="0.5s" repeatCount="indefinite" />
				</path> <!-- Pencil -->
				<g>
					<path d="M40 42L50 32L53 35L43 45L39 46L40 42">
						<animateTransform attributeName="transform" type="translate" values="0 0;0 -1.5;0 0" dur="1.8s" repeatCount="indefinite" />
					</path>
				</g>
			</svg>
		</div>
		<div class="text_box_title">
			<h3>Quick Notes</h3>
			<p>Jot down your thoughts</p>
		</div>
	</div>
	<button class="quick_btn_title" type="button">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
			<line x1="12" y1="5" x2="12" y2="19" />
			<line x1="5" y1="12" x2="19" y2="12" />
		</svg> New Note</button>
</div>
<div class="quick_main">
	<div class="child_quick_main">
	</div>
</div>
<div class="quick_button_add">
	<button class="add_quick_note" type="button">+ Add Quick Note</button>
</div>