// =====================================
// Date Picker
// =====================================

class DatePicker {
  constructor(root) {
    this.root = root;

    this.input = root.querySelector(".date-picker__input");
    this.toggle = root.querySelector(".date-picker__toggle");
    this.panel = root.querySelector(".date-picker__panel");

    this.daysContainer = root.querySelector(".date-picker__days");
    this.monthContainer = root.querySelector(".date-picker__months");
    this.yearContainer = root.querySelector(".date-picker__years");

    this.monthText = root.querySelector(".date-picker__month-text");
    this.yearText = root.querySelector(".date-picker__year-text");

    this.prevBtn = root.querySelector(".date-picker__prev");
    this.nextBtn = root.querySelector(".date-picker__next");

    this.monthTrigger = root.querySelector(".date-picker__month-trigger");
    this.yearTrigger = root.querySelector(".date-picker__year-trigger");

    this.todayBtn = root.querySelector(".date-picker__today");
    this.clearBtn = root.querySelector(".date-picker__clear");

    this.monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    this.today = new Date();

    this.current = new Date();

    this.selected = null;

    this.render();

    this.bindEvents();
  }

  bindEvents() {
    this.toggle.addEventListener("click", () => this.togglePanel());

    this.input.addEventListener("click", () => this.togglePanel());

    this.prevBtn.addEventListener("click", () => {
      this.current.setMonth(this.current.getMonth() - 1);
      this.render();
    });

    this.nextBtn.addEventListener("click", () => {
      this.current.setMonth(this.current.getMonth() + 1);
      this.render();
    });

    this.todayBtn.addEventListener("click", () => {
      this.selected = new Date();
      this.current = new Date();
      this.updateInput();
      this.render();
      this.close();
    });

    this.clearBtn.addEventListener("click", () => {
      this.selected = null;
      this.input.value = "";
      this.render();
      this.close();
    });

    this.monthTrigger.addEventListener("click", () => {
      this.showMonths();
    });

    this.yearTrigger.addEventListener("click", () => {
      this.showYears();
    });

    document.addEventListener("click", (e) => {
      if (!this.root.contains(e.target)) {
        this.close();
      }
    });
  }

  open() {
    this.panel.hidden = false;

    requestAnimationFrame(() => {
      this.panel.classList.add("is-open");
    });

    this.input.setAttribute("aria-expanded", "true");
    this.positionPanel();
  }

  close() {
    this.panel.classList.remove("is-open");

    this.input.setAttribute("aria-expanded", "false");

    setTimeout(() => {
      if (!this.panel.classList.contains("is-open")) {
        this.panel.hidden = true;
      }
    }, 250);

    this.hidePickers();
  }

  togglePanel() {
    if (this.panel.classList.contains("is-open")) {
      this.close();
    } else {
      this.open();
    }
  }

  hidePickers() {
    this.monthContainer.hidden = true;
    this.yearContainer.hidden = true;
    this.daysContainer.hidden = false;
  }

  showMonths() {
    this.daysContainer.hidden = true;
    this.yearContainer.hidden = true;

    this.monthContainer.hidden = false;

    this.renderMonths();
  }

  showYears() {
    this.daysContainer.hidden = true;
    this.monthContainer.hidden = true;

    this.yearContainer.hidden = false;

    this.renderYears();
  }

  render() {
    this.monthText.textContent = this.monthNames[this.current.getMonth()];
    this.yearText.textContent = this.current.getFullYear();

    this.renderDays();
  }

  renderDays() {
    this.daysContainer.innerHTML = "";

    const year = this.current.getFullYear();
    const month = this.current.getMonth();

    const firstDay = new Date(year, month, 1).getDay();

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const prevMonthDays = new Date(year, month, 0).getDate();

    for (let i = firstDay; i > 0; i--) {
      const btn = this.createDay(prevMonthDays - i + 1, true);

      this.daysContainer.append(btn);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const btn = this.createDay(day);

      const date = new Date(year, month, day);

      if (
        this.selected &&
        date.toDateString() === this.selected.toDateString()
      ) {
        btn.classList.add("is-selected");
      }

      if (date.toDateString() === this.today.toDateString()) {
        btn.classList.add("is-today");
      }

      btn.addEventListener("click", () => {
        this.selected = date;

        this.current = new Date(date);

        this.updateInput();

        this.render();

        this.close();
      });

      this.daysContainer.append(btn);
    }

    const total = firstDay + daysInMonth;

    const remain = 42 - total;

    for (let i = 1; i <= remain; i++) {
      const btn = this.createDay(i, true);

      this.daysContainer.append(btn);
    }
  }

  createDay(number, outside = false) {
    const btn = document.createElement("button");

    btn.type = "button";

    btn.textContent = number;

    btn.className = "date-picker__day";

    if (outside) {
      btn.classList.add("is-outside");
      btn.disabled = true;
    }

    return btn;
  }

  renderMonths() {
    this.monthContainer.innerHTML = "";

    this.monthNames.forEach((month, index) => {
      const btn = document.createElement("button");

      btn.type = "button";

      btn.className = "date-picker__month";

      btn.textContent = month.slice(0, 3);

      if (index === this.current.getMonth()) {
        btn.classList.add("is-selected");
      }

      btn.onclick = () => {
        this.current.setMonth(index);

        this.hidePickers();

        this.render();
      };

      this.monthContainer.append(btn);
    });
  }

  renderYears() {
    this.yearContainer.innerHTML = "";

    const currentYear = this.current.getFullYear();

    for (let year = currentYear - 50; year <= currentYear + 50; year++) {
      const btn = document.createElement("button");

      btn.type = "button";

      btn.className = "date-picker__year";

      btn.textContent = year;

      if (year === currentYear) {
        btn.classList.add("is-selected");
      }

      btn.onclick = () => {
        this.current.setFullYear(year);

        this.hidePickers();

        this.render();
      };

      this.yearContainer.append(btn);
    }
  }

  updateInput() {
    const y = this.selected.getFullYear();

    const m = String(this.selected.getMonth() + 1).padStart(2, "0");

    const d = String(this.selected.getDate()).padStart(2, "0");

    this.input.value = `${y}-${m}-${d}`;
  }

  positionPanel() {
    const rect = this.input.getBoundingClientRect();

    const panelWidth = 320;
    const panelHeight = 390;

    let left = rect.left;
    let top = rect.bottom + 12;

    if (left + panelWidth > window.innerWidth - 12) {
      left = window.innerWidth - panelWidth - 12;
    }

    if (left < 12) {
      left = 12;
    }

    if (top + panelHeight > window.innerHeight - 12) {
      top = rect.top - panelHeight - 12;
    }

    if (top < 12) {
      top = 12;
    }

    this.panel.style.left = `${left}px`;
    this.panel.style.top = `${top}px`;
  }
}

// Initialize

document.querySelectorAll(".date-picker").forEach((picker) => {
  new DatePicker(picker);
});

const today = new Date();
today.setHours(0, 0, 0, 0);

const date = new Date(year, month, day);

if (date < today) {
  btn.disabled = true;
}

this.input.addEventListener("focus", () => {
  this.open();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    this.close();
  }
});

window.addEventListener("resize", () => {
  if (this.panel.classList.contains("is-open")) {
    this.positionPanel();
  }
});

window.addEventListener(
  "scroll",
  () => {
    if (this.panel.classList.contains("is-open")) {
      this.positionPanel();
    }
  },
  true,
);
