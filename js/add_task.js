const task_object = {
  modal: document.querySelector(".modal"),
  backdrop: document.querySelector(".modal__backdrop"),
  addButton: document.querySelector(".todo-add-button"),
  form: document.querySelector(".modal .todo-form"),
  submitButton: document.querySelector(".todo-form__submit"),
  todo_counter__number: document.querySelector(".todo-counter__number"),
};

const taskFilter = {
  status: "all",

  category: "all",

  priority: "all",
};

function openModal() {
  task_object.modal.dataset.state = "open";
}

function closeModal() {
  task_object.modal.dataset.state = "close";
}

function toggleModal() {
  task_object.modal.dataset.state =
    task_object.modal.dataset.state === "open" ? "close" : "open";
}

task_object.backdrop.addEventListener("click", toggleModal);
task_object.addButton.addEventListener("click", toggleModal);

task_object.form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(task_object.form);

  const originalText = task_object.submitButton.textContent;

  task_object.submitButton.disabled = true;
  task_object.submitButton.textContent = "Adding Task";

  try {
    const response = await fetch("php-sql/add_task_db.php", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Request failed.");
    }

    const result = await response.json();

    if (result.success) {
      await loadTasks(currentSort);
      await progress();
      task_object.form.reset();
      closeModal();
    } else {
      alert(result.message);
    }
  } catch (error) {
    console.error(error);
    alert(error.message);
  } finally {
    task_object.submitButton.disabled = false;
    task_object.submitButton.textContent = originalText;
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  Progress.init();

  await loadTasks();

  await progress();
});

let currentSort = "newest";
async function loadTasks(sort = currentSort) {
  currentSort = sort;

  const params = new URLSearchParams({
    sort: currentSort,

    status: taskFilter.status,

    category: taskFilter.category,

    priority: taskFilter.priority,
  });
  const response = await fetch(`get-info/get_tasks.php?${params}`);

  const result = await response.json();
  task_object.todo_counter__number.textContent = `${result.data.length}`;
  if (result.success) {
    const container = document.querySelector(".todo-items");
    container.innerHTML = "";
    if (result.data.length > 0) {
      result.data.forEach((task) => {
        container.innerHTML += `<article class="todo-item ${task.state}" data-id="${task.id_task}">

    <div class="todo-main">

        <label class="todo-checkbox">

            <input
              type="checkbox"
              class="todo-checkbox__input"
              ${task.state === "Complete" ? "checked" : ""}
              data-id="${task.id_task}">

            <span class="todo-checkbox__box">

                <svg viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="3">

                    <polyline points="20 6 9 17 4 12"/>

                </svg>

            </span>

        </label>

        <h3 class="todo-title">
            ${task.task}
        </h3>

    </div>

    <div class="todo-meta">

        <div
            class="category-todo"
            data-category="${task.category}">

            <svg
                class="category-dot"
                viewBox="0 0 24 24"
                fill="currentColor">

                <circle cx="12" cy="12" r="6"></circle>

            </svg>

            <span>${task.category}</span>

        </div>

        <div class="leftTime-task">

            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.75">

                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>

            </svg>

            <span>${formatTime(task.time)}</span>

        </div>

        <div
            class="todo-priority"
            data-todo_priority="${task.priority}">

            ${task.priority}

        </div>
        <div class="menu_edit">
          <button
            class="menu-todoItem"
            type="button">

            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.75">

                <circle cx="12" cy="4" r="1"/>
                <circle cx="12" cy="12" r="1"/>
                <circle cx="12" cy="20" r="1"/>

            </svg>

        </button>
        
        							<div class="dropdown_Task">
								<button type="button" class="task_dd_btn edit">Edit</button>
								<button type="button" class="task_dd_btn delete">Delete</button>
							</div>
        </div>


    </div>

</article>`;
      });
    } else {
      container.innerHTML = `	<div class="empty_task_container">
		<div class="empty_task">There are no tasks</div>
	</div>`;
    }
  }
}

function formatTime(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;

  return `${hours}h ${mins}m`;
}

document.addEventListener("change", async (e) => {
  if (!e.target.classList.contains("todo-checkbox__input")) return;

  const id = e.target.dataset.id;

  const state = e.target.checked ? "Complete" : "Incomplete";

  try {
    const response = await fetch("get-info/update_task_state.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        state,
      }),
    });

    const result = await response.json();

    const article = e.target.closest(".todo-item");

    if (e.target.checked) {
      article.classList.remove("Incomplete");
      article.classList.add("Complete");
    } else {
      article.classList.remove("Complete");
      article.classList.add("Incomplete");
    }

    if (!result.success) {
      alert(result.message);
    }
  } catch (err) {
    console.log(err);
  }
  await progress();
});

let Objects = {
  modal: document.querySelector(".modal_edit"),
  backdrop: document.querySelector(".modal_edit .modal__backdrop"),
  edit_form: document.querySelector(".modal_edit .todo-form"),
};

function open_modal() {
  Objects.modal.dataset.state = "open";
}
function close_modal() {
  Objects.modal.dataset.state = "close";
}

document.addEventListener("click", async (e) => {
  const deleteBtn = e.target.closest(".task_dd_btn.delete");

  if (!deleteBtn) return;

  const item_delete = deleteBtn.closest(".todo-item");
  const id = item_delete.dataset.id;

  const response = await fetch("get-info/delete_task.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  const result = await response.json();

  if (result.success) {
    await loadTasks(currentSort);
    await progress();
  } else {
    console.log(result.message);
  }
});

document.addEventListener("click", async (e) => {
  const editBtn = e.target.closest(".task_dd_btn.edit");
  if (!editBtn) return;
  const item_edit = editBtn.closest(".todo-item");
  const id = item_edit.dataset.id;

  const response = await fetch("get-info/get_edit_task.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  const result = await response.json();
  if (result.success) {
    Objects.edit_form.dataset.id = id;
    Objects.edit_form.task.value = result.data.task;
    Objects.edit_form.category.value = result.data.category;
    Objects.edit_form.priority.value = result.data.priority;
    const hours = Math.floor(result.data.time / 60);
    const minute = result.data.time % 60;
    Objects.edit_form.duration_hour.value = hours;
    Objects.edit_form.duration_minute.value = minute;
    open_modal();
  }
  Objects.backdrop.addEventListener("click", close_modal);
});

Objects.edit_form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(Objects.edit_form);
  formData.append("id", Objects.edit_form.dataset.id);
  const send_form = await fetch("get-info/post_edit_task.php", {
    method: "POST",
    body: formData,
  });
  const res = await send_form.json();
  if (res.success) {
    await loadTasks(currentSort);
    await progress();
    close_modal();
  }
});

const dropdown = document.querySelector(".todo-sort-dropdown");
const button = dropdown.querySelector(".todo-sort__button");

button.addEventListener("click", () => {
  dropdown.classList.toggle("active");
});

document.addEventListener("click", (e) => {
  if (!dropdown.contains(e.target)) {
    dropdown.classList.remove("active");
  }
});
document.addEventListener("click", (e) => {
  const item = e.target.closest(".sort-item");

  if (!item) return;

  const sort = item.dataset.sort;

  document.querySelector(".sort-current").textContent = item.textContent.trim();

  document
    .querySelectorAll(".sort-item")
    .forEach((btn) => btn.classList.remove("active"));

  item.classList.add("active");

  document.querySelector(".todo-sort-dropdown").classList.remove("active");

  loadTasks(sort);
});

const filter = document.querySelector(".todo-filter");
const filterButton = document.querySelector(".todo-filter__button");

filterButton.addEventListener("click", (e) => {
  e.stopPropagation();

  filter.classList.toggle("active");
});

document.addEventListener("click", (e) => {
  if (!filter.contains(e.target)) {
    filter.classList.remove("active");
  }
});

const filterItems = document.querySelectorAll(".filter-item");

filterItems.forEach((item) => {
  item.addEventListener("click", () => {
    const type = item.dataset.filter;

    const value = item.dataset.value;

    taskFilter[type] = value;

    document
      .querySelectorAll(`.filter-item[data-filter="${type}"]`)
      .forEach((btn) => {
        btn.classList.remove("active");
      });

    console.log(taskFilter);
    item.classList.add("active");

    loadTasks(currentSort);
  });
});
document.querySelector(".filter-reset").addEventListener("click", () => {
  taskFilter.status = "all";
  taskFilter.category = "all";
  taskFilter.priority = "all";

  document.querySelectorAll(".filter-item").forEach((item) => {
    item.classList.remove("active");
  });

  document
    .querySelectorAll('.filter-item[data-value="all"]')
    .forEach((item) => {
      item.classList.add("active");
    });

  document.querySelector(".todo-filter").classList.remove("active");

  loadTasks(currentSort);
});

const Ui_content = {
  progressWrapper: document.querySelector(".progress-circle"),

  progress_goal_value: document.querySelector(".progress-goal-value"),

  progressCircle: document.querySelector(".progress-value"),

  progressPercent: document.querySelector(".progress-percent"),

  progressFill: document.querySelector(".progress-fill"),

  stat_value: document.querySelector(".stat-value"),
};

// ========================================
// Get Progress From PHP
// ========================================
async function progress() {
  try {
    const response = await fetch("get-info/get_progress.php");
    const result = await response.json();

    if (!result.success) return;

    const total = Number(result.data.total) || 0;
    const completed = Number(result.data.completed) || 0;

    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

    // نوار پیشرفت
    if (Ui_content.progressFill) {
      Ui_content.progressFill.style.width = `${percent}%`;
    }

    if (Ui_content.stat_value) {
      Ui_content.stat_value.textContent = `${completed} / ${total}`;
    }

    // متن کنار نوار
    if (Ui_content.progress_goal_value) {
      Ui_content.progress_goal_value.textContent = `${percent}%`;
    }

    // ذخیره برای Progress
    if (Ui_content.progressWrapper) {
      Ui_content.progressWrapper.dataset.progress = percent;
    }

    Progress.set(percent);
  } catch (error) {
    console.error("Progress Error:", error);
  }
}

// ========================================
// Progress Circle
// ========================================
const Progress = {
  circle: Ui_content.progressCircle,

  text: Ui_content.progressPercent,

  wrapper: Ui_content.progressWrapper,

  radius: 0,

  circumference: 0,

  animationFrame: null,

  init() {
    if (!this.circle) return;

    this.radius = this.circle.r.baseVal.value;

    this.circumference = 2 * Math.PI * this.radius;

    this.circle.style.strokeDasharray = this.circumference;

    this.circle.style.strokeDashoffset = this.circumference;

    const percent = Number(this.wrapper.dataset.progress) || 0;

    this.set(percent);
  },

  set(percent) {
    percent = Math.max(0, Math.min(100, Number(percent)));

    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }

    const duration = 200;

    const startOffset =
      Number(this.circle.style.strokeDashoffset) || this.circumference;

    const targetOffset =
      this.circumference - (percent / 100) * this.circumference;

    const startTime = performance.now();

    const animate = (time) => {
      const elapsed = time - startTime;

      const progress = Math.min(elapsed / duration, 1);

      // حرکت نرم
      const ease = 1 - Math.pow(1 - progress, 3);

      const currentOffset = startOffset + (targetOffset - startOffset) * ease;

      this.circle.style.strokeDashoffset = currentOffset;

      // عدد وسط دایره
      if (this.text) {
        const currentPercent = Math.round(percent * ease);

        this.text.textContent = `${currentPercent}%`;
      }

      if (progress < 1) {
        this.animationFrame = requestAnimationFrame(animate);
      }
    };

    this.animationFrame = requestAnimationFrame(animate);
  },
};
