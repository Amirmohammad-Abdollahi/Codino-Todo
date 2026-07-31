

export function goal_input_value() {
  const object_goal_part = {
    // Inputs
    in_title: document.querySelector("#goalTitle"),
    in_description: document.querySelector("#goalDescription"),
    in_priority: document.querySelector(".btnPriority"),
    in_status: document.querySelector(".btnStatus"),

    // html box
    title: document.querySelector(".goal-name"),
    description: document.querySelector(".goal-description"),
    priority: document.querySelector(".Priority .badge-text"),
    status: document.querySelector(".Status .badge-text"),
  };

  object_goal_part.in_title.value = object_goal_part.title.textContent;
  object_goal_part.in_description.value =
    object_goal_part.description.textContent;
  object_goal_part.in_priority.value = object_goal_part.priority.textContent;
  object_goal_part.in_status.value = object_goal_part.status.textContent;
}
