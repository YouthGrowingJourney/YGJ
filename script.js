document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".btn");

  // Startseiten-Buttons (Modal bleibt)
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

  if (buttons.length >= 2) {
    buttons[0].addEventListener("click", () => {
      openModal("The free plan will be available soon. Stay tuned!");
    });

    buttons[1].addEventListener("click", () => {
      openModal("Premium features will follow!");
    });
  }

  // Sidebar öffnen/schließen
  const menuBtn = document.getElementById('menu-toggle');
  const sidebar = document.getElementById('sidebar');
  const closeBtn = document.getElementById('close-sidebar');

  menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });

  closeBtn.addEventListener('click', () => {
    sidebar.classList.remove('open');
  });

  // Sidebar Buttons → Redirect zu Unterseiten
  const sidebarButtons = document.querySelectorAll(".sidebar-content button");

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

  const profilePage = document.querySelector('section.intro h2');
  if (profilePage && profilePage.textContent.includes("Profil")) {
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
  
});



