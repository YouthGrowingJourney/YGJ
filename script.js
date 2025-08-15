document.addEventListener("DOMContentLoaded", () => {

  // --- Funktion für Modals ---
  function openModal(message) {
    const modal = document.createElement("div");
    modal.classList.add("modal-overlay");
    modal.innerHTML = `
      <div class="modal-content">
        <p>${message}</p>
        <button class="close-modal-btn btn">OK</button>
      </div>
    `;
    document.body.appendChild(modal);

    const closeBtn = modal.querySelector(".close-modal-btn");
    closeBtn.addEventListener("click", () => {
      modal.remove();
    });
  }

  // --- Startseiten-Buttons (nur auf index.html) ---
  const startSection = document.querySelector("section.intro");
  if (startSection && window.location.pathname.includes("index.html")) {
    const startButtons = startSection.querySelectorAll(".btn");
    if (startButtons.length >= 2) {
      startButtons[0].addEventListener("click", () => {
        openModal("The free plan will be available soon. Stay tuned!");
      });
      startButtons[1].addEventListener("click", () => {
        openModal("Premium features will follow!");
      });
    }
  }

  // --- Profil-Seite Buttons ---
  const profileSection = document.querySelector("section.intro h2");
  if (profileSection && profileSection.textContent.includes("Profil")) {
    const profileButtons = document.querySelectorAll("section.intro button.btn");
    if (profileButtons.length >= 2) {
      profileButtons[0].addEventListener("click", () => {
        openModal("Soon you can edit your profile!");
      });
      profileButtons[1].addEventListener("click", () => {
        openModal("Statistics are still being build");
      });
    }
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

  if (menuBtn && sidebar && closeBtn) {
    menuBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
    closeBtn.addEventListener('click', () => {
      sidebar.classList.remove('open');
    });
  }

  // --- Sidebar Buttons → Redirect zu Unterseiten ---
  const sidebarButtons = document.querySelectorAll(".sidebar-content button");
  if (sidebarButtons.length >= 4) {
    sidebarButtons[0].addEventListener("click", () => {
      window.location.href = "profile.html";
    });
    sidebarButtons[1].addEventListener("click", () => {
      window.location.href = "about-us.html";
    });
    sidebarButtons[2].addEventListener("click", () => {
      window.location.href = "contact.html";
    });
    sidebarButtons[3].addEventListener("click", () => {
      window.location.href = "logout.html";
    });
  }

});
