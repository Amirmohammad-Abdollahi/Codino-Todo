const STEP_ORDER = ["init", "user", "tasks", "ready"];

const state = {
  started: new Set(),
  done: new Set(),
  finished: false,
};

function getLoader() {
  return document.getElementById("loader");
}

function getProgress() {
  return document.querySelector("#loader .progress-bar");
}

function getStep(stepName) {
  return document.querySelector(`#loader [data-step="${stepName}"]`);
}

function getStatus() {
  return document.querySelector("#loader .loader-status");
}

function paintProgress() {
  const progress = getProgress();

  if (!progress) return;

  const percent = (state.done.size / STEP_ORDER.length) * 100;

  progress.style.width = `${Math.min(percent, 100)}%`;
}

export function startStep(stepName) {
  if (!STEP_ORDER.includes(stepName)) return;
  if (state.finished) return;

  const step = getStep(stepName);

  if (!step) {
    console.warn(`LOADER MISSING STEP: ${stepName}`);
    return;
  }

  // حذف active از همه مراحل
  STEP_ORDER.forEach((name) => {
    const currentStep = getStep(name);

    if (currentStep) {
      currentStep.classList.remove("active");
    }
  });

  // اگر قبلاً done شده، دوباره active نکن
  if (state.done.has(stepName)) {
    return;
  }

  step.classList.add("active");
  state.started.add(stepName);

  console.log(`LOADER START: ${stepName}`);
}

export function completeStep(stepName) {
  if (!STEP_ORDER.includes(stepName)) return;
  if (state.done.has(stepName)) return;

  const step = getStep(stepName);

  if (step) {
    step.classList.remove("active");
    step.classList.add("done");
  }

  state.done.add(stepName);

  paintProgress();

  console.log(`LOADER DONE: ${stepName}`);
}

function forceCompleteAllSteps() {
  STEP_ORDER.forEach((stepName) => {
    const step = getStep(stepName);

    if (step) {
      step.classList.remove("active");
      step.classList.add("done");
    }

    state.started.add(stepName);
    state.done.add(stepName);
  });

  paintProgress();
}

export function finishLoader() {
  if (state.finished) return;

  state.finished = true;

  // خیلی مهم:
  // بدون توجه به اینکه چه چیزی موفق یا ناموفق بوده،
  // UI لودر را مستقیماً کامل می‌کنیم.
  forceCompleteAllSteps();

  const progress = getProgress();

  if (progress) {
    progress.style.width = "100%";
  }

  const status = getStatus();

  if (status) {
    status.innerHTML = `
      Workspace Ready
      <span class="dots">
        <i></i>
        <i></i>
        <i></i>
      </span>
    `;
  }

  console.log("LOADER FINISH");

  // اجازه می‌دهیم آخرین تغییرات DOM یک فریم رندر شوند
  requestAnimationFrame(() => {
    setTimeout(() => {
      const loader = getLoader();

      if (!loader) return;

      loader.classList.add("hide");

      console.log("LOADER HIDDEN");
    }, 350);
  });
}
