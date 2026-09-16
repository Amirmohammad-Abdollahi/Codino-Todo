import { startStep, completeStep, finishLoader } from "./load-animation.js";
import { goal_input_value } from "./export-input-value.js";
import { load_note_mess } from "./note-item.js";

localStorage.setItem("focus-state", "stop");

//#region بخش کاربر

const UI_OBJ = {
  usernameView: document.getElementById("usernameView"),
  profile: document.querySelector(".profile img"),
  profileSetupForm: document.getElementById("profileSetupForm"),
  profile_modal: document.querySelector(".profile-modal-wrapper"),
  goal_name: document.querySelector(".goal-name"),
};

//#endregion

//#region بخش گل آبجکت

const goalObj = {
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

  // اگر گذشته باشه
  if (end <= now) {
    return "Expired";
  }

  let years = end.getFullYear() - now.getFullYear();
  let months = end.getMonth() - now.getMonth();
  let days = end.getDate() - now.getDate();
  let hours = end.getHours() - now.getHours();
  let minutes = end.getMinutes() - now.getMinutes();

  // دقیقه
  if (minutes < 0) {
    minutes += 60;
    hours--;
  }

  // ساعت
  if (hours < 0) {
    hours += 24;
    days--;
  }

  // روز
  if (days < 0) {
    const previousMonth = new Date(
      end.getFullYear(),
      end.getMonth(),
      0,
    ).getDate();

    days += previousMonth;
    months--;
  }

  // ماه
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

//#endregion

//#region بخش روز streak
const streakObj = {
  streakTime: document.querySelector(".streak-value"),
};

function streakDate(dateString) {
  const start = new Date(dateString);
  const now = new Date();

  if (isNaN(start.getTime())) {
    return "";
  }

  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  let days = now.getDate() - start.getDate();
  let hours = now.getHours() - start.getHours();
  let minutes = now.getMinutes() - start.getMinutes();

  // دقیقه
  if (minutes < 0) {
    minutes += 60;
    hours--;
  }

  // ساعت
  if (hours < 0) {
    hours += 24;
    days--;
  }

  // روز
  if (days < 0) {
    const daysInPrevMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      0,
    ).getDate();

    days += daysInPrevMonth;
    months--;
  }

  // ماه
  if (months < 0) {
    months += 12;
    years--;
  }

  if (years > 0) {
    return `${years} year${years > 1 ? "s" : ""}`;
  }

  if (months > 0) {
    return `${months} month${months > 1 ? "s" : ""}`;
  }

  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""}`;
  }

  if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""}`;
  }

  return `${minutes} minute${minutes > 1 ? "s" : ""}`;
}
//#endregion

document.addEventListener("DOMContentLoaded", async () => {
  startStep("init");
  startStep("tasks");
  startStep("user");
  startStep("ready");
  const response = await fetch("php-sql/get_user.php");

  const result = await response.json();

  if (result.success) {
    const txtPalace = result.data.user;

    UI_OBJ.usernameView.textContent = txtPalace.display_name;

    UI_OBJ.profile.src = txtPalace.avatar;

    UI_OBJ.goal_name.textContent = txtPalace.daily_goal;
    completeStep("user");
  }

  const goal_response = await fetch("get-info/get_goal.php");

  const goal_result = await goal_response.json();

  if (goal_result.success) {
    goalObj.goal_title.textContent = goal_result.data.title;

    goalObj.goal_subtitle.textContent = goal_result.data.description;

    goalObj.deadline.textContent = getRemainingTime(goal_result.data.deadLine);

    goalObj.deadline_footer.textContent = getTimePast(
      goal_result.data.updated_at,
    );

    priorityClass.forEach((item) => {
      goalObj.priority.classList.remove(item);
    });

    statusClass.forEach((item) => {
      goalObj.status.classList.remove(item);
    });

    goalObj.priority.classList.add(goal_result.data.priority);

    goalObj.priorityTxt.textContent = goal_result.data.priority;

    goalObj.status.classList.add(goal_result.data.status);

    goalObj.statusTxt.textContent = goal_result.data.status;

    completeStep("tasks");
  } else {
    const message_box = document.querySelector(".message-box-container");
    const message_box_text = document.querySelector(".message-box-container p");
    message_box_text.textContent = result.message;
    message_box.dataset.view = "show";
    if (message_box.dataset.view == "show") {
      setInterval(() => {
        message_box.dataset.view = "hide";
      }, 5000);
    }
  }

  load_note_mess();
  completeStep("init");
  completeStep("ready");
  document.querySelector(".focus-task p").textContent =
    localStorage.getItem("focus-task");
  finishLoader();

  const streakDaysjson = await fetch("get-info/get_streak.php");

  const streakDays = await streakDaysjson.json();

  if (streakDays.success) {
    streakObj.streakTime.textContent = streakDate(streakDays.data.created_at);
  } else {
    const message_box = document.querySelector(".message-box-container");
    const message_box_text = document.querySelector(".message-box-container p");
    message_box_text.textContent = result.message;
    message_box.dataset.view = "show";
    if (message_box.dataset.view == "show") {
      setInterval(() => {
        message_box.dataset.view = "hide";
      }, 5000);
    }
  }
  goal_input_value();
});
