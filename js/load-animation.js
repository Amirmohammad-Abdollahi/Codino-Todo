const loader = document.querySelector("#loader");

const steps = document.querySelectorAll(".step");
const progress = document.querySelector(".progress-bar");

let completedSteps = 0;


export function startStep(stepName){

    const step = document.querySelector(
        `[data-step="${stepName}"]`
    );


    if(!step) return;


    step.classList.add("active");

}



export function completeStep(stepName){


    const step = document.querySelector(
        `[data-step="${stepName}"]`
    );


    if(!step) return;


    step.classList.remove("active");

    step.classList.add("done");


    completedSteps++;


    progress.style.width =
    (completedSteps / steps.length) * 100 + "%";



    const next = step.nextElementSibling;


    if(next){

        next.classList.add("active");

    }

}

export function finishLoader() {
  progress.style.width = "100%";

  steps.forEach((step) => {
    step.classList.remove("active");
    step.classList.add("done");
  });

  setTimeout(() => {
    loader.classList.add("hide");
  }, 300);
}
