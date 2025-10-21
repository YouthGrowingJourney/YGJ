// script.js (kompletter Ersatz)
// YGJ - Global Script (Theme per User + Navbar + Auth + Page-specific behavior)
// Autor: ChatGPT für dich, Bruder. 💪🔥

document.addEventListener("DOMContentLoaded", () => {

  /* ============================
     BACKEND BASE URL (Render)
     ============================ */
  const API_BASE = "https://ygj-auth.onrender.com"; // deine URL!

  /* ============================
     THEME (Per-User Light/Dark)
     ============================ */
  function getCurrentUser() {
    return localStorage.getItem("currentUser") || "guest";
  }
  function themeKeyForUser(user) {
    return `ygj_theme_${user}`;
  }

  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;

  (function migrateGlobalTheme() {
    try {
      const globalTheme = localStorage.getItem("theme");
      if (!globalTheme) return;
      const user = getCurrentUser();
      const perUserKey = themeKeyForUser(user);
      if (!localStorage.getItem(perUserKey)) {
        localStorage.setItem(perUserKey, globalTheme);
      }
    } catch (e) {}
  })();

  function readSavedThemeForCurrentUser() {
    const user = getCurrentUser();
    const perUserKey = themeKeyForUser(user);
    return localStorage.getItem(perUserKey);
  }

  function saveThemeForCurrentUser(value) {
    const user = getCurrentUser();
    const perUserKey = themeKeyForUser(user);
    localStorage.setItem(perUserKey, value);
  }

  function applyTheme(theme) {
    if (theme === "dark") body.classList.add("dark");
    else body.classList.remove("dark");
    if (themeToggle) {
      themeToggle.textContent = (theme === "dark") ? "☀️" : "🌙";
    }
  }

  (function initTheme() {
    const saved = readSavedThemeForCurrentUser();
    if (saved === "dark" || saved === "light") {
      applyTheme(saved);
    } else {
      const global = localStorage.getItem("theme");
      if (global === "dark" || global === "light") {
        applyTheme(global);
        saveThemeForCurrentUser(global);
      } else {
        applyTheme("light");
        saveThemeForCurrentUser("light");
      }
    }
  })();

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isDark = body.classList.contains("dark");
      const next = isDark ? "light" : "dark";
      applyTheme(next);
      saveThemeForCurrentUser(next);
    });
  }

  /* ============================
     SIDEBAR
     ============================ */
  const sidebar = document.getElementById("sidebar");
  const menuBtn = document.getElementById("menu-toggle");
  const closeBtn = document.getElementById("close-sidebar");
  if (menuBtn && sidebar && closeBtn) {
    menuBtn.addEventListener("click", () => sidebar.classList.toggle("open"));
    closeBtn.addEventListener("click", () => sidebar.classList.remove("open"));
  }

  /* ============================
     NAVBAR LOGIN/SIGNUP/LOGOUT
     ============================ */
  const loginBtn = document.getElementById("login-btn");
  const signupBtn = document.getElementById("signup-btn");
  const logoutBtn = document.getElementById("logout-btn");

  function updateNav() {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser && currentUser !== "null") {
      if (loginBtn) loginBtn.style.display = "none";
      if (signupBtn) signupBtn.style.display = "none";
      if (logoutBtn) logoutBtn.style.display = "inline-block";
    } else {
      if (loginBtn) loginBtn.style.display = "inline-block";
      if (signupBtn) signupBtn.style.display = "inline-block";
      if (logoutBtn) logoutBtn.style.display = "none";
    }
  }

  document.body.addEventListener("click", async (e) => {
    if (e.target && e.target.id === "logout-btn") {
      await fetch(`${API_BASE}/logout`, {
        method: "POST",
        credentials: "include"
      });
      localStorage.removeItem("currentUser");
      updateNav();
      alert("You have been logged out.");
      window.location.href = "index.html";
    }
  });

  updateNav();

  /* ============================
     LOGIN
     ============================ */
  const loginSubmit = document.getElementById("login-submit");
  if (loginSubmit) {
    loginSubmit.addEventListener("click", async () => {
      const username = document.getElementById("login-username").value.trim();
      const password = document.getElementById("login-password").value.trim();
      const msg = document.getElementById("login-message");

      if (!username || !password) {
        msg.textContent = "Please fill all fields!";
        msg.style.color = "#f00";
        return;
      }

      try {
        const res = await fetch(`${API_BASE}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ username, password })
        });

        const data = await res.json();

        if (res.ok) {
          msg.textContent = "Login successful!";
          msg.style.color = "#0f0";
          localStorage.setItem("currentUser", username);
          updateNav();
          setTimeout(() => (window.location.href = "profile.html"), 1000);
        } else {
          msg.textContent = data.error || "Invalid credentials.";
          msg.style.color = "#f00";
        }
      } catch (err) {
        console.error(err);
        msg.textContent = "Server error.";
        msg.style.color = "#f00";
      }
    });
  }

  /* ============================
     REGISTER
     ============================ */
  const registerSubmit = document.getElementById("register-submit");
  if (registerSubmit) {
    registerSubmit.addEventListener("click", async () => {
      const username = document.getElementById("new-username").value.trim();
      const email = document.getElementById("new-email").value.trim();
      const password = document.getElementById("new-password").value.trim();
      const confirmPassword = document.getElementById("new-password-confirm").value.trim();
      const msg = document.getElementById("register-message");

      if (!username || !email || !password || !confirmPassword) {
        msg.textContent = "Please fill out all fields!";
        msg.style.color = "#f00";
        return;
      }
      if (password !== confirmPassword) {
        msg.textContent = "Passwords do not match!";
        msg.style.color = "#f00";
        return;
      }

      try {
        const res = await fetch(`${API_BASE}/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password }),
        });
        const data = await res.json();

        if (res.ok) {
          msg.textContent = "Registration successful!";
          msg.style.color = "#0f0";
          setTimeout(() => (window.location.href = "login.html"), 1200);
        } else {
          msg.textContent = data.error || "Registration failed.";
          msg.style.color = "#f00";
        }
      } catch (err) {
        console.error(err);
        msg.textContent = "Server error.";
        msg.style.color = "#f00";
      }
    });
  }

  /* ============================
     PROFILE
     ============================ */
  const profileUsername = document.getElementById("username");
  if (profileUsername) {
    fetch(`${API_BASE}/check-auth`, { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        if (!data.loggedIn) {
          window.location.href = "login.html";
        } else {
          profileUsername.textContent = localStorage.getItem("currentUser") || "User";
        }
      });
  }

}); // DOMContentLoaded end
