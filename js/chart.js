//#region بخش دراپ دون
const chart = {
  select_chart_date: document.querySelector(".select-chart-date"),
  select_date_btn: document.querySelector(".select-date-btn"),
};

function hide_dropdown() {
  let dropdown_data = chart.select_chart_date.dataset.dropdown;
  if (dropdown_data == "show") {
    chart.select_chart_date.dataset.dropdown = "hide";
  }
}

chart.select_date_btn.addEventListener("click", () => {
  let dropdown_data = chart.select_chart_date.dataset.dropdown;
  if (dropdown_data == "hide") {
    chart.select_chart_date.dataset.dropdown = "show";
  } else {
    hide_dropdown();
  }
});

document.addEventListener("click", (e) => {
  const select_chart_date = e.target.closest(".select-chart-date");
  if (!select_chart_date) {
    hide_dropdown();
  }
});
//#endregion

const chartCanvas = document.getElementById("productivityChart");
let productivityChart;

const styles = getComputedStyle(document.documentElement);

const primaryColor = styles.getPropertyValue("--primary").trim();

const purpleColor = styles.getPropertyValue("--accent-purple").trim();

const textMutedColor = styles.getPropertyValue("--text-muted").trim();

const borderColor = styles.getPropertyValue("--border-color").trim();

document.addEventListener("click", (e) => {
  const tag_target = e.target.closest(".date-chart-item");

  if (!tag_target) return;

  e.preventDefault();

  selectChartRange(tag_target.dataset.range);
});

let currentChartRange = "week";

function selectChartRange(data_target) {
  const target = document.querySelector(
    `.date-chart-item[data-range="${data_target}"]`,
  );

  if (!target) return;

  currentChartRange = data_target;

  document.querySelectorAll(".date-chart-item").forEach((item) => {
    item.classList.remove("active");
  });

  target.classList.add("active");

  chart.select_date_btn.querySelector("p").textContent =
    target.textContent.trim();

  hide_dropdown();

  loadChart(data_target);
}

function getChartLabels(range, dates) {
  if (range === "week") {
    return dates.map(getDayName);
  }

  if (range === "month") {
    return dates.map(getDayNumber);
  }

  if (range === "year") {
    return dates.map((month) => getMonthName(Number(month)));
  }

  return [];
}

function getDayName(dateString) {
  const date = new Date(dateString + "T12:00:00");

  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
  }).format(date);
}

function getDayNumber(dateString) {
  const date = new Date(dateString + "T12:00:00");

  return date.getDate();
}

function getMonthName(monthNumber) {
  const date = new Date(2000, monthNumber - 1, 1);

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
  }).format(date);
}

function getTooltipTitle(data_target, dates) {
  return function (tooltipItems) {
    const index = tooltipItems[0].dataIndex;
    const date = dates[index];

    if (data_target === "week") {
      return getFullDayName(date);
    }

    if (data_target === "month") {
      return getFullDate(date);
    }

    if (data_target === "year") {
      return getFullMonthName(Number(date));
    }

    return date;
  };
}

function getFullDayName(dateString) {
  const date = new Date(dateString + "T12:00:00");

  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
  }).format(date);
}

function getFullDate(dateString) {
  const date = new Date(dateString + "T12:00:00");

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
  }).format(date);
}

function getFullMonthName(monthNumber) {
  const date = new Date(2000, Number(monthNumber) - 1, 1);

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
  }).format(date);
}

const chartState = document.querySelector(".chart-state");
const chartStateText = document.querySelector(".chart-state-text");
const chartStateAction = document.querySelector(".chart-state-action");

function showChartState(state, message = "") {
  chartState.dataset.state = state;

  if (message) {
    chartStateText.textContent = message;
  }
}

function hideChartState() {
  chartState.dataset.state = "hidden";
}

let chartRequestController = null;
let chartRequestId = 0;

async function loadChart(data_target) {
  const requestId = ++chartRequestId;

  if (chartRequestController) {
    chartRequestController.abort();
  }

  chartRequestController = new AbortController();

  showChartState("loading", "Loading chart...");

  try {
    const response = await fetch("api/set-chart-info.php", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        data_target,
      }),

      signal: chartRequestController.signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const result = await response.json();

    if (requestId !== chartRequestId) {
      return;
    }

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

    const total = result.data.total;
    const completed = result.data.completed;

    const dates = Object.keys(total);

    const totalData = Object.values(total);
    const completedData = Object.values(completed);

    const hasData =
      totalData.some((value) => Number(value) > 0) ||
      completedData.some((value) => Number(value) > 0);

    /*
     * Empty State
     */
    if (!hasData) {
      chartCanvas.hidden = true;

      showChartState("empty", "No productivity data for this period.");

      return;
    }

    chartCanvas.hidden = false;

    hideChartState();

    const labels = getChartLabels(data_target, dates);

    const maxTasks = Math.max(...totalData, ...completedData);

    const maxY = Math.max(maxTasks + 1, 1);

    const datasets = [
      {
        label: "Tasks Created",
        data: totalData,

        borderColor: purpleColor,
        backgroundColor: "rgba(124, 58, 237, 0.10)",

        borderWidth: 2,

        pointRadius: 4,
        pointHoverRadius: 6,

        pointBackgroundColor: "#ffffff",
        pointBorderColor: purpleColor,

        tension: 0.4,

        fill: true,
      },

      {
        label: "Completed Tasks",
        data: completedData,

        borderColor: primaryColor,
        backgroundColor: "rgba(37, 99, 235, 0.10)",

        borderWidth: 2,

        pointRadius: 4,
        pointHoverRadius: 6,

        pointBackgroundColor: "#ffffff",
        pointBorderColor: primaryColor,

        tension: 0.4,

        fill: true,
      },
    ];

    /*
     * Create Chart
     */
    if (!productivityChart) {
      productivityChart = new Chart(chartCanvas, {
        type: "line",

        data: {
          labels: labels,
          datasets: datasets,
        },

        options: {
          responsive: true,

          maintainAspectRatio: false,

          interaction: {
            mode: "index",
            intersect: false,
          },

          scales: {
            x: {
              grid: {
                display: false,
              },

              ticks: {
                color: textMutedColor,
                autoSkip: true,
                maxTicksLimit: 10,
              },
            },

            y: {
              beginAtZero: true,

              max: maxY,

              ticks: {
                stepSize: 1,
                color: textMutedColor,
              },

              grid: {
                color: borderColor,
              },
            },
          },

          plugins: {
            legend: {
              display: true,

              position: "top",

              labels: {
                usePointStyle: true,
                padding: 20,
              },
            },

            tooltip: {
              callbacks: {
                title: getTooltipTitle(data_target, dates),

                label: function (context) {
                  return `${context.dataset.label}: ${context.raw}`;
                },
              },
            },
          },
        },
      });
    } else {
      /*
       * Update Existing Chart
       */
      productivityChart.data.labels = labels;

      productivityChart.data.datasets = datasets;

      productivityChart.options.scales.y.max = maxY;

      productivityChart.options.plugins.tooltip.callbacks.title =
        getTooltipTitle(data_target, dates);

      productivityChart.update("active");
    }
  } catch (error) {
    if (error.name === "AbortError") {
      return;
    }

    if (requestId !== chartRequestId) {
      return;
    }

    chartCanvas.hidden = true;

    showChartState("error", "Unable to load productivity data.");
  } finally {
    if (requestId === chartRequestId) {
      chartRequestController = null;
    }
  }
}

chartStateAction.addEventListener("click", () => {
  loadChart(currentChartRange);
});

selectChartRange("week");

export function refreshChart() {
  loadChart(currentChartRange);
}
