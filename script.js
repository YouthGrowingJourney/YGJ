document.addEventListener("DOMContentLoaded", () => {

  const sidebar = document.getElementById("sidebar");
  const menuBtn = document.getElementById("menu-toggle");
  const closeBtn = document.getElementById("close-sidebar");

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
          window.location.href = "login.html";
        } else {
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

  // === Navbar-Buttons ===
  const loginBtn = document.getElementById("login-btn");
  const signupBtn = document.getElementById("signup-btn");
  const logoutBtn = document.getElementById("logout-btn");

  // === Funktion zum UI-Update ===
  function updateNav() {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      if (loginBtn) loginBtn.style.display = "none";
      if (signupBtn) signupBtn.style.display = "none";
      if (logoutBtn) logoutBtn.style.display = "inline-block";
    } else {
      if (loginBtn) loginBtn.style.display = "inline-block";
      if (signupBtn) signupBtn.style.display = "inline-block";
      if (logoutBtn) logoutBtn.style.display = "none";
    }
  }

  // === Logout-Logik ===
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("currentUser");
      updateNav();
      alert("You have been logged out.");
      window.location.href = "index.html";
    });
  }

  // === Bei jedem Seitenaufruf prüfen ===
  updateNav();

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
        updateNav();
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

      const progress = Math.floor(Math.random() * 100);
      const tasks = Math.floor(Math.random() * 50) + 1;
      const streak = Math.floor(Math.random() * 30);
      const level = Math.floor(progress / 20) + 1;

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

// Background Slider
const slides = document.querySelectorAll(".bg-slide");
const prevBtn = document.getElementById("bg-prev");
const nextBtn = document.getElementById("bg-next");
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    if (i === index) {
      slide.classList.add("active");
    }
  });
}

prevBtn.addEventListener("click", () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
});

nextBtn.addEventListener("click", () => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
});

// Optional: automatischer Wechsel alle 7 Sekunden
setInterval(() => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}, 7000);

});

