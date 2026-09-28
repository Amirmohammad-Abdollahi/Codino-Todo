import { load_note_mess } from "./note-item.js";

const note_object = {
  container_add_note: document.querySelector(".container_add_note"),
  backdrop_note_form: document.querySelector(".backdrop_note_form"),
  quick_btn_title: document.querySelector(".quick_btn_title"),
  add_quick_note: document.querySelector(".add_quick_note"),
  add_note_form: document.querySelector(".add_note_form"),
};

document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", (event) => {
    const menuBtn = event.target.closest(".menu_message_note");

    document
      .querySelectorAll(".message_note_box[data-dropdown='show']")
      .forEach((box) => {
        if (!menuBtn || !box.contains(menuBtn)) {
          box.dataset.dropdown = "hide";
        }
      });

    if (!menuBtn) return;

    const box = menuBtn.closest(".message_note_box");
    if (!box) return;

    const drop_box = box.querySelector(".dropdown_note_message");

    const isOpen = box.dataset.dropdown === "show";

    box.dataset.dropdown = isOpen ? "hide" : "show";

    if (!isOpen) {
      if (box._hideTimer) clearTimeout(box._hideTimer);

      box._hideTimer = setTimeout(() => {
        const hovered = drop_box.matches(":hover");
        if (!hovered) {
          box.dataset.dropdown = "hide";
        }
      }, 2000);
    }
  });

  document.addEventListener("mouseover", (event) => {
    const drop = event.target.closest(".dropdown_note_message");
    if (drop) {
      const box = drop.closest(".message_note_box");
      if (box && box._hideTimer) {
        clearTimeout(box._hideTimer);
      }
    }
  });

  document.addEventListener("mouseout", (event) => {
    const drop = event.target.closest(".dropdown_note_message");
    if (drop) {
      const box = drop.closest(".message_note_box");
      if (box && box.dataset.dropdown === "show") {
        if (box._hideTimer) clearTimeout(box._hideTimer);
        box._hideTimer = setTimeout(() => {
          box.dataset.dropdown = "hide";
        }, 2000);
      }
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      document
        .querySelectorAll(".message_note_box[data-dropdown='show']")
        .forEach((box) => {
          box.dataset.dropdown = "hide";
        });
    }
  });
});

document.addEventListener("click", async (e) => {
  const delete_note_btn = e.target.closest(".delete_mess_note");
  if (!delete_note_btn) return;

  e.preventDefault();
  e.stopPropagation();
  const note_box_target = delete_note_btn.closest(".message_note_box");
  const id_note = note_box_target.dataset.id;

  const response = await fetch("api/delete_note.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id_note }),
  });
  const result = await response.json();

  if (result.success) {
    load_note_mess();
  }
});
document.addEventListener("click", async (e) => {
  const pin_btn = e.target.closest(".pin_mess_note");
  if (!pin_btn) return;

  e.preventDefault();
  e.stopPropagation();

  const note_box = pin_btn.closest(".message_note_box");

  const id_note = note_box.dataset.id;
  const pin = note_box.dataset.pin == "1" ? 0 : 1;

  const response = await fetch("api/edit-pin.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id_note,
      pin,
    }),
  });

  const result = await response.json();

  console.log(result);

  if (result.success) {
    load_note_mess();
  }
});

function hide_note_modal() {
  if (note_object.container_add_note.dataset.form === "show") {
    note_object.container_add_note.dataset.form = "hide";
  }
}

function show_note_modal() {
  if (note_object.container_add_note.dataset.form === "hide") {
    note_object.container_add_note.dataset.form = "show";
  }
}

note_object.backdrop_note_form.addEventListener("click", hide_note_modal);
note_object.quick_btn_title.addEventListener("click", show_note_modal);
note_object.add_quick_note.addEventListener("click", show_note_modal);

note_object.add_note_form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const response = await fetch("api/post-note-info.php", {
    method: "POST",
    body: new FormData(e.target),
  });
  const result = await response.json();
  if (result.success) {
    load_note_mess();
    hide_note_modal();
  } else {
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
});
