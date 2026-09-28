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

    // Today
    this.today = new Date();
    this.today.setHours(0, 0, 0, 0);

    // Current displayed month/year
    this.current = new Date();

    // Selected date
    this.selected = null;

    this.render();
    this.bindEvents();
  }

  // Events

  bindEvents() {
    // Toggle button
    this.toggle.addEventListener("click", () => {
      this.togglePanel();
    });

    // Input
    this.input.addEventListener("click", () => {
      this.open();
    });

    this.input.addEventListener("focus", () => {
      this.open();
    });

    // Previous month
    this.prevBtn.addEventListener("click", () => {
      this.current.setMonth(this.current.getMonth() - 1);
      this.render();
    });

    // Next month
    this.nextBtn.addEventListener("click", () => {
      this.current.setMonth(this.current.getMonth() + 1);
      this.render();
    });

    // Today
    this.todayBtn.addEventListener("click", () => {
      this.selected = new Date(this.today);
      this.current = new Date(this.today);

      this.updateInput();
      this.render();
      this.close();
    });

    // Clear
    this.clearBtn.addEventListener("click", () => {
      this.selected = null;
      this.input.value = "";

      this.render();
      this.close();
    });

    // Month picker
    this.monthTrigger.addEventListener("click", () => {
      this.showMonths();
    });

    // Year picker
    this.yearTrigger.addEventListener("click", () => {
      this.showYears();
    });

    // Close when clicking outside
    document.addEventListener("click", (e) => {
      if (!this.root.contains(e.target)) {
        this.close();
      }
    });

    // Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.close();
      }
    });

    // Reposition on resize
    window.addEventListener("resize", () => {
      if (this.panel.classList.contains("is-open")) {
        this.positionPanel();
      }
    });

    // Reposition on scroll
    window.addEventListener(
      "scroll",
      () => {
        if (this.panel.classList.contains("is-open")) {
          this.positionPanel();
        }
      },
      true,
    );
  }

  // Open / Close

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

  // Picker Views

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

  // Render

  render() {
    this.monthText.textContent = this.monthNames[this.current.getMonth()];

    this.yearText.textContent = this.current.getFullYear();

    this.renderDays();
  }

  // Render Days

  renderDays() {
    this.daysContainer.innerHTML = "";

    const year = this.current.getFullYear();
    const month = this.current.getMonth();

    const firstDay = new Date(year, month, 1).getDay();

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const prevMonthDays = new Date(year, month, 0).getDate();

    // Previous month days

    for (let i = firstDay; i > 0; i--) {
      const btn = this.createDay(prevMonthDays - i + 1, true);

      this.daysContainer.append(btn);
    }

    // Current month days

    for (let day = 1; day <= daysInMonth; day++) {
      const btn = this.createDay(day);

      const date = new Date(year, month, day);

      // Disable dates before today
      if (date < this.today) {
        btn.disabled = true;
      }

      // Selected date
      if (
        this.selected &&
        date.toDateString() === this.selected.toDateString()
      ) {
        btn.classList.add("is-selected");
      }

      // Today
      if (date.toDateString() === this.today.toDateString()) {
        btn.classList.add("is-today");
      }

      // Select date
      btn.addEventListener("click", () => {
        this.selected = date;

        this.current = new Date(date);

        this.updateInput();
        this.render();
        this.close();
      });

      this.daysContainer.append(btn);
    }

    // Next month days

    const total = firstDay + daysInMonth;

    const remain = 42 - total;

    for (let i = 1; i <= remain; i++) {
      const btn = this.createDay(i, true);

      this.daysContainer.append(btn);
    }
  }

  // Create Day

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

  // Render Months

  renderMonths() {
    this.monthContainer.innerHTML = "";

    this.monthNames.forEach((month, index) => {
      const btn = document.createElement("button");

      btn.type = "button";

      btn.className = "date-picker__month";

      btn.textContent = month.slice(0, 3);

      // Current month
      if (index === this.current.getMonth()) {
        btn.classList.add("is-selected");
      }

      btn.addEventListener("click", () => {
        this.current.setMonth(index);

        this.hidePickers();
        this.render();
      });

      this.monthContainer.append(btn);
    });
  }

  // Render Years

  renderYears() {
    this.yearContainer.innerHTML = "";

    const currentYear = this.current.getFullYear();

    for (let year = currentYear - 50; year <= currentYear + 50; year++) {
      const btn = document.createElement("button");

      btn.type = "button";

      btn.className = "date-picker__year";

      btn.textContent = year;

      // Current year
      if (year === currentYear) {
        btn.classList.add("is-selected");
      }

      btn.addEventListener("click", () => {
        this.current.setFullYear(year);

        this.hidePickers();
        this.render();
      });

      this.yearContainer.append(btn);
    }
  }

  // Update Input

  updateInput() {
    if (!this.selected) {
      this.input.value = "";
      return;
    }

    const y = this.selected.getFullYear();

    const m = String(this.selected.getMonth() + 1).padStart(2, "0");

    const d = String(this.selected.getDate()).padStart(2, "0");

    this.input.value = `${y}-${m}-${d}`;
  }

  // Position Panel

  positionPanel() {
    const rect = this.input.getBoundingClientRect();

    const panelWidth = 320;
    const panelHeight = 390;

    let left = rect.left;
    let top = rect.bottom + 12;

    // Prevent overflow from right
    if (left + panelWidth > window.innerWidth - 12) {
      left = window.innerWidth - panelWidth - 12;
    }

    // Prevent overflow from left
    if (left < 12) {
      left = 12;
    }

    // show panel above input
    if (top + panelHeight > window.innerHeight - 12) {
      top = rect.top - panelHeight - 12;
    }

    // Prevent overflow from top
    if (top < 12) {
      top = 12;
    }

    this.panel.style.left = `${left}px`;
    this.panel.style.top = `${top}px`;
  }
}

// Initialize Date Pickers

document.querySelectorAll(".date-picker").forEach((picker) => {
  new DatePicker(picker);
});
