<div class="modal_edit" data-state="close">

	<div class="modal__backdrop"></div>
	<form class="todo-form" method="POST" data-id="">
		<div class="field">
			<label class="field__label" for="edit-task">Task</label>
			<input
				id="edit-task"
				name="task"
				class="field__input"
				type="text"
				placeholder="What are you going to do?"
				maxlength="80"
				required>
		</div>

		<div class="field">
			<label class="field__label" for="category">Category</label>

			<select
				id="category"
				name="category"
				class="field__input">

				<option value="Development">Development</option>
				<option value="Learning">Learning</option>
				<option value="Health">Health</option>
				<option value="Hobby">Hobby</option>
			</select>
		</div>

		<div class="field">
			<label class="field__label">Duration</label>

			<div class="duration-picker">

				<select
					name="duration_hour"
					class="field__input">

					<option value="0">0 h</option>
					<option value="1">1 h</option>
					<option value="2">2 h</option>
					<option value="3">3 h</option>
					<option value="4">4 h</option>
					<option value="5">5 h</option>
					<option value="6">6 h</option>
					<option value="7">7 h</option>
					<option value="8">8 h</option>

				</select>

				<select
					name="duration_minute"
					class="field__input">

					<option value="0">00 min</option>
					<option value="5">05 min</option>
					<option value="10">10 min</option>
					<option value="15">15 min</option>
					<option value="20">20 min</option>
					<option value="25">25 min</option>
					<option value="30">30 min</option>
					<option value="35">35 min</option>
					<option value="40">40 min</option>
					<option value="45">45 min</option>
					<option value="50">50 min</option>
					<option value="55">55 min</option>

				</select>

			</div>
		</div>

		<div class="field">
			<label class="field__label" for="priority">Priority</label>

			<select
				id="priority"
				name="priority"
				class="field__input">

				<option value="High">High</option>
				<option value="Medium">Medium</option>
				<option value="Low">Low</option>

			</select>
		</div>

		<button
			class="todo-form__submit"
			type="submit">
			Add Task
		</button>

	</form>

</div>