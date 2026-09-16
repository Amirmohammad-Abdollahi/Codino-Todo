export async function add_task_dropdown() {
  const parent_box = document.querySelector(".focus-task-dropdown");

  if (!parent_box) return;

  try {
    const response = await fetch("get-info/get-task-dropdown.php");

    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }

    const result = await response.json();

    // ========================================
    // CLEAR PREVIOUS ITEMS
    // ========================================

    parent_box
      .querySelectorAll(".select-focus-task-dropdown")
      .forEach((item) => item.remove());

    const empty_message = document.querySelector("#focus-task-empty-message");

    if (empty_message) {
      empty_message.remove();
    }

    // ========================================
    // NO TASKS
    // ========================================

    if (!result.success && result.count) {
      parent_box.insertAdjacentHTML(
        "beforeend",
        `
        <div id="focus-task-empty-message">

          <div class="focus-task-empty-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              aria-hidden="true"
            >
              <path d="M9 12h6" />
              <path d="M12 9v6" />
              <rect
                x="3"
                y="4"
                width="18"
                height="16"
                rx="2"
              />
            </svg>
          </div>

          <div class="focus-task-empty-content">

            <h4>
              No incomplete tasks available
            </h4>

            <p>
              You currently have no incomplete tasks.
              Create a task first to start a focused session.
            </p>

          </div>

        </div>
        `,
      );

      return;
    }

    // ========================================
    // ERROR
    // ========================================

    if (!result.success) {
      const message_box = document.querySelector(".message-box-container");
      const message_box_text = document.querySelector(
        ".message-box-container p",
      );
      message_box_text.textContent = result.message;
      message_box.dataset.view = "show";
      if (message_box.dataset.view == "show") {
        setInterval(() => {
          message_box.dataset.view = "hide";
        }, 5000);
      }
      return;
    }

    // ========================================
    // ADD TASKS
    // ========================================

    const tasks = result.data;

    tasks.forEach((item) => {
      parent_box.insertAdjacentHTML(
        "beforeend",
        `
        <div class="select-focus-task-dropdown">
          ${item.task}
        </div>
        `,
      );
    });
  } catch (error) {
    console.error("Task Dropdown Error:", error);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  add_task_dropdown();
  const time = {
    real_time: localStorage.getItem("focus-time-now"),
  };

  const response = await fetch("php-sql/set_real_time_db.php", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(time),
  });
});
