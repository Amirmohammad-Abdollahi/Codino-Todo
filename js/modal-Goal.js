const editGoalModal = {
  // دکمه‌ها و المان‌های مودال
  openBtn: document.querySelector(".goal-edit-btn"),
  modal: document.querySelector(".modal-wrapper"),
  closeBtn: document.querySelector(".modal-close"),
  cancelBtn: document.querySelector(".btn-secondary"),
  backdrop: document.querySelector(".modal-backdrop"),
  btnPrimary: document.querySelector(".btn-primary"),

  // فیلد عنوان
  titleInput: document.querySelector("#goalTitle"),
  titleCountSpan: document.querySelector(".char-title-count span"),
  titleCountWrapper: document.querySelector(".char-title-count"),

  // فیلد توضیحات
  descriptionInput: document.querySelector("#goalDescription"),
  descriptionCountSpan: document.querySelector(".char-description-count span"),
  descriptionCountWrapper: document.querySelector(".char-description-count"),
};

// ==================== باز و بسته کردن مودال ====================

function showModal() {
  if (editGoalModal.modal) {
    editGoalModal.modal.dataset.modal = "show";
  }
}

function hideModal() {
  if (editGoalModal.modal) {
    editGoalModal.modal.dataset.modal = "hide";
  }
}

// اتصال رویدادها
if (editGoalModal.openBtn && editGoalModal.modal) {
  editGoalModal.openBtn.addEventListener("click", showModal);
}

if (editGoalModal.closeBtn) {
  editGoalModal.closeBtn.addEventListener("click", hideModal);
}

if (editGoalModal.cancelBtn) {
  editGoalModal.cancelBtn.addEventListener("click", hideModal);
}

if (editGoalModal.backdrop) {
  editGoalModal.backdrop.addEventListener("click", hideModal);
}

editGoalModal.openBtn.addEventListener("click", () => {
  showModal();
});

// ==================== شمارنده کاراکتر ====================

function updateCharacterCount(
  inputElement,
  countSpan,
  wrapperElement,
  maxLength,
  dataAttribute,
) {
  if (!inputElement || !countSpan || !wrapperElement) return;

  const update = () => {
    const currentLength = inputElement.value.length;
    countSpan.textContent = currentLength;

    if (currentLength === maxLength) {
      wrapperElement.dataset[dataAttribute] = "yes";
    } else {
      wrapperElement.dataset[dataAttribute] = "no";
    }
  };

  // مقدار اولیه موقع لود
  update();

  // موقع تایپ
  inputElement.addEventListener("input", update);
}

// راه‌اندازی شمارنده‌ها
updateCharacterCount(
  editGoalModal.titleInput,
  editGoalModal.titleCountSpan,
  editGoalModal.titleCountWrapper,
  80,
  "titleError",
);

updateCharacterCount(
  editGoalModal.descriptionInput,
  editGoalModal.descriptionCountSpan,
  editGoalModal.descriptionCountWrapper,
  200,
  "descriptionError",
);