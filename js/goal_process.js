import { goal_input_value } from "./export-input-value.js";
const object_goal = {
  goal_title: document.querySelector(".goal-name"),
  goal_subtitle: document.querySelector(".goal-description"),
  priority: document.querySelector(".goal-badge.Priority"),
  priorityTxt: document.querySelector(".goal-badge.Priority .badge-text"),
  status: document.querySelector(".goal-badge.Status"),
  statusTxt: document.querySelector(".goal-badge.Status .badge-text"),
  deadline: document.querySelector(".goal-deadline"),
  deadline_footer: document.querySelector(".stat-daedline"),
};

function getRemainingTime(deadline) {
  const now = new Date();
  const end = new Date(deadline);

  if (end <= now) {
    return "Expired";
  }

  let years = end.getFullYear() - now.getFullYear();
  let months = end.getMonth() - now.getMonth();
  let days = end.getDate() - now.getDate();
  let hours = end.getHours() - now.getHours();
  let minutes = end.getMinutes() - now.getMinutes();

  if (minutes < 0) {
    minutes += 60;
    hours--;
  }

  if (hours < 0) {
    hours += 24;
    days--;
  }

  if (days < 0) {
    const previousMonth = new Date(
      end.getFullYear(),
      end.getMonth(),
      0,
    ).getDate();

    days += previousMonth;
    months--;
  }

  if (months < 0) {
    months += 12;
    years--;
  }

  if (years > 0) {
    return `${years} year${years > 1 ? "s" : ""} left`;
  }

  if (months > 0) {
    return `${months} month${months > 1 ? "s" : ""} left`;
  }

  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} left`;
  }

  if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} left`;
  }

  return `${minutes} minute${minutes > 1 ? "s" : ""} left`;
}

function getTimePast(date) {
  const diff = Date.now() - new Date(date).getTime();

  const minute = Math.floor(diff / (1000 * 60));
  const hour = Math.floor(diff / (1000 * 60 * 60));
  const day = Math.floor(diff / (1000 * 60 * 60 * 24));
  const month = Math.floor(day / 30);
  const year = Math.floor(day / 365);

  const rtf = new Intl.RelativeTimeFormat("en", {
    numeric: "auto",
  });

  if (minute < 60) return rtf.format(-minute, "minute");

  if (hour < 24) return rtf.format(-hour, "hour");

  if (day < 30) return rtf.format(-day, "day");

  if (month < 12) return rtf.format(-month, "month");

  return rtf.format(-year, "year");
}

const priorityClass = ["High", "Medium", "Low"];
const statusClass = ["Pending", "Progress", "Completed"];

const goalForm = document.getElementById("goalForm");
goalForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const response = await fetch("api/edit_modal_process.php", {
    method: "POST",
    body: new FormData(e.target),
  });
  const result = await response.json();
  if (result.success) {
    object_goal.goal_title.textContent = result.data.title;
    object_goal.goal_subtitle.textContent = result.data.description;
    object_goal.deadline.textContent = getRemainingTime(result.data.deadLine);
    object_goal.deadline_footer.textContent = getTimePast(
      result.data.updated_at,
    );
    priorityClass.forEach((item) => {
      object_goal.priority.classList.remove(item);
    });
    statusClass.forEach((item) => {
      object_goal.status.classList.remove(item);
    });
    object_goal.priority.classList.add(result.data.priority);
    object_goal.priorityTxt.textContent = result.data.priority;
    object_goal.status.classList.add(result.data.status);
    object_goal.statusTxt.textContent = result.data.status;
    const modal_goal = document.querySelector(".modal-wrapper");
    modal_goal.dataset.modal = "hide";
  }else {
      const message_box = document.querySelector(".message-box-container");
      if (message_box.dataset.log == "in" || result.message != "") {

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
      }
  }
  goal_input_value();
});
