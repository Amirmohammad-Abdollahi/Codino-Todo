// ========================================
// UI Elements
// ========================================
const ui = {
  html: document.documentElement,
  themeToggle: document.querySelector(".theme-toggle"),

  // Progress
  progressWrapper: document.querySelector(".progress-circle"),
  progressCircle: document.querySelector(".progress-value"),
  progressPercent: document.querySelector(".progress-percent"),

  // Time
  timeValue: document.querySelector(".time-value h4"),

  // Date
  dateValue: document.querySelector(".date-value h4"),
  dateLabel: document.querySelector(".date-label"),

  // Title & SubTitle
  title: document.querySelector("#title-header-left"),
  subtitle: document.querySelector(".greeting-subtitle p"),
};

// ========================================
// Theme Toggle
// ========================================
const Theme =
  localStorage.getItem("theme") ??
  (window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light");

ui.html.dataset.theme = Theme;

ui.themeToggle?.addEventListener("click", () => {
  ui.html.dataset.theme = ui.html.dataset.theme === "light" ? "dark" : "light";

  localStorage.setItem("theme", ui.html.dataset.theme);
});

// ========================================
// Clock
// ========================================
function updateClock() {
  const now = new Date();

  const hour24 = now.getHours();
  const hour12 = hour24 % 12 || 12;

  const minute = String(now.getMinutes()).padStart(2, "0");
  const period = hour24 < 12 ? "AM" : "PM";

  ui.timeValue.textContent = `${hour12}:${minute} ${period}`;
}

updateClock();
setInterval(updateClock, 1000);

// ========================================
// Date
// ========================================
function updateToday() {
  const now = new Date();

  ui.dateValue.textContent = now.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  ui.dateLabel.textContent = now.toLocaleDateString("en-US", {
    weekday: "long",
  });
}

updateToday();

// ========================================
// Dynamic Greeting
// ========================================
const greeting = {
  update() {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
      ui.title.textContent = "Good Morning";
      ui.subtitle.textContent = "Stay focused, One step closer to your goals.";
    } else if (hour >= 12 && hour < 17) {
      ui.title.textContent = "Good Afternoon";
      ui.subtitle.textContent = "Keep the momentum going.";
    } else if (hour >= 17 && hour < 21) {
      ui.title.textContent = "Good Evening";
      ui.subtitle.textContent = "Finish today with purpose.";
    } else {
      ui.title.textContent = "Good Night";
      ui.subtitle.textContent = "Review today. Prepare for tomorrow.";
    }
  },
};

// اجرا هنگام لود صفحه
greeting.update();

// هر یک دقیقه بررسی شود
setInterval(() => {
  greeting.update();
}, 60000);
