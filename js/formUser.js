const avatarInput = document.getElementById("profileAvatar");
const avatarPreview = document.getElementById("profileAvatarPreview");

if (avatarInput) {
  avatarInput.addEventListener("change", () => {
    const file = avatarInput.files[0];
    if (!file) return;

    avatarPreview.src = URL.createObjectURL(file);
    avatarPreview.onload = () => {
      avatarPreview.classList.add("loaded");
    };
  });
}

const webObject = {
  usernameView: document.getElementById("usernameView"),
  profile: document.querySelector(".profile img"),
  profileSetupForm: document.getElementById("profileSetupForm"),
  profile_modal: document.querySelector(".profile-modal-wrapper"),
  goal_name: document.querySelector(".goal-name"),
};

webObject.profileSetupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const response = await fetch("php-sql/profile.php", {
    method: "POST",
    body: new FormData(e.target),
  });

  const result = await response.json();

  if (result.success) {
    webObject.usernameView.textContent = result.data.user.display_name;
    webObject.profile.src = result.data.user.avatar;
    webObject.goal_name.textContent = result.data.user.daily_goal;
    webObject.profile_modal.dataset.profile_modal = "completed";
  }
});
