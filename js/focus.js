//#region scrool part

let Minute = "";
let Second = "";
let Hour = "";

// ========================================
// WHEEL LISTS
// ========================================

const wheelLists = {
  hour: document.querySelector('.focus-session-wheel-list[data-unit="hour"]'),

  minute: document.querySelector(
    '.focus-session-wheel-list[data-unit="minute"]',
  ),

  second: document.querySelector(
    '.focus-session-wheel-list[data-unit="second"]',
  ),
};

// ========================================
// WHEEL VIEWPORTS
// ========================================

const wheelViewports = {
  hour: wheelLists.hour.parentElement,
  minute: wheelLists.minute.parentElement,
  second: wheelLists.second.parentElement,
};

// ========================================
// WHEEL UNITS
// ========================================

const wheelUnits = ["hour", "minute", "second"];

// ========================================
// SELECTED TIME
// ========================================

const selectedTime = {
  hour: 0,
  minute: 0,
  second: 0,
};

// ========================================
// SNAP TIMERS
// ========================================

const snapTimers = {
  hour: null,
  minute: null,
  second: null,
};

// ========================================
// WHEEL CONFIG
// ========================================

const wheelConfig = {
  hour: {
    min: 0,
    max: 23,
  },

  minute: {
    min: 0,
    max: 59,
  },

  second: {
    min: 0,
    max: 59,
  },
};

// ========================================
// GENERATE WHEEL ITEMS
// ========================================

function generateWheelItems(unit) {
  const { min, max } = wheelConfig[unit];

  let html = "";

  for (let i = min; i <= max; i++) {
    const value = i.toString().padStart(2, "0");

    html += `
      <button
        type="button"
        class="focus-session-wheel-item"
        data-value="${i}"
      >
        ${value}
      </button>
    `;
  }

  return html;
}

// ========================================
// INSERT WHEEL ITEMS
// ========================================

wheelUnits.forEach((unit) => {
  wheelLists[unit].innerHTML = generateWheelItems(unit);
});

// ========================================
// GET CLOSEST ITEM
// ========================================

function getClosestItem(wheelList, wheelViewport) {
  const viewportRect = wheelViewport.getBoundingClientRect();

  const viewportCenter = viewportRect.top + viewportRect.height / 2;

  const items = wheelList.querySelectorAll(".focus-session-wheel-item");

  let closestItem = null;
  let closestDistance = Infinity;

  items.forEach((item) => {
    const itemRect = item.getBoundingClientRect();

    const itemCenter = itemRect.top + itemRect.height / 2;

    const distance = Math.abs(itemCenter - viewportCenter);

    if (distance < closestDistance) {
      closestDistance = distance;
      closestItem = item;
    }
  });

  return closestItem;
}

// ========================================
// UPDATE WHEEL
// ========================================

function updateWheel(wheelList, wheelViewport, unit) {
  const viewportRect = wheelViewport.getBoundingClientRect();

  const viewportCenter = viewportRect.top + viewportRect.height / 2;

  const items = wheelList.querySelectorAll(".focus-session-wheel-item");

  let closestItem = null;
  let closestDistance = Infinity;

  items.forEach((item) => {
    item.classList.remove("is-selected");

    const itemRect = item.getBoundingClientRect();

    const itemCenter = itemRect.top + itemRect.height / 2;

    const distance = Math.abs(itemCenter - viewportCenter);

    // ========================================
    // FIND CLOSEST
    // ========================================

    if (distance < closestDistance) {
      closestDistance = distance;
      closestItem = item;
    }

    // ========================================
    // VISUAL PROGRESS
    // ========================================

    const maxDistance = 64;

    const progress = Math.min(distance / maxDistance, 1);

    // ========================================
    // SCALE
    // ========================================

    const maxScale = 1.08;
    const minScale = 0.84;

    const scale = maxScale - (maxScale - minScale) * progress;

    // ========================================
    // OPACITY
    // ========================================

    const maxOpacity = 1;
    const minOpacity = 0.18;

    const opacity = maxOpacity - (maxOpacity - minOpacity) * progress;

    // ========================================
    // TEXT SHADOW
    // ========================================

    const minTxtShadow = 0;
    const maxTxtShadow = 18;

    const txtShadow = maxTxtShadow - (maxTxtShadow - minTxtShadow) * progress;

    // ========================================
    // ROTATE X
    // ========================================

    const minRotateX = 70;
    const maxRotateX = 0;

    const rotateX = maxRotateX - (maxRotateX - minRotateX) * progress;

    // ========================================
    // APPLY STYLES
    // ========================================

    item.style.transform = `
      scale(${scale})
      rotateX(${rotateX}deg)
    `;

    item.style.opacity = opacity;

    item.style.textShadow = `
      0 0 ${txtShadow}px
      color-mix(
        in srgb,
        var(--primary) ${txtShadow}%,
        transparent
      )
    `;
  });

  // ========================================
  // SELECTED ITEM
  // ========================================

  if (closestItem) {
    closestItem.classList.add("is-selected");

    selectedTime[unit] = Number(closestItem.dataset.value);
  }
}

// ========================================
// SNAP WHEEL
// ========================================

const isSnapping = {
  hour: false,
  minute: false,
  second: false,
};

function snapWheel(unit) {
  const wheelList = wheelLists[unit];
  const wheelViewport = wheelViewports[unit];

  const closestItem = getClosestItem(wheelList, wheelViewport);

  if (!closestItem) return;

  const targetScrollTop =
    closestItem.offsetTop -
    wheelViewport.clientHeight / 2 +
    closestItem.offsetHeight / 2;

  isSnapping[unit] = true;

  wheelList.style.scrollBehavior = "smooth";

  wheelList.scrollTo({
    top: targetScrollTop,
    behavior: "smooth",
  });
}

// ========================================
// START SNAP TIMER
// ========================================

function startSnapTimer(unit) {
  if (isSnapping[unit]) return;

  clearTimeout(snapTimers[unit]);

  snapTimers[unit] = setTimeout(() => {
    snapWheel(unit);
  }, 120);
}

// ========================================
// DRAG
// ========================================

function enableWheelDrag(unit) {
  const wheelList = wheelLists[unit];
  const wheelViewport = wheelViewports[unit];

  let isDragging = false;

  let startY = 0;
  let startScrollTop = 0;

  // ========================================
  // POINTER DOWN
  // ========================================

  wheelViewport.addEventListener("pointerdown", (event) => {
    clearTimeout(snapTimers[unit]);

    isSnapping[unit] = false;

    wheelList.style.scrollBehavior = "auto";

    isDragging = true;

    startY = event.clientY;
    startScrollTop = wheelList.scrollTop;

    wheelViewport.setPointerCapture(event.pointerId);
  });

  // ========================================
  // POINTER MOVE
  // ========================================

  wheelViewport.addEventListener("pointermove", (event) => {
    if (!isDragging) return;

    const deltaY = event.clientY - startY;

    wheelList.scrollTop = startScrollTop - deltaY;
  });

  // ========================================
  // POINTER UP
  // ========================================

  wheelViewport.addEventListener("pointerup", (event) => {
    if (!isDragging) return;

    isDragging = false;

    wheelList.style.scrollBehavior = "auto";

    if (wheelViewport.hasPointerCapture(event.pointerId)) {
      wheelViewport.releasePointerCapture(event.pointerId);
    }

    startSnapTimer(unit);
  });

  // ========================================
  // POINTER CANCEL
  // ========================================

  wheelViewport.addEventListener("pointercancel", (event) => {
    if (!isDragging) return;

    isDragging = false;

    wheelList.style.scrollBehavior = "auto";

    if (wheelViewport.hasPointerCapture(event.pointerId)) {
      wheelViewport.releasePointerCapture(event.pointerId);
    }

    startSnapTimer(unit);
  });

  // ========================================
  // LOST POINTER CAPTURE
  // ========================================

  wheelViewport.addEventListener("lostpointercapture", () => {
    if (!isDragging) return;

    isDragging = false;

    wheelList.style.scrollBehavior = "auto";

    startSnapTimer(unit);
  });
}

// ========================================
// MOUSE WHEEL
// ========================================

function enableWheelScroll(unit) {
  const wheelList = wheelLists[unit];
  const wheelViewport = wheelViewports[unit];

  wheelViewport.addEventListener(
    "wheel",
    (event) => {
      event.preventDefault();

      wheelList.scrollTop += event.deltaY * 0.5;
    },
    {
      passive: false,
    },
  );
}

// ========================================
// ITEM CLICK
// ========================================

function enableWheelItemClick(unit) {
  const wheelList = wheelLists[unit];

  wheelList.addEventListener("click", (event) => {
    const item = event.target.closest(".focus-session-wheel-item");

    if (!item) return;

    item.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  });
}

// ========================================
// KEYBOARD
// ========================================

function enableWheelKeyboard(unit) {
  const wheelList = wheelLists[unit];
  const wheelViewport = wheelViewports[unit];

  wheelList.addEventListener("keydown", (event) => {
    const isUp = event.key === "ArrowUp";

    const isDown = event.key === "ArrowDown";

    if (!isUp && !isDown) return;

    event.preventDefault();

    const currentItem = getClosestItem(wheelList, wheelViewport);

    if (!currentItem) return;

    const items = [...wheelList.querySelectorAll(".focus-session-wheel-item")];

    const currentIndex = items.indexOf(currentItem);

    let nextIndex = currentIndex;

    // ========================================
    // UP
    // ========================================

    if (isUp) {
      nextIndex = Math.max(currentIndex - 1, 0);
    }

    // ========================================
    // DOWN
    // ========================================

    if (isDown) {
      nextIndex = Math.min(currentIndex + 1, items.length - 1);
    }

    const nextItem = items[nextIndex];

    if (!nextItem) return;

    nextItem.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  });
}

// ========================================
// SCROLL DETECTION
// ========================================

function enableWheelScrollDetection(unit) {
  const wheelList = wheelLists[unit];

  wheelList.addEventListener("scroll", () => {
    updateWheel(wheelList, wheelViewports[unit], unit);

    startSnapTimer(unit);
  });
}

// ========================================
// SET VALUE
// ========================================

function setWheelValue(unit, value) {
  const wheelList = wheelLists[unit];

  const item = wheelList.querySelector(
    `.focus-session-wheel-item[data-value="${value}"]`,
  );

  if (!item) return;

  item.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
}

// ========================================
// GET SELECTED TIME
// ========================================

function getSelectedTime() {
  return {
    hour: selectedTime.hour,
    minute: selectedTime.minute,
    second: selectedTime.second,
  };
}

// ========================================
// GET SELECTED TIME IN SECONDS
// ========================================

function getSelectedTimeInSeconds() {
  return (
    selectedTime.hour * 3600 + selectedTime.minute * 60 + selectedTime.second
  );
}

// ========================================
// FORMAT SELECTED TIME
// ========================================

function formatSelectedTime() {
  const hour = String(selectedTime.hour).padStart(2, "0");

  const minute = String(selectedTime.minute).padStart(2, "0");

  const second = String(selectedTime.second).padStart(2, "0");

  return `${hour}:${minute}:${second}`;
}

// ========================================
// INITIALIZE WHEELS
// ========================================

wheelUnits.forEach((unit) => {
  enableWheelDrag(unit);

  enableWheelScroll(unit);

  enableWheelItemClick(unit);

  enableWheelScrollDetection(unit);

  enableWheelKeyboard(unit);

  updateWheel(wheelLists[unit], wheelViewports[unit], unit);
});

// ========================================
// SET INITIAL VALUES
// ========================================

setWheelValue("hour", 0);
setWheelValue("minute", 25);
setWheelValue("second", 0);

// ========================================
// UPDATE AFTER INITIAL SCROLL
// ========================================

requestAnimationFrame(() => {
  wheelUnits.forEach((unit) => {
    updateWheel(wheelLists[unit], wheelViewports[unit], unit);
  });
});

// ========================================
// UPDATE AFTER RESIZE
// ========================================

window.addEventListener("resize", () => {
  wheelUnits.forEach((unit) => {
    updateWheel(wheelLists[unit], wheelViewports[unit], unit);
  });
});

//#endregion

// ========================================
// TASK DROPDOWN
// ========================================

const taskDropdownObject = {
  taskSelectBtn: document.querySelector(".focus-session-task-select"),
  taskDropdown: document.querySelector(".focus-task-dropdown"),
  taskPlaceholder: document.querySelector(".focus-session-task-placeholder"),
  taskCloseBtn: document.querySelector("#close-select-task-btn"),
  focusResetBtn: document.querySelector(".focus-reset-btn"),
};

// ========================================
// SHOW TASK DROPDOWN
// ========================================

function show_select_task_dropdown() {
  if (!taskDropdownObject.taskDropdown) return;

  if (taskDropdownObject.taskDropdown.dataset.dropdown === "hide") {
    taskDropdownObject.taskDropdown.dataset.dropdown = "show";
  }
}

// ========================================
// HIDE TASK DROPDOWN
// ========================================

function hide_select_task_dropdown() {
  if (!taskDropdownObject.taskDropdown) return;

  if (taskDropdownObject.taskDropdown.dataset.dropdown === "show") {
    taskDropdownObject.taskDropdown.dataset.dropdown = "hide";
  }
}

// ========================================
// SELECT TASK
// ========================================

document.addEventListener("click", (e) => {
  const task = e.target.closest(".select-focus-task-dropdown");

  if (!task) return;

  taskDropdownObject.taskPlaceholder.textContent = task.textContent.trim();

  taskDropdownObject.taskPlaceholder.style.color = "var(--text-primary)";

  hide_select_task_dropdown();
});

// ========================================
// OPEN TASK DROPDOWN
// ========================================

taskDropdownObject.taskSelectBtn.addEventListener(
  "click",
  show_select_task_dropdown,
);

// ========================================
// CLOSE TASK DROPDOWN
// ========================================

taskDropdownObject.taskCloseBtn.addEventListener(
  "click",
  hide_select_task_dropdown,
);

// ========================================
// FORM DROPDOWN
// ========================================

const dropdownFormObject = {
  focusSessionModal: document.querySelector(".focus-session-modal"),

  // Close
  focusSessionClose: document.querySelector(".focus-session-close"),
  focusSessionBackdrop: document.querySelector(".focus-session-backdrop"),

  // Show
  focusSettingsBtn: document.querySelector(".focus-settings-btn"),
};

// ========================================
// SHOW FORM DROPDOWN
// ========================================

function showFocusDropdown() {
  if (dropdownFormObject.focusSessionModal.dataset.view === "hide") {
    dropdownFormObject.focusSessionModal.dataset.view = "show";
  }
}

// ========================================
// HIDE FORM DROPDOWN
// ========================================

function hideFocusDropdown() {
  if (dropdownFormObject.focusSessionModal.dataset.view === "show") {
    dropdownFormObject.focusSessionModal.dataset.view = "hide";
  }

  hide_select_task_dropdown();
}

// ========================================
// CLOSE MODAL
// ========================================

dropdownFormObject.focusSessionClose.addEventListener(
  "click",
  hideFocusDropdown,
);

// ========================================
// CLICK BACKDROP
// ========================================

dropdownFormObject.focusSessionBackdrop.addEventListener(
  "click",
  hideFocusDropdown,
);

// ========================================
// OPEN MODAL
// ========================================

dropdownFormObject.focusSettingsBtn.addEventListener(
  "click",
  showFocusDropdown,
);

// ========================================
// CLOSE TASK DROPDOWN WHEN CLICKING OUTSIDE
// ========================================

document.addEventListener("click", (e) => {
  const clickedInsideTaskDropdown = e.target.closest(".focus-task-dropdown");

  const clickedTaskButton = e.target.closest(".focus-session-task-select");

  if (!clickedInsideTaskDropdown && !clickedTaskButton) {
    hide_select_task_dropdown();
  }
});

// ========================================
// FORM SUBMIT
// ========================================

const focusForm = document.querySelector(".focus-session-form");

focusForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const totalSeconds = getSelectedTimeInSeconds();

  const task = document
    .querySelector(".focus-session-task-placeholder")
    .textContent.trim();

  // ========================================
  // VALIDATE TIME
  // ========================================

  if (totalSeconds <= 0) {
    alert("Please select a valid focus duration.");
    return;
  }

  // ========================================
  // REQUEST DATA
  // ========================================

  const focusData = {
    total_seconds: totalSeconds,
    select_task: task,
  };

  // ========================================
  // SEND TO PHP
  // ========================================

  try {
    const response = await fetch("php-sql/create-focus.php", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(focusData),
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const result = await response.json();

    if (!result.success) {
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

    // ========================================
    // SAVE FOCUS DATA
    // ========================================

    localStorage.setItem("focus-task", focusData.select_task);

    // زمان فعلی
    localStorage.setItem("focus-time-now", String(focusData.total_seconds));

    // زمان اولیه
    localStorage.setItem("focus-time-real", String(focusData.total_seconds));

    // ========================================
    // UPDATE TASK
    // ========================================

    const focusTaskText = document.querySelector(".focus-task p");

    if (focusTaskText) {
      focusTaskText.textContent = focusData.select_task;
    }

    // ========================================
    // UPDATE TIMER IMMEDIATELY
    // ========================================

    timer_down(localStorage.getItem("focus-time-now"));

    // ========================================
    // SET STATE
    // ========================================

    setFocusState("stop");

    updateFocusUI();
  } catch (error) {
    console.error("Focus request failed:", error);
  } finally {
    hideFocusDropdown();
  }
});

// ========================================
// FOCUS STATE
// ========================================

const focusStateKey = "focus-state";

function getFocusState() {
  return localStorage.getItem(focusStateKey) || "stop";
}

function setFocusState(state) {
  localStorage.setItem(focusStateKey, state);
}

// ========================================
// ELEMENTS
// ========================================

const focusButtons = document.querySelector(".focus-buttons");

const focusStartBtn = document.querySelector(".focus-start-btn");

const focusResetBtn = document.querySelector(".focus-reset-btn");

const focusStopBtn = document.querySelector(".focus-stop-btn");

const focusPauseBtn = document.querySelector(".focus-pause-btn");

const focusPauseText = document.querySelector(".focus-pause-text");

const focusPauseIcon = document.querySelector(".focus-pause-icon");

const focusResumeIcon = document.querySelector(".focus-resume-icon");

// ========================================
// UI STATE
// ========================================

// ========================================
// UI STATE
// ========================================

function updateFocusUI() {
  const state = getFocusState();

  // ========================================
  // UPDATE BUTTON STATE
  // ========================================

  focusButtons.dataset.state = state;

  // ========================================
  // STOP
  // ========================================

  if (state === "stop") {
    focusPauseText.textContent = "Pause";

    focusPauseIcon.style.display = "block";
    focusResumeIcon.style.display = "none";

    return;
  }

  // ========================================
  // START
  // ========================================

  if (state === "start") {
    focusPauseText.textContent = "Pause";

    focusPauseIcon.style.display = "block";
    focusResumeIcon.style.display = "none";

    return;
  }

  // ========================================
  // PENDING
  // ========================================

  if (state === "pending") {
    focusPauseText.textContent = "Resume";

    focusPauseIcon.style.display = "none";
    focusResumeIcon.style.display = "block";

    return;
  }
}

// ========================================
// START FOCUS
// ========================================

focusStartBtn.addEventListener("click", () => {
  const time = Number(localStorage.getItem("focus-time-now"));

  if (!time || time <= 0) {
    return;
  }

  setFocusState("start");

  updateFocusUI();
});

// ========================================
// PAUSE / RESUME
// ========================================

focusPauseBtn.addEventListener("click", () => {
  const state = getFocusState();

  if (state === "start") {
    setFocusState("pending");
  } else if (state === "pending") {
    setFocusState("start");
  }

  updateFocusUI();
});

// ========================================
// TIMER PROGRESS
// ========================================

const progressCircle = document.querySelector(".focus-ring-progress");

const radius = 82;

const circumference = 2 * Math.PI * radius;

progressCircle.style.strokeDasharray = circumference;

function setProgress(percent) {
  const progress = Math.max(0, Math.min(100, percent));

  const offset = circumference - (progress / 100) * circumference;

  progressCircle.style.strokeDashoffset = offset;
}

// ========================================
// TIMER DISPLAY
// ========================================

// ========================================
// TIMER DISPLAY
// ========================================

function timer_down(sec) {
  const hour_duc = document.querySelector("#hour-span-txt");
  const minute_duc = document.querySelector("#minute-span-txt");
  const second_duc = document.querySelector("#second-span-txt");

  sec = Number(sec);

  // ========================================
  // GET REAL TIME
  // ========================================

  const totalTime = Number(localStorage.getItem("focus-time-real"));

  // ========================================
  // UPDATE PROGRESS
  // ========================================

  if (Number.isFinite(totalTime) && totalTime > 0) {
    const progress = (sec / totalTime) * 100;

    setProgress(progress);
  }

  // ========================================
  // TIMER FINISHED
  // ========================================

  if (sec <= 0) {
    hour_duc.textContent = "00";
    minute_duc.textContent = "00";
    second_duc.textContent = "00";

    setProgress(0);

    localStorage.setItem("focus-time-now", "0");

    return;
  }

  // ========================================
  // CALCULATE TIME
  // ========================================

  const hour = Math.floor(sec / 3600)
    .toString()
    .padStart(2, "0");

  const minute = Math.floor((sec / 60) % 60)
    .toString()
    .padStart(2, "0");

  const second = (sec % 60).toString().padStart(2, "0");

  // ========================================
  // UPDATE TIMER UI
  // ========================================

  hour_duc.textContent = hour;
  minute_duc.textContent = minute;
  second_duc.textContent = second;
}

// ========================================
// TIMER
// ========================================

// ========================================
// TIMER
// ========================================

setInterval(() => {
  const state = getFocusState();

  // فقط در حالت START زمان کم شود
  if (state !== "start") {
    return;
  }

  const getTime = localStorage.getItem("focus-time-now");

  if (getTime === null) {
    return;
  }

  const currentTime = Number(getTime);

  // ========================================
  // TIMER ALREADY FINISHED
  // ========================================

  if (currentTime <= 0) {
    localStorage.setItem("focus-time-now", "0");
    localStorage.setItem("focus-time-real", "0");

    setFocusState("stop");

    timer_down(0);
    updateFocusUI();

    return;
  }

  // ========================================
  // DECREASE TIME
  // ========================================

  const newTime = currentTime - 1;

  localStorage.setItem("focus-time-now", String(newTime));

  timer_down(newTime);

  // ========================================
  // TIMER FINISHED
  // ========================================

  if (newTime <= 0) {
    localStorage.setItem("focus-time-now", "0");

    setFocusState("stop");

    updateFocusUI();
  }
}, 1000);

// ========================================
// INITIAL UI
// ========================================

timer_down(localStorage.getItem("focus-time-now") || 0);

updateFocusUI();

// ========================================
// CLEAR FOCUS SESSION
// ========================================

// ========================================
// CLEAR FOCUS SESSION
// ========================================

async function clearFocusSession() {
  // ========================================
  // CLEAR LOCAL STORAGE
  // ========================================

  localStorage.setItem("focus-time-now", "0");
  localStorage.setItem("focus-time-real", "0");
  localStorage.setItem("focus-task", "There is no task");

  setFocusState("stop");

  // ========================================
  // UPDATE TASK
  // ========================================

  const focusTaskText = document.querySelector(".focus-task p");

  if (focusTaskText) {
    focusTaskText.textContent = "There is no task";
  }

  // ========================================
  // UPDATE TIMER
  // ========================================

  timer_down(0);

  // ========================================
  // UPDATE UI
  // ========================================

  updateFocusUI();

  // ========================================
  // DELETE FROM DATABASE
  // ========================================

  try {
    const response = await fetch("delete-focus-db.php");

    if (!response.ok) {
      throw new Error(`Failed to delete focus: ${response.status}`);
    }
  } catch (error) {
    console.error("Error deleting focus:", error);
  }
}

taskDropdownObject.focusResetBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  await clearFocusSession();
});

focusStopBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  await clearFocusSession();
});
