// FOCUS WHEELS

let Minute = "";
let Second = "";
let Hour = "";


// WHEEL LISTS


const wheelLists = {
  hour: document.querySelector('.focus-session-wheel-list[data-unit="hour"]'),

  minute: document.querySelector(
    '.focus-session-wheel-list[data-unit="minute"]',
  ),

  second: document.querySelector(
    '.focus-session-wheel-list[data-unit="second"]',
  ),
};


// WHEEL VIEWPORTS


const wheelViewports = {
  hour: wheelLists.hour?.parentElement ?? null,

  minute: wheelLists.minute?.parentElement ?? null,

  second: wheelLists.second?.parentElement ?? null,
};


// WHEEL UNITS


const wheelUnits = ["hour", "minute", "second"];


// SELECTED TIME


const selectedTime = {
  hour: 0,
  minute: 25,
  second: 0,
};


// SNAP TIMERS


const snapTimers = {
  hour: null,
  minute: null,
  second: null,
};


// WHEEL CONFIG


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


// SNAP STATE


const isSnapping = {
  hour: false,
  minute: false,
  second: false,
};


// GENERATE WHEEL ITEMS


function generateWheelItems(unit) {
  const config = wheelConfig[unit];

  if (!config) {
    return "";
  }

  const { min, max } = config;

  let html = "";

  for (let i = min; i <= max; i++) {
    const value = String(i).padStart(2, "0");

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


// INSERT WHEEL ITEMS


wheelUnits.forEach((unit) => {
  const wheelList = wheelLists[unit];

  if (!wheelList) {
    return;
  }

  wheelList.innerHTML = generateWheelItems(unit);
});


// GET CLOSEST ITEM


function getClosestItem(wheelList, wheelViewport) {
  if (!wheelList || !wheelViewport) {
    return null;
  }

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


// UPDATE WHEEL


function updateWheel(wheelList, wheelViewport, unit) {
  if (!wheelList || !wheelViewport) {
    return;
  }

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

    
    // FIND CLOSEST
    

    if (distance < closestDistance) {
      closestDistance = distance;

      closestItem = item;
    }

    
    // VISUAL PROGRESS
    

    const maxDistance = 64;

    const progress = Math.min(distance / maxDistance, 1);

    
    // SCALE
    

    const maxScale = 1.08;

    const minScale = 0.84;

    const scale = maxScale - (maxScale - minScale) * progress;

    
    // OPACITY
    

    const maxOpacity = 1;

    const minOpacity = 0.18;

    const opacity = maxOpacity - (maxOpacity - minOpacity) * progress;

    
    // TEXT SHADOW
    

    const minTxtShadow = 0;

    const maxTxtShadow = 18;

    const txtShadow = maxTxtShadow - (maxTxtShadow - minTxtShadow) * progress;

    
    // ROTATE X
    

    const minRotateX = 70;

    const maxRotateX = 0;

    const rotateX = maxRotateX - (maxRotateX - minRotateX) * progress;

    
    // APPLY STYLES
    

    item.style.transform = `
      scale(${scale})
      rotateX(${rotateX}deg)
    `;

    item.style.opacity = String(opacity);

    item.style.textShadow = `
      0 0 ${txtShadow}px
      color-mix(
        in srgb,
        var(--primary) ${txtShadow}%,
        transparent
      )
    `;
  });

  
  // SELECTED ITEM
  

  if (closestItem) {
    closestItem.classList.add("is-selected");

    selectedTime[unit] = Number(closestItem.dataset.value);
  }
}


// SNAP WHEEL


function snapWheel(unit) {
  const wheelList = wheelLists[unit];

  const wheelViewport = wheelViewports[unit];

  if (!wheelList || !wheelViewport) {
    return;
  }

  const closestItem = getClosestItem(wheelList, wheelViewport);

  if (!closestItem) {
    return;
  }

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

  clearTimeout(snapTimers[unit]);

  snapTimers[unit] = setTimeout(() => {
    isSnapping[unit] = false;

    wheelList.style.scrollBehavior = "auto";

    updateWheel(wheelList, wheelViewport, unit);
  }, 450);
}


// START SNAP TIMER


function startSnapTimer(unit) {
  if (isSnapping[unit]) {
    return;
  }

  clearTimeout(snapTimers[unit]);

  snapTimers[unit] = setTimeout(() => {
    snapWheel(unit);
  }, 120);
}


// DRAG


function enableWheelDrag(unit) {
  const wheelList = wheelLists[unit];

  const wheelViewport = wheelViewports[unit];

  if (!wheelList || !wheelViewport) {
    return;
  }

  wheelViewport.style.touchAction = "none";

  let isDragging = false;

  let startY = 0;

  let startScrollTop = 0;

  
  // POINTER DOWN
  

  wheelViewport.addEventListener("pointerdown", (event) => {
    clearTimeout(snapTimers[unit]);

    isSnapping[unit] = false;

    wheelList.style.scrollBehavior = "auto";

    isDragging = true;

    startY = event.clientY;

    startScrollTop = wheelList.scrollTop;

    wheelViewport.setPointerCapture(event.pointerId);
  });

  
  // POINTER MOVE
  

  wheelViewport.addEventListener("pointermove", (event) => {
    if (!isDragging) {
      return;
    }

    const deltaY = event.clientY - startY;

    wheelList.scrollTop = startScrollTop - deltaY;
  });

  
  // END DRAG
  

  function endDrag(pointerId = null) {
    if (!isDragging) {
      return;
    }

    isDragging = false;

    wheelList.style.scrollBehavior = "auto";

    if (pointerId !== null && wheelViewport.hasPointerCapture(pointerId)) {
      wheelViewport.releasePointerCapture(pointerId);
    }

    startSnapTimer(unit);
  }

  
  // POINTER UP
  

  wheelViewport.addEventListener("pointerup", (event) => {
    endDrag(event.pointerId);
  });

  
  // POINTER CANCEL
  

  wheelViewport.addEventListener("pointercancel", (event) => {
    endDrag(event.pointerId);
  });

  
  // LOST POINTER CAPTURE
  

  wheelViewport.addEventListener("lostpointercapture", () => {
    endDrag();
  });
}


// MOUSE / TOUCH WHEEL


function enableWheelScroll(unit) {
  const wheelList = wheelLists[unit];

  const wheelViewport = wheelViewports[unit];

  if (!wheelList || !wheelViewport) {
    return;
  }

  wheelViewport.addEventListener(
    "wheel",
    (event) => {
      event.preventDefault();

      clearTimeout(snapTimers[unit]);

      isSnapping[unit] = false;

      wheelList.style.scrollBehavior = "auto";

      wheelList.scrollTop += event.deltaY * 0.5;

      startSnapTimer(unit);
    },
    {
      passive: false,
    },
  );
}


// ITEM CLICK


function enableWheelItemClick(unit) {
  const wheelList = wheelLists[unit];

  if (!wheelList) {
    return;
  }

  wheelList.addEventListener("click", (event) => {
    const item = event.target.closest(".focus-session-wheel-item");

    if (!item) {
      return;
    }

    clearTimeout(snapTimers[unit]);

    isSnapping[unit] = true;

    item.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    snapTimers[unit] = setTimeout(() => {
      isSnapping[unit] = false;

      updateWheel(wheelList, wheelViewports[unit], unit);
    }, 450);
  });
}


// KEYBOARD


function enableWheelKeyboard(unit) {
  const wheelList = wheelLists[unit];

  const wheelViewport = wheelViewports[unit];

  if (!wheelList || !wheelViewport) {
    return;
  }

  wheelList.addEventListener("keydown", (event) => {
    const isUp = event.key === "ArrowUp";

    const isDown = event.key === "ArrowDown";

    if (!isUp && !isDown) {
      return;
    }

    event.preventDefault();

    const currentItem = getClosestItem(wheelList, wheelViewport);

    if (!currentItem) {
      return;
    }

    const items = [...wheelList.querySelectorAll(".focus-session-wheel-item")];

    const currentIndex = items.indexOf(currentItem);

    let nextIndex = currentIndex;

    if (isUp) {
      nextIndex = Math.max(currentIndex - 1, 0);
    }

    if (isDown) {
      nextIndex = Math.min(currentIndex + 1, items.length - 1);
    }

    const nextItem = items[nextIndex];

    if (!nextItem) {
      return;
    }

    clearTimeout(snapTimers[unit]);

    isSnapping[unit] = true;

    nextItem.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    snapTimers[unit] = setTimeout(() => {
      isSnapping[unit] = false;

      updateWheel(wheelList, wheelViewport, unit);
    }, 450);
  });
}


// SCROLL DETECTION


function enableWheelScrollDetection(unit) {
  const wheelList = wheelLists[unit];

  const wheelViewport = wheelViewports[unit];

  if (!wheelList || !wheelViewport) {
    return;
  }

  wheelList.addEventListener(
    "scroll",
    () => {
      updateWheel(wheelList, wheelViewport, unit);

      startSnapTimer(unit);
    },
    {
      passive: true,
    },
  );
}


// SET WHEEL VALUE


function setWheelValue(unit, value) {
  const wheelList = wheelLists[unit];

  const wheelViewport = wheelViewports[unit];

  if (!wheelList || !wheelViewport) {
    return;
  }

  const item = wheelList.querySelector(
    `.focus-session-wheel-item[data-value="${value}"]`,
  );

  if (!item) {
    return;
  }

  isSnapping[unit] = true;

  item.scrollIntoView({
    behavior: "auto",
    block: "center",
  });

  requestAnimationFrame(() => {
    updateWheel(wheelList, wheelViewport, unit);

    isSnapping[unit] = false;
  });
}


// GET SELECTED TIME


function getSelectedTime() {
  return {
    hour: selectedTime.hour,

    minute: selectedTime.minute,

    second: selectedTime.second,
  };
}


// GET SELECTED TIME IN SECONDS


function getSelectedTimeInSeconds() {
  return (
    selectedTime.hour * 3600 + selectedTime.minute * 60 + selectedTime.second
  );
}


// FORMAT SELECTED TIME


function formatSelectedTime() {
  const hour = String(selectedTime.hour).padStart(2, "0");

  const minute = String(selectedTime.minute).padStart(2, "0");

  const second = String(selectedTime.second).padStart(2, "0");

  return `${hour}:${minute}:${second}`;
}


// INITIALIZE WHEELS


wheelUnits.forEach((unit) => {
  if (!wheelLists[unit] || !wheelViewports[unit]) {
    return;
  }

  enableWheelDrag(unit);

  enableWheelScroll(unit);

  enableWheelItemClick(unit);

  enableWheelScrollDetection(unit);

  enableWheelKeyboard(unit);

  updateWheel(wheelLists[unit], wheelViewports[unit], unit);
});


// SET INITIAL VALUES


setWheelValue("hour", 0);

setWheelValue("minute", 25);

setWheelValue("second", 0);


// UPDATE AFTER INITIAL SCROLL


requestAnimationFrame(() => {
  wheelUnits.forEach((unit) => {
    updateWheel(wheelLists[unit], wheelViewports[unit], unit);
  });
});


// UPDATE AFTER RESIZE


let resizeTimer = null;

window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);

  resizeTimer = setTimeout(() => {
    wheelUnits.forEach((unit) => {
      updateWheel(wheelLists[unit], wheelViewports[unit], unit);
    });
  }, 100);
});


// TASK DROPDOWN


const taskDropdownObject = {
  taskSelectBtn: document.querySelector(".focus-session-task-select"),

  taskDropdown: document.querySelector(".focus-task-dropdown"),

  taskPlaceholder: document.querySelector(".focus-session-task-placeholder"),

  taskCloseBtn: document.querySelector("#close-select-task-btn"),

  focusResetBtn: document.querySelector(".focus-reset-btn"),
};


// SELECTED FOCUS TASK


let selectedFocusTask = "";


// SHOW TASK DROPDOWN


async function show_select_task_dropdown() {
  const dropdown = taskDropdownObject.taskDropdown;

  if (!dropdown) {
    return;
  }

  dropdown.dataset.dropdown = "show";

  await loadFocusTasks();
}


// HIDE TASK DROPDOWN


function hide_select_task_dropdown() {
  const dropdown = taskDropdownObject.taskDropdown;

  if (!dropdown) {
    return;
  }

  dropdown.dataset.dropdown = "hide";
}


// FIND / CREATE FOCUS TASK LIST


function getFocusTaskList() {
  const dropdown = taskDropdownObject.taskDropdown;

  if (!dropdown) {
    return null;
  }

  let taskList = dropdown.querySelector(".focus-task-list");

  if (!taskList) {
    taskList = document.createElement("div");

    taskList.className = "focus-task-list";

    dropdown.appendChild(taskList);
  }

  return taskList;
}


// RENDER TASK MESSAGE


function renderFocusTaskMessage(message) {
  const taskList = getFocusTaskList();

  if (!taskList) {
    return;
  }

  taskList.innerHTML = "";

  const messageElement = document.createElement("p");

  messageElement.className = "focus-task-empty";

  messageElement.textContent = message;

  taskList.appendChild(messageElement);
}


// LOAD FOCUS TASKS


let focusTasksRequest = null;

async function loadFocusTasks() {
  const taskList = getFocusTaskList();

  if (!taskList) {
    return;
  }

  if (focusTasksRequest) {
    try {
      await focusTasksRequest;
      return;
    } catch {
    }
  }

  renderFocusTaskMessage("Loading tasks...");

  const params = new URLSearchParams({
    sort: "newest",

    status: "all",

    category: "all",

    priority: "all",
  });

  const request = fetch(`api/get_tasks.php?${params.toString()}`, {
    method: "GET",

    cache: "no-store",

    headers: {
      Accept: "application/json",
    },
  });

  focusTasksRequest = request;

  try {
    const response = await request;

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const result = await response.json();

    if (!result || !result.success) {
      throw new Error(result?.message || "Failed to load tasks.");
    }

    if (!Array.isArray(result.data)) {
      throw new Error("Invalid task response.");
    }

    
    // NO TASKS
    

    if (result.data.length === 0) {
      renderFocusTaskMessage("There is no task");

      return;
    }

    
    // RENDER TASK LIST
    

    taskList.innerHTML = "";

    result.data.forEach((task) => {
      if (!task || task.task === undefined || task.task === null) {
        return;
      }

      const button = document.createElement("button");

      button.type = "button";

      button.className = "select-focus-task-dropdown";

      button.dataset.taskId = task.id_task ?? "";

      button.textContent = String(task.task);

      taskList.appendChild(button);
    });

    if (!taskList.children.length) {
      renderFocusTaskMessage("There is no task");
    }

    
    // RESTORE PREVIOUS TASK
    

    if (selectedFocusTask) {
      const previousTask = [
        ...taskList.querySelectorAll(".select-focus-task-dropdown"),
      ].find((button) => button.textContent.trim() === selectedFocusTask);

      if (previousTask) {
        taskDropdownObject.taskPlaceholder.textContent = selectedFocusTask;

        taskDropdownObject.taskPlaceholder.style.color = "var(--text-primary)";
      }
    }

    
    // RESTORE FROM LOCAL STORAGE
    

    if (!selectedFocusTask) {
      const storedTask = localStorage.getItem("focus-task");

      if (storedTask && storedTask !== "There is no task") {
        const storedTaskButton = [
          ...taskList.querySelectorAll(".select-focus-task-dropdown"),
        ].find((button) => button.textContent.trim() === storedTask);

        if (storedTaskButton) {
          selectedFocusTask = storedTask;

          taskDropdownObject.taskPlaceholder.textContent = storedTask;

          taskDropdownObject.taskPlaceholder.style.color =
            "var(--text-primary)";
        }
      }
    }
  } catch (error) {
    console.error("Failed to load focus tasks:", error);

    renderFocusTaskMessage("Could not load tasks.");
  } finally {
    if (focusTasksRequest === request) {
      focusTasksRequest = null;
    }
  }
}


// SELECT TASK


document.addEventListener("click", (event) => {
  const task = event.target.closest(".select-focus-task-dropdown");

  if (!task) {
    return;
  }

  const taskText = task.textContent.trim();

  if (!taskText) {
    return;
  }

  selectedFocusTask = taskText;

  taskDropdownObject.taskPlaceholder.textContent = taskText;

  taskDropdownObject.taskPlaceholder.style.color = "var(--text-primary)";

  hide_select_task_dropdown();
});


// OPEN TASK DROPDOWN


if (taskDropdownObject.taskSelectBtn) {
  taskDropdownObject.taskSelectBtn.addEventListener("click", async () => {
    await show_select_task_dropdown();
  });
}


// CLOSE TASK DROPDOWN


if (taskDropdownObject.taskCloseBtn) {
  taskDropdownObject.taskCloseBtn.addEventListener(
    "click",
    hide_select_task_dropdown,
  );
}


// FORM MODAL


const dropdownFormObject = {
  focusSessionModal: document.querySelector(".focus-session-modal"),

  focusSessionClose: document.querySelector(".focus-session-close"),

  focusSessionBackdrop: document.querySelector(".focus-session-backdrop"),

  focusSettingsBtn: document.querySelector(".focus-settings-btn"),
};


// SHOW FOCUS MODAL


function showFocusDropdown() {
  const modal = dropdownFormObject.focusSessionModal;

  if (!modal) {
    return;
  }

  modal.dataset.view = "show";

  loadFocusTasks();
}


// HIDE FOCUS MODAL


function hideFocusDropdown() {
  const modal = dropdownFormObject.focusSessionModal;

  if (modal) {
    modal.dataset.view = "hide";
  }

  hide_select_task_dropdown();
}


// CLOSE MODAL


if (dropdownFormObject.focusSessionClose) {
  dropdownFormObject.focusSessionClose.addEventListener(
    "click",
    hideFocusDropdown,
  );
}


// CLICK BACKDROP


if (dropdownFormObject.focusSessionBackdrop) {
  dropdownFormObject.focusSessionBackdrop.addEventListener(
    "click",
    hideFocusDropdown,
  );
}


// OPEN MODAL


if (dropdownFormObject.focusSettingsBtn) {
  dropdownFormObject.focusSettingsBtn.addEventListener(
    "click",
    showFocusDropdown,
  );
}


// CLOSE TASK DROPDOWN OUTSIDE


document.addEventListener("click", (event) => {
  const clickedInsideTaskDropdown = event.target.closest(
    ".focus-task-dropdown",
  );

  const clickedTaskButton = event.target.closest(".focus-session-task-select");

  if (!clickedInsideTaskDropdown && !clickedTaskButton) {
    hide_select_task_dropdown();
  }
});


// FORM SUBMIT


const focusForm = document.querySelector(".focus-session-form");

if (focusForm) {
  focusForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    
    // GET TIME
    

    const totalSeconds = getSelectedTimeInSeconds();

    
    // GET TASK
    

    const task = selectedFocusTask.trim();

    
    // VALIDATE TIME
    

    if (totalSeconds <= 0) {
      alert("Please select a valid focus duration.");

      return;
    }

    
    // VALIDATE TASK
    

    if (!task || task === "Select a task" || task === "There is no task") {
      alert("Please select a task.");

      return;
    }

    
    // REQUEST DATA
    

    const focusData = {
      total_seconds: totalSeconds,

      select_task: task,
    };

    
    // SUBMIT BUTTON
    

    const submitButton = focusForm.querySelector(".focus-session-submit");

    const originalSubmitText = submitButton?.textContent ?? "Start Focus";

    if (submitButton) {
      submitButton.disabled = true;

      submitButton.textContent = "Starting...";
    }

    
    // SEND TO PHP
    

    try {
      const response = await fetch("api/create-focus.php", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",

          Accept: "application/json",
        },

        body: JSON.stringify(focusData),
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const result = await response.json();

      
      // SERVER ERROR
      

      if (!result || !result.success) {
        const message = result?.message || "Failed to create focus.";

        const messageBox = document.querySelector(".message-box-container");

        const messageBoxText = document.querySelector(
          ".message-box-container p",
        );

        if (messageBox && messageBoxText) {
          messageBoxText.textContent = message;

          messageBox.dataset.view = "show";

          setTimeout(() => {
            messageBox.dataset.view = "hide";
          }, 5000);
        } else {
          alert(message);
        }

        return;
      }

      
      // SAVE FOCUS DATA
      

      localStorage.setItem("focus-task", focusData.select_task);

      localStorage.setItem("focus-time-now", String(focusData.total_seconds));

      localStorage.setItem("focus-time-real", String(focusData.total_seconds));

      
      // UPDATE SELECTED TASK
      

      selectedFocusTask = focusData.select_task;

      if (taskDropdownObject.taskPlaceholder) {
        taskDropdownObject.taskPlaceholder.textContent = focusData.select_task;

        taskDropdownObject.taskPlaceholder.style.color = "var(--text-primary)";
      }

      
      // UPDATE FOCUS TASK UI
      

      const focusTaskText = document.querySelector(".focus-task p");

      if (focusTaskText) {
        focusTaskText.textContent = focusData.select_task;
      }

      
      // UPDATE TIMER
      

      timer_down(focusData.total_seconds);

      
      // SET STATE
      

      setFocusState("stop");

      updateFocusUI();
    } catch (error) {
      console.error("Focus request failed:", error);

      alert("Could not start focus session. Please try again.");
    } finally {
      if (submitButton) {
        submitButton.disabled = false;

        submitButton.textContent = originalSubmitText;
      }

      hideFocusDropdown();
    }
  });
}


// FOCUS STATE


const focusStateKey = "focus-state";


// GET FOCUS STATE


function getFocusState() {
  return localStorage.getItem(focusStateKey) || "stop";
}


// SET FOCUS STATE


function setFocusState(state) {
  const allowedStates = ["stop", "start", "pending"];

  if (!allowedStates.includes(state)) {
    state = "stop";
  }

  localStorage.setItem(focusStateKey, state);
}


// ELEMENTS


const focusButtons = document.querySelector(".focus-buttons");

const focusStartBtn = document.querySelector(".focus-start-btn");

const focusResetBtn = document.querySelector(".focus-reset-btn");

const focusStopBtn = document.querySelector(".focus-stop-btn");

const focusPauseBtn = document.querySelector(".focus-pause-btn");

const focusPauseText = document.querySelector(".focus-pause-text");

const focusPauseIcon = document.querySelector(".focus-pause-icon");

const focusResumeIcon = document.querySelector(".focus-resume-icon");


// UPDATE FOCUS UI


function updateFocusUI() {
  const state = getFocusState();

  if (focusButtons) {
    focusButtons.dataset.state = state;
  }

  if (!focusPauseText || !focusPauseIcon || !focusResumeIcon) {
    return;
  }

  
  // STOP
  

  if (state === "stop") {
    focusPauseText.textContent = "Pause";

    focusPauseIcon.style.display = "block";

    focusResumeIcon.style.display = "none";

    return;
  }

  
  // START
  

  if (state === "start") {
    focusPauseText.textContent = "Pause";

    focusPauseIcon.style.display = "block";

    focusResumeIcon.style.display = "none";

    return;
  }

  
  // PENDING
  

  if (state === "pending") {
    focusPauseText.textContent = "Resume";

    focusPauseIcon.style.display = "none";

    focusResumeIcon.style.display = "block";
  }
}


// START FOCUS


if (focusStartBtn) {
  focusStartBtn.addEventListener("click", () => {
    const time = Number(localStorage.getItem("focus-time-now"));

    if (!Number.isFinite(time) || time <= 0) {
      return;
    }

    setFocusState("start");

    updateFocusUI();
  });
}


// PAUSE / RESUME


if (focusPauseBtn) {
  focusPauseBtn.addEventListener("click", () => {
    const state = getFocusState();

    if (state === "start") {
      setFocusState("pending");
    } else if (state === "pending") {
      setFocusState("start");
    }

    updateFocusUI();
  });
}


// PROGRESS CIRCLE


const progressCircle = document.querySelector(".focus-ring-progress");

const radius = 82;

const circumference = 2 * Math.PI * radius;

if (progressCircle) {
  progressCircle.style.strokeDasharray = String(circumference);

  progressCircle.style.strokeDashoffset = String(circumference);
}


// SET PROGRESS


function setProgress(percent) {
  if (!progressCircle) {
    return;
  }

  const progress = Math.max(0, Math.min(100, Number(percent) || 0));

  const offset = circumference - (progress / 100) * circumference;

  progressCircle.style.strokeDashoffset = String(offset);
}


// TIMER DISPLAY


function timer_down(sec) {
  const hourDisplay = document.querySelector("#hour-span-txt");

  const minuteDisplay = document.querySelector("#minute-span-txt");

  const secondDisplay = document.querySelector("#second-span-txt");

  if (!hourDisplay || !minuteDisplay || !secondDisplay) {
    return;
  }

  sec = Number(sec);

  if (!Number.isFinite(sec)) {
    sec = 0;
  }

  sec = Math.max(0, Math.floor(sec));

  
  // GET REAL TIME
  

  const totalTime = Number(localStorage.getItem("focus-time-real"));

  
  // UPDATE PROGRESS
  

  if (Number.isFinite(totalTime) && totalTime > 0) {
    const progress = (sec / totalTime) * 100;

    setProgress(progress);
  } else {
    setProgress(0);
  }

  
  // TIMER FINISHED
  

  if (sec <= 0) {
    hourDisplay.textContent = "00";

    minuteDisplay.textContent = "00";

    secondDisplay.textContent = "00";

    setProgress(0);

    localStorage.setItem("focus-time-now", "0");

    return;
  }

  
  // CALCULATE TIME
  

  const hour = Math.floor(sec / 3600)
    .toString()
    .padStart(2, "0");

  const minute = Math.floor((sec / 60) % 60)
    .toString()
    .padStart(2, "0");

  const second = (sec % 60).toString().padStart(2, "0");

  
  // UPDATE UI
  

  hourDisplay.textContent = hour;

  minuteDisplay.textContent = minute;

  secondDisplay.textContent = second;
}


// TIMER


setInterval(() => {
  const state = getFocusState();

  if (state !== "start") {
    return;
  }

  const storedTime = localStorage.getItem("focus-time-now");

  if (storedTime === null) {
    return;
  }

  const currentTime = Number(storedTime);

  if (!Number.isFinite(currentTime)) {
    localStorage.setItem("focus-time-now", "0");

    setFocusState("stop");

    timer_down(0);

    updateFocusUI();

    return;
  }

  
  // FINISHED
  

  if (currentTime <= 0) {
    localStorage.setItem("focus-time-now", "0");

    setFocusState("stop");

    timer_down(0);

    updateFocusUI();

    return;
  }

  
  // DECREASE
  

  const newTime = Math.max(0, currentTime - 1);

  localStorage.setItem("focus-time-now", String(newTime));

  timer_down(newTime);

  
  // FINISHED
  

  if (newTime <= 0) {
    setFocusState("stop");

    updateFocusUI();
  }
}, 1000);


// CLEAR FOCUS SESSION


async function clearFocusSession() {
  
  // CLEAR LOCAL STORAGE
  

  localStorage.setItem("focus-time-now", "0");

  localStorage.setItem("focus-time-real", "0");

  localStorage.setItem("focus-task", "There is no task");

  selectedFocusTask = "";

  
  // UPDATE TASK PLACEHOLDER
  

  if (taskDropdownObject.taskPlaceholder) {
    taskDropdownObject.taskPlaceholder.textContent = "Select a task";

    taskDropdownObject.taskPlaceholder.style.color = "var(--text-muted)";
  }

  
  // UPDATE MAIN TASK
  

  const focusTaskText = document.querySelector(".focus-task p");

  if (focusTaskText) {
    focusTaskText.textContent = "There is no task";
  }

  
  // STATE
  

  setFocusState("stop");

  
  // UPDATE TIMER
  

  timer_down(0);

  
  // UPDATE UI
  

  updateFocusUI();

  
  // HIDE MODAL / DROPDOWN
  

  hide_select_task_dropdown();

  
  // DELETE FROM DATABASE
  

  try {
    const response = await fetch("delete-focus-db.php", {
      method: "GET",

      cache: "no-store",

      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete focus: ${response.status}`);
    }

    const result = await response.json().catch(() => null);

    if (result && result.success === false) {
      console.error("Delete focus failed:", result.message);
    }
  } catch (error) {
    console.error("Error deleting focus:", error);
  }
}


// RESET BUTTON


if (taskDropdownObject.focusResetBtn) {
  taskDropdownObject.focusResetBtn.addEventListener("click", async (event) => {
    event.preventDefault();

    await clearFocusSession();
  });
}


// STOP BUTTON


if (focusStopBtn) {
  focusStopBtn.addEventListener("click", async (event) => {
    event.preventDefault();

    await clearFocusSession();
  });
}


// INITIAL UI


const initialFocusTime = localStorage.getItem("focus-time-now") || 0;

timer_down(initialFocusTime);

updateFocusUI();


// INITIAL TASK


const storedFocusTask = localStorage.getItem("focus-task");

if (storedFocusTask && storedFocusTask !== "There is no task") {
  selectedFocusTask = storedFocusTask;

  if (taskDropdownObject.taskPlaceholder) {
    taskDropdownObject.taskPlaceholder.textContent = storedFocusTask;

    taskDropdownObject.taskPlaceholder.style.color = "var(--text-primary)";
  }
}


// INITIAL MAIN FOCUS TASK


const initialFocusTask = localStorage.getItem("focus-task");

if (initialFocusTask && initialFocusTask !== "There is no task") {
  const focusTaskText = document.querySelector(".focus-task p");

  if (focusTaskText) {
    focusTaskText.textContent = initialFocusTask;
  }
}
