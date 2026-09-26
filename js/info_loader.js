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

//#region بخش Goal

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

  if (isNaN(end.getTime())) {
    return "";
  }

  // اگر تاریخ گذشته باشد
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
  const time = new Date(date).getTime();

  if (isNaN(time)) {
    return "";
  }

  const diff = Date.now() - time;

  const minute = Math.floor(diff / (1000 * 60));
  const hour = Math.floor(diff / (1000 * 60 * 60));
  const day = Math.floor(diff / (1000 * 60 * 60 * 24));
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

const priorityClass = ["High", "Medium", "Low"];
const statusClass = ["Pending", "Progress", "Completed"];

//#endregion

//#region بخش Streak

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
  //#region شروع Loader

  startStep("init");
  startStep("tasks");
  startStep("user");
  startStep("ready");

  //#endregion

  //#region Message Box

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

  //#endregion

  //#region Fetch Helper

  async function fetchJSON(url) {
    const response = await fetch(url);

    let result;

    try {
      result = await response.json();
    } catch (error) {
      throw new Error(`Invalid JSON response from ${url}`);
    }

    if (!response.ok) {
      throw new Error(
        result?.message || `Request failed with status ${response.status}`,
      );
    }

    return result;
  }

  //#endregion

  try {
    //#region User

    try {
      const userResult = await fetchJSON("php-sql/get_user.php");

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
      } else {
        /*
         * برای Guest یا هر وضعیت عادی،
         * فقط پیام را نمایش نمی‌دهیم مگر API واقعاً
         * یک خطای قابل نمایش داشته باشد.
         */

        if (
          userResult.code &&
          !["GUEST", "PROFILE_NOT_COMPLETED"].includes(userResult.code)
        ) {
          showMessage(userResult.message);
        }
      }
    } catch (error) {
      console.error("get_user.php error:", error);

      showMessage("Could not load user information.");
    }

    /*
     * این مرحله باید در هر حالت تمام شود.
     * حتی Guest بودن نباید Loader را متوقف کند.
     */

    completeStep("user");

    //#endregion

    //#region Goal

    try {
      const goalResult = await fetchJSON("get-info/get_goal.php");

      /*
       * -----------------------------------------------------
       * Goal وجود دارد
       * -----------------------------------------------------
       */

      if (goalResult.code === "GOAL_LOADED") {
        const goal = goalResult.data?.goal;

        if (!goal) {
          throw new Error("GOAL_LOADED received without goal data.");
        }

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

        // حذف Priority های قبلی
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

        // حذف Status های قبلی
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
      } else if (goalResult.code === "GUEST") {
        /*
         * -----------------------------------------------------
         * Guest
         * -----------------------------------------------------
         */
        console.log("Guest user. No goal data available.");
      } else if (goalResult.code === "PROFILE_NOT_COMPLETED") {
        /*
         * -----------------------------------------------------
         * Profile هنوز کامل نشده
         * -----------------------------------------------------
         */
        console.log("Profile is not completed yet.");
      } else if (goalResult.code === "GOAL_NOT_FOUND") {
        /*
         * -----------------------------------------------------
         * Goal هنوز ساخته نشده
         * -----------------------------------------------------
         */
      } else {
        /*
         * -----------------------------------------------------
         * خطای واقعی
         * -----------------------------------------------------
         */
        // showMessage(goalResult.message || "Could not load goal information.");
      }
    } catch (error) {
      // console.error("get_goal.php error:", error);

      // showMessage("Could not load goal information.");
    }

    /*
     * Goal در هر شرایطی مرحله‌اش تمام است.
     */

    completeStep("tasks");

    //#endregion

    //#region Notes

    try {
      await load_note_mess();
    } catch (error) {
      console.error("load_note_mess error:", error);

      /*
       * Notes نباید باعث گیر کردن Loader شود.
       */
    }

    //#endregion

    //#region Focus Task

    try {
      const focusTaskElement = document.querySelector(".focus-task p");

      const focusTask = localStorage.getItem("focus-task");

      if (focusTaskElement) {
        focusTaskElement.textContent = focusTask || "";
      }
    } catch (error) {
      console.error("Focus task error:", error);
    }

    //#endregion

    //#region تمام شدن مراحل اصلی Loader

    completeStep("init");
    completeStep("ready");

    /*
     * از اینجا به بعد Dashboard اصلی دیگر
     * نباید منتظر Streak یا Goal Input بماند.
     */

    finishLoader();

    //#endregion

    //#region Streak

    try {
      const streakResult = await fetchJSON("get-info/get_streak.php");

      if (
        streakResult.success &&
        streakResult.data?.created_at &&
        streakObj.streakTime
      ) {
        streakObj.streakTime.textContent = streakDate(
          streakResult.data.created_at,
        );
      } else if (
        /*
         * اگر Streak برای Guest یا کاربر جدید
         * وجود نداشته باشد، خطای UI نشان نمی‌دهیم.
         */
        streakResult.code &&
        !["GUEST", "STREAK_NOT_FOUND", "PROFILE_NOT_COMPLETED"].includes(
          streakResult.code,
        )
      ) {
        showMessage(streakResult.message);
      }
    } catch (error) {
      console.error("get_streak.php error:", error);

      /*
       * Streak اطلاعات جانبی است،
       * پس کل صفحه را خراب نمی‌کنیم.
       */
    }

    //#endregion

    //#region Goal Input

    try {
      goal_input_value();
    } catch (error) {
      console.error("goal_input_value error:", error);
    }

    //#endregion
  } catch (error) {
    /*
     * این catch برای خطاهای غیرمنتظره‌ی اصلی است.
     */

    console.error("Info loader error:", error);

    console.error("Error message:", error?.message);

    console.error("Error stack:", error?.stack);
  } finally {
    /*
     * این مهم‌ترین قسمت است.
     *
     * حتی اگر یک خطای غیرمنتظره قبل از finishLoader
     * رخ بدهد، Loader نباید برای همیشه روی صفحه بماند.
     */

    finishLoader();
  }
});
