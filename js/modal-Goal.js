const editGoalModal = {
  openBtn: document.querySelector(".goal-edit-btn"),
  modal: document.querySelector(".modal-wrapper"),
  closeBtn: document.querySelector(".modal-close"),
  cancelBtn: document.querySelector(".btn-secondary"),
  backdrop: document.querySelector(".modal-backdrop"),
  btnPrimary: document.querySelector(".btn-primary"),

  titleInput: document.querySelector("#goalTitle"),
  titleCountSpan: document.querySelector(".char-title-count span"),
  titleCountWrapper: document.querySelector(".char-title-count"),

  descriptionInput: document.querySelector("#goalDescription"),
  descriptionCountSpan: document.querySelector(".char-description-count span"),
  descriptionCountWrapper: document.querySelector(".char-description-count"),
};

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

  update();

  inputElement.addEventListener("input", update);
}

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