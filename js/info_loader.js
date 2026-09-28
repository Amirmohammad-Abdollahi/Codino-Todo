import { startStep, completeStep, finishLoader } from "./load-animation.js";

const UI_OBJ = {
  usernameView: document.getElementById("usernameView"),
  profile: document.querySelector(".profile img"),
  goal_name: document.querySelector(".goal-name"),
};

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

const streakObj = {
  streakTime: document.querySelector(".streak-value"),
};

const priorityClass = ["High", "Medium", "Low"];
const statusClass = ["Pending", "Progress", "Completed"];

const NORMAL_USER_CODES = ["GUEST", "PROFILE_NOT_COMPLETED"];

const NORMAL_GOAL_CODES = ["GUEST", "PROFILE_NOT_COMPLETED", "GOAL_NOT_FOUND"];

const NORMAL_STREAK_CODES = [
  "GUEST",
  "STREAK_NOT_FOUND",
  "PROFILE_NOT_COMPLETED",
];

function getRemainingTime(deadline) {
  const now = new Date();
  const end = new Date(deadline);

  if (isNaN(end.getTime())) return "";

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
    days += new Date(end.getFullYear(), end.getMonth(), 0).getDate();

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
  const time = new Date(date).getTime();

  if (isNaN(time)) return "";

  const diff = Date.now() - time;

  if (diff < 0) return "";

  const minute = Math.floor(diff / 60000);
  const hour = Math.floor(diff / 3600000);
  const day = Math.floor(diff / 86400000);
  const month = Math.floor(day / 30);
  const year = Math.floor(day / 365);

  const rtf = new Intl.RelativeTimeFormat("en", {
    numeric: "auto",
  });

  if (minute < 60) {
    return rtf.format(-minute, "minute");
  }

  if (hour < 24) {
    return rtf.format(-hour, "hour");
  }

  if (day < 30) {
    return rtf.format(-day, "day");
  }

  if (month < 12) {
    return rtf.format(-month, "month");
  }

  return rtf.format(-year, "year");
}

function streakDate(dateString) {
  const start = new Date(dateString);
  const now = new Date();

  if (isNaN(start.getTime())) return "";

  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  let days = now.getDate() - start.getDate();
  let hours = now.getHours() - start.getHours();
  let minutes = now.getMinutes() - start.getMinutes();

  if (minutes < 0) {
    minutes += 60;
    hours--;
  }

  if (hours < 0) {
    hours += 24;
    days--;
  }

  if (days < 0) {
    days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();

    months--;
  }

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

function paintDelay(ms) {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      setTimeout(resolve, ms);
    });
  });
}

function withTimeout(work, ms, label) {
  return new Promise((resolve, reject) => {
    let finished = false;

    const timer = setTimeout(() => {
      if (finished) return;

      finished = true;
      reject(new Error(`${label} timed out after ${ms}ms`));
    }, ms);

    Promise.resolve()
      .then(work)
      .then((value) => {
        if (finished) return;

        finished = true;
        clearTimeout(timer);
        resolve(value);
      })
      .catch((error) => {
        if (finished) return;

        finished = true;
        clearTimeout(timer);
        reject(error);
      });
  });
}

async function fetchJSON(url, ms = 6000) {
  const controller = new AbortController();

  const timer = setTimeout(() => {
    controller.abort();
  }, ms);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        Accept: "application/json",
      },
    });

    const text = await response.text();

    let result;

    try {
      result = JSON.parse(text);
    } catch (error) {
      throw new Error(`Invalid JSON from ${url}`);
    }

    if (!response.ok) {
      throw new Error(
        result?.message || `Request failed with status ${response.status}`,
      );
    }

    return result;
  } finally {
    clearTimeout(timer);
  }
}

async function runStep(stepName, work) {
  startStep(stepName);

  try {
    await work();
  } catch (error) {
    console.error(`LOADER STEP ERROR [${stepName}]`, error);
  } finally {
    completeStep(stepName);
  }
}

function setupMessageBox() {
  const messageBox = document.querySelector(".message-box-container");

  const messageBoxText = messageBox?.querySelector("p");

  let messageTimeout = null;

  function showMessage(message) {
    if (!messageBox || !messageBoxText || !message) {
      return;
    }

    messageBoxText.textContent = message;
    messageBox.dataset.view = "show";

    if (messageTimeout) {
      clearTimeout(messageTimeout);
    }

    messageTimeout = setTimeout(() => {
      messageBox.dataset.view = "hide";
    }, 5000);
  }

  return {
    showMessage,
  };
}


async function initializeWorkspace() {
  const { showMessage } = setupMessageBox();

  try {
    localStorage.setItem("focus-state", "stop");
  } catch (error) {
    console.error("focus-state error:", error);
  }

  let load_note_mess = async () => {};
  let goal_input_value = () => {};

  try {
    const noteModule = await import("./note-item.js");

    if (typeof noteModule.load_note_mess === "function") {
      load_note_mess = noteModule.load_note_mess;
    }
  } catch (error) {
    console.error("note-item.js import error:", error);
  }

  try {
    const goalInputModule = await import("./export-input-value.js");

    if (typeof goalInputModule.goal_input_value === "function") {
      goal_input_value = goalInputModule.goal_input_value;
    }
  } catch (error) {
    console.error("export-input-value.js import error:", error);
  }

  await runStep("init", async () => {
    await paintDelay(120);
  });

  await runStep("user", async () => {
    const userResult = await fetchJSON("api/get_user.php", 6000);

    if (userResult.success && userResult.data?.user) {
      const user = userResult.data.user;

      if (UI_OBJ.usernameView) {
        UI_OBJ.usernameView.textContent = user.display_name ?? "";
      }

      if (UI_OBJ.profile && user.avatar) {
        UI_OBJ.profile.src = user.avatar;
      }

      if (UI_OBJ.goal_name) {
        UI_OBJ.goal_name.textContent = user.daily_goal ?? "";
      }

      return;
    }

    if (userResult.code && !NORMAL_USER_CODES.includes(userResult.code)) {
      showMessage(userResult.message || "Could not load user information.");
    }
  });

  await runStep("tasks", async () => {

    try {
      const goalResult = await fetchJSON("api/get_goal.php", 6000);

      if (goalResult.code === "GOAL_LOADED") {
        const goal = goalResult.data?.goal;

        if (goal) {
          if (goalObj.goal_title) {
            goalObj.goal_title.textContent = goal.title ?? "";
          }

          if (goalObj.goal_subtitle) {
            goalObj.goal_subtitle.textContent = goal.description ?? "";
          }

          if (goalObj.deadline) {
            goalObj.deadline.textContent = getRemainingTime(goal.deadLine);
          }

          if (goalObj.deadline_footer) {
            goalObj.deadline_footer.textContent = getTimePast(goal.updated_at);
          }

          if (goalObj.priority) {
            priorityClass.forEach((item) => {
              goalObj.priority.classList.remove(item);
            });

            if (goal.priority) {
              goalObj.priority.classList.add(goal.priority);
            }
          }

          if (goalObj.priorityTxt) {
            goalObj.priorityTxt.textContent = goal.priority ?? "";
          }

          if (goalObj.status) {
            statusClass.forEach((item) => {
              goalObj.status.classList.remove(item);
            });

            if (goal.status) {
              goalObj.status.classList.add(goal.status);
            }
          }

          if (goalObj.statusTxt) {
            goalObj.statusTxt.textContent = goal.status ?? "";
          }
        }
      } else if (
        goalResult.code &&
        !NORMAL_GOAL_CODES.includes(goalResult.code)
      ) {
        console.error("get_goal.php unexpected code:", goalResult.code);
      }
    } catch (error) {
      console.error("get_goal.php error:", error);
    }

    try {
      await withTimeout(() => load_note_mess(), 5000, "load_note_mess");
    } catch (error) {
      console.error("load_note_mess error:", error);
    }

    try {
      const focusTaskElement = document.querySelector(".focus-task p");

      const focusTask = localStorage.getItem("focus-task");

      if (focusTaskElement) {
        focusTaskElement.textContent = focusTask || "";
      }
    } catch (error) {
      console.error("Focus task error:", error);
    }
  });

  await runStep("ready", async () => {
    await paintDelay(120);
  });


  finishLoader();

  loadStreak(showMessage);
  loadGoalInput(goal_input_value);
}

async function loadStreak(showMessage) {
  try {
    const streakResult = await fetchJSON("api/get_streak.php", 6000);

    if (
      streakResult.success &&
      streakResult.data?.created_at &&
      streakObj.streakTime
    ) {
      streakObj.streakTime.textContent = streakDate(
        streakResult.data.created_at,
      );

      return;
    }

    if (streakResult.code && !NORMAL_STREAK_CODES.includes(streakResult.code)) {
      showMessage(streakResult.message || "Could not load streak information.");
    }
  } catch (error) {
    console.error("get_streak.php error:", error);
  }
}

function loadGoalInput(goal_input_value) {
  try {
    goal_input_value();
  } catch (error) {
    console.error("goal_input_value error:", error);
  }
}

function start() {
  initializeWorkspace().catch((error) => {
    console.error("Workspace initialization error:", error);
    finishLoader();
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", start, {
    once: true,
  });
} else {
  start();
}
