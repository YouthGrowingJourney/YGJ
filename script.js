document.addEventListener("DOMContentLoaded", () => {

  // --- Modal-Funktion ---
  function openModal(message) {
    const modal = document.createElement("div");
    modal.classList.add("modal-overlay");
    modal.innerHTML = `
      <div class="modal-content">
        <p>${message}</p>
        <button id="close-modal" class="btn">OK</button>
      </div>
    `;
    document.body.appendChild(modal);

    document.getElementById("close-modal").addEventListener("click", () => {
      modal.remove();
    });
  }

  // --- Startseite: Modal für Buttons ---
  const startButtons = document.querySelectorAll("section.intro .btn");
  if (startButtons.length >= 2) {
    startButtons[0].addEventListener("click", () => {
      openModal("The free plan will be available soon. Stay tuned!");
    });
    startButtons[1].addEventListener("click", () => {
      openModal("Premium features will follow!");
    });
  }

  // --- Header Log-In Button ---
  const loginHeaderBtn = document.querySelector(".login-header-btn");
  if (loginHeaderBtn) {
    loginHeaderBtn.addEventListener("click", () => {
      window.location.href = "login.html";
    });
  }

  // --- Sidebar öffnen/schließen ---
  const menuBtn = document.getElementById('menu-toggle');
  const sidebar = document.getElementById('sidebar');
  const closeBtn = document.getElementById('close-sidebar');

  if (menuBtn) menuBtn.addEventListener('click', () => sidebar.classList.toggle('open'));
  if (closeBtn) closeBtn.addEventListener('click', () => sidebar.classList.remove('open'));

  // --- Sidebar Buttons → Redirect ---
  const sidebarButtons = document.querySelectorAll(".sidebar-content button");
  if (sidebarButtons.length >= 4){
    sidebarButtons[0].addEventListener("click", () => window.location.href = "profile.html");
    sidebarButtons[1].addEventListener("click", () => window.location.href = "about-us.html");
    sidebarButtons[2].addEventListener("click", () => window.location.href = "contact.html");
    sidebarButtons[3].addEventListener("click", () => window.location.href = "logout.html");
  }

  // --- Profil-Seite: eigene Buttons ---
  const profilePage = document.querySelector('section.intro h2');
  if (profilePage && profilePage.textContent.includes("Profile")) {
    const profileButtons = document.querySelectorAll("section.intro button.btn");
    if (profileButtons.length >= 2) {
      profileButtons[0].addEventListener("click", () => {
        openModal("Soon you can edit your profile!");
      });
      profileButtons[1].addEventListener("click", () => {
        openModal("Statistics are still being built");
      });
    }
  }

});
