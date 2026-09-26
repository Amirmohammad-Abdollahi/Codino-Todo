export async function load_note_mess(e) {
  if (e) e.preventDefault();

  const note_item_box = document.querySelector(".child_quick_main");

  try {
    const response = await fetch(`get-info/get_note.php?t=${Date.now()}`, {
      cache: "no-store",
    });

    const result = await response.json();

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

      return;
    }

    const notes = Array.isArray(result.data) ? result.data : [];

    if (notes.length === 0) {
      note_item_box.innerHTML = `
        <div id="note_box_empty">
          <h3>No notes here</h3>
          <p>Click the button below to add your first note</p>
        </div>
      `;
      return;
    }

    note_item_box.innerHTML = "";

    function time_past(time) {
      const diff = Date.now() - new Date(time).getTime();

      const minute = Math.floor(diff / (1000 * 60));
      const hour = Math.floor(diff / (1000 * 60 * 60));
      const day = Math.floor(diff / (1000 * 60 * 60 * 24));
      const month = Math.floor(day / 30);
      const year = Math.floor(day / 365);

      const rtf = new Intl.RelativeTimeFormat("en", {
        numeric: "auto",
      });

      if (minute < 60) return rtf.format(-minute, "minute");
      if (hour < 24) return rtf.format(-hour, "hour");
      if (day < 30) return rtf.format(-day, "day");
      if (month < 12) return rtf.format(-month, "month");
      return rtf.format(-year, "year");
    }

    notes.forEach((note) => {
      let pin_txt = "";
      if (note.pin_message == 0) {
        pin_txt = "pin";
      } else {
        pin_txt = "unpin";
      }
      note_item_box.innerHTML += `
        <div
          class="message_note_box"
          data-pin="${note.pin_message}"
          data-id="${note.id_note}"
          data-dropdown="hide"
        >

          <div class="dropdown_note_message">
            <div class="pin_mess_note">
<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-pin" viewBox="0 0 16 16">
  <path d="M4.146.146A.5.5 0 0 1 4.5 0h7a.5.5 0 0 1 .5.5c0 .68-.342 1.174-.646 1.479-.126.125-.25.224-.354.298v4.431l.078.048c.203.127.476.314.751.555C12.36 7.775 13 8.527 13 9.5a.5.5 0 0 1-.5.5h-4v4.5c0 .276-.224 1.5-.5 1.5s-.5-1.224-.5-1.5V10h-4a.5.5 0 0 1-.5-.5c0-.973.64-1.725 1.17-2.189A6 6 0 0 1 5 6.708V2.277a3 3 0 0 1-.354-.298C4.342 1.674 4 1.179 4 .5a.5.5 0 0 1 .146-.354m1.58 1.408-.002-.001zm-.002-.001.002.001A.5.5 0 0 1 6 2v5a.5.5 0 0 1-.276.447h-.002l-.012.007-.054.03a5 5 0 0 0-.827.58c-.318.278-.585.596-.725.936h7.792c-.14-.34-.407-.658-.725-.936a5 5 0 0 0-.881-.61l-.012-.006h-.002A.5.5 0 0 1 10 7V2a.5.5 0 0 1 .295-.458 1.8 1.8 0 0 0 .351-.271c.08-.08.155-.17.214-.271H5.14q.091.15.214.271a1.8 1.8 0 0 0 .37.282"/>
</svg>
              <p>${pin_txt}</p>
            </div>

            <div class="delete_mess_note">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>


              <p>delete</p>
            </div>
          </div>

          <div class="header_note_main">
            <div class="title_note_box">
              <h3>${note.title}</h3>
            </div>

            <div class="btn_title_note">
              <div class="pin_message_note">
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pin" viewBox="0 0 16 16">
  <path d="M4.146.146A.5.5 0 0 1 4.5 0h7a.5.5 0 0 1 .5.5c0 .68-.342 1.174-.646 1.479-.126.125-.25.224-.354.298v4.431l.078.048c.203.127.476.314.751.555C12.36 7.775 13 8.527 13 9.5a.5.5 0 0 1-.5.5h-4v4.5c0 .276-.224 1.5-.5 1.5s-.5-1.224-.5-1.5V10h-4a.5.5 0 0 1-.5-.5c0-.973.64-1.725 1.17-2.189A6 6 0 0 1 5 6.708V2.277a3 3 0 0 1-.354-.298C4.342 1.674 4 1.179 4 .5a.5.5 0 0 1 .146-.354m1.58 1.408-.002-.001zm-.002-.001.002.001A.5.5 0 0 1 6 2v5a.5.5 0 0 1-.276.447h-.002l-.012.007-.054.03a5 5 0 0 0-.827.58c-.318.278-.585.596-.725.936h7.792c-.14-.34-.407-.658-.725-.936a5 5 0 0 0-.881-.61l-.012-.006h-.002A.5.5 0 0 1 10 7V2a.5.5 0 0 1 .295-.458 1.8 1.8 0 0 0 .351-.271c.08-.08.155-.17.214-.271H5.14q.091.15.214.271a1.8 1.8 0 0 0 .37.282"/>
</svg>
              </div>

              <div class="menu_message_note">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
</svg>

              </div>
            </div>
          </div>

          <div class="description_note">
            <p>${note.message}</p>
          </div>

          <div class="time_note_ago">
            <p>${time_past(note.created_at)}</p>
          </div>

        </div>
      `;
    });
  } catch (error) {
    console.error("Load notes error:", error);
  }
}
