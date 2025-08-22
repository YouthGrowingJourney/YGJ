document.addEventListener("DOMContentLoaded", () => {

  const sidebar = document.getElementById("sidebar");
  const menuBtn = document.getElementById("menu-toggle");
  const closeBtn = document.getElementById("close-sidebar");
  const logoutBtn = document.getElementById("logout-btn");

  // --- Sidebar öffnen/schließen ---
  if (menuBtn && sidebar && closeBtn) {
    menuBtn.addEventListener("click", () => sidebar.classList.toggle("open"));
    closeBtn.addEventListener("click", () => sidebar.classList.remove("open"));
  }

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
      const currentUser = localStorage.getItem("currentUser");
      if (!currentUser) {
        // Nicht eingeloggt -> Weiterleitung
        window.location.href = "login.html";
      } else {
        // Eingeloggt -> Modal
        openModal("The free plan will be available soon. Stay tuned!");
      }
    });

    startButtons[1].addEventListener("click", () => {
      const currentUser = localStorage.getItem("currentUser");
      if (!currentUser) {
        window.location.href = "login.html";
      } else {
        openModal("Premium features will follow!");
      }
    });
  }
}

  // --- Logout ---
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("currentUser");
      window.location.href = "index.html";
    });
  }

  // --- Login ---
  const loginSubmit = document.getElementById("login-submit");
  if (loginSubmit) {
    loginSubmit.addEventListener("click", () => {
      const username = document.getElementById("login-username").value.trim();
      const password = document.getElementById("login-password").value.trim();
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find(u => u.username === username && u.password === password);
      const msg = document.getElementById("login-message");

      if (user) {
        localStorage.setItem("currentUser", username);
        msg.textContent = "Log-In Successful!";
        msg.style.color = "#0f0";
        setTimeout(() => window.location.href = "profile.html", 1000);
      } else {
        msg.textContent = "Wrong Username or Password";
        msg.style.color = "#f00";
      }
    });
  }

  // --- Register ---
  const registerSubmit = document.getElementById("register-submit");
  if (registerSubmit) {
    registerSubmit.addEventListener("click", () => {
      const username = document.getElementById("new-username").value.trim();
      const password = document.getElementById("new-password").value.trim();
      const msg = document.getElementById("register-message");
      if (!username || !password) {
        msg.textContent = "Please Fill Out Everything!";
        msg.style.color = "#f00";
        return;
      }
      let users = JSON.parse(localStorage.getItem("users") || "[]");
      if (users.find(u => u.username === username)) {
        msg.textContent = "Username Was Taken!";
        msg.style.color = "#f00";
        return;
      }
      users.push({username, password});
      localStorage.setItem("users", JSON.stringify(users));
      msg.textContent = "Registration Successful! You Can Log-In Now.";
      msg.style.color = "#0f0";
    });
  }

  // --- Profile Stats ---
  const profileUsername = document.getElementById("username");
  if (profileUsername) {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      window.location.href = "login.html";
    } else {
      profileUsername.textContent = currentUser;

      // Demo-Statistiken, in Zukunft dynamisch aus Datenbank
      const progress = Math.floor(Math.random() * 100); // % Goals completed
      const tasks = Math.floor(Math.random() * 50) + 1;  // Tasks completed
      const streak = Math.floor(Math.random() * 30);     // Days active
      const level = Math.floor(progress / 20) + 1;       // Level based on progress

      document.getElementById("progress-percentage").textContent = progress + "%";
      document.getElementById("tasks-completed").textContent = tasks;
      document.getElementById("streak-days").textContent = streak;
      document.getElementById("level").textContent = level;
    }
  }

  // --- Optional: Button Actions ---
  const editProfileBtn = document.getElementById("edit-profile");
  if (editProfileBtn) {
    editProfileBtn.addEventListener("click", () => alert("Editing profile feature coming soon!"));
  }

  const viewAchievementsBtn = document.getElementById("view-achievements");
  if (viewAchievementsBtn) {
    viewAchievementsBtn.addEventListener("click", () => alert("Achievements page coming soon!"));
  }

}); // <-- Nur EINMAL schließen!

