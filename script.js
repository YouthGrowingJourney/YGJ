(function() {
  const API_BASE = "https://ygj-auth.onrender.com"; // ✅ Ohne /api/

  // === Verbesserte Auth-Sync ===
  async function tryServerAuthSync() {
    try {
      const res = await fetch(`${API_BASE}/check-auth`, { credentials: "include" });
      if (!res.ok) return;
      const data = await res.json();
      if (data && data.loggedIn && data.username) {
        localStorage.setItem("currentUser", data.username);
      } else {
        localStorage.removeItem("currentUser");
      }
    } catch (e) {
      console.warn("Server auth sync failed:", e);
    }
  }

  // === GLOBALE checkAuth Funktion (wird von Seiten aufgerufen) ===
  window.checkAuth = async function() {
    try {
      const res = await fetch(`${API_BASE}/check-auth`, { credentials: "include" });
      if (!res.ok) throw new Error("Response not ok");
      const data = await res.json();
      
      if (data.loggedIn) {
        localStorage.setItem("currentUser", data.username);
        const usernameEl = document.getElementById("username");
        if (usernameEl) usernameEl.textContent = data.username;
        return true; // ✅ Eingeloggt
      } else {
        localStorage.removeItem("currentUser");
        return false; // ❌ Nicht eingeloggt
      }
    } catch (err) {
      console.error("Auth check failed:", err);
      return false;
    }
  };

  tryServerAuthSync();

  document.addEventListener("DOMContentLoaded", () => {
    /* ============================
       AUTO-LOGIN CHECK (verbessert)
       ============================ */
    const path = window.location.pathname;

    // 🔥 NUR auf Login-Seite prüfen, ob bereits eingeloggt
    if (path.includes("login.html")) {
      (async () => {
        const isLoggedIn = await window.checkAuth();
        if (isLoggedIn) {
          window.location.href = "profile.html";
        }
      })();
    }

    /* ============================
       THEME (per-user)
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
        themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
        themeToggle.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
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
        window.dispatchEvent(new CustomEvent('ygj:themechanged', { detail: { theme: next } }));
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
       MODAL helper
       ============================ */
    window.openModal = function(message) {
      const modal = document.createElement("div");
      modal.classList.add("modal-overlay");
      modal.innerHTML = `
        <div class="modal-content">
          <p>${message}</p>
          <button class="close-modal-btn btn">OK</button>
        </div>
      `;
      document.body.appendChild(modal);
      const closeBtnLocal = modal.querySelector(".close-modal-btn");
      closeBtnLocal.addEventListener("click", () => modal.remove());
    }

    /* ============================
       START Buttons
       ============================ */
    const startSection = document.querySelector("section.intro");
    if (startSection && window.location.pathname.includes("index.html")) {
      const startButtons = startSection.querySelectorAll(".btn");
      if (startButtons.length >= 2) {
        startButtons[0].addEventListener("click", () => {
          const currentUser = localStorage.getItem("currentUser");
          if (!currentUser) window.location.href = "login.html";
        });
        startButtons[1].addEventListener("click", () => {
          const currentUser = localStorage.getItem("currentUser");
          if (!currentUser) {
            window.location.href = "login.html";
          } else {
            window.openModal("Premium features will follow!");
          }
        });
      }
    }

    /* ============================
       NAVBAR LOGIN/SIGNUP/LOGOUT
       ============================ */
    const loginBtn = document.getElementById("login-btn");
    const signupBtn = document.getElementById("signup-btn");
    const logoutBtn = document.getElementById("logout-btn");

    window.updateNav = function() {
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
    window.updateNav();

    document.body.addEventListener("click", (e) => {
      if (e.target && e.target.id === "logout-btn") {
        (async () => {
          try {
            await fetch(`${API_BASE}/logout`, { method: "POST", credentials: "include" });
          } catch (err) {}
          finally {
            localStorage.removeItem("currentUser");
            window.updateNav();
            alert("You have been logged out.");
            window.location.href = "index.html";
          }
        })();
      }
    });

    /* ============================
       LOGIN (page-specific)
       ============================ */
    const loginSubmit = document.getElementById("login-submit");
    if (loginSubmit) {
      loginSubmit.addEventListener("click", () => {
        const username = document.getElementById("login-username").value.trim();
        const password = document.getElementById("login-password").value.trim();
        const msg = document.getElementById("login-message");

        (async () => {
          try {
            const res = await fetch(`${API_BASE}/login`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
              body: JSON.stringify({ username, password })
            });
            const data = await res.json();
            if (res.ok && data.success) {
              localStorage.setItem("currentUser", username);
              msg.textContent = "Log-In Successful!";
              msg.style.color = "#0f0";
              window.updateNav();
              setTimeout(() => window.location.href = "profile.html", 800);
            } else {
              msg.textContent = data.message || "Invalid credentials";
              msg.style.color = "#f00";
            }
          } catch {
            msg.textContent = "Server not reachable.";
            msg.style.color = "#f00";
          }
        })();
      });
    }

    /* ============================
       REGISTER (page-specific)
       ============================ */
    const registerSubmit = document.getElementById("register-submit");
    if (registerSubmit) {
      registerSubmit.addEventListener("click", () => {
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

        (async () => {
          try {
            await fetch(`${API_BASE}/register`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
              body: JSON.stringify({ username, email, password })
            });
            msg.textContent = "Registration successful!";
            msg.style.color = "#0f0";
            setTimeout(() => window.location.href = "login.html", 1000);
          } catch {
            msg.textContent = "Server error.";
            msg.style.color = "#f00";
          }
        })();
      });
    }

    /* ============================
       PROFILE PAGE
       ============================ */
    const profileUsername = document.getElementById("username");
    if (profileUsername) {
      const currentUser = localStorage.getItem("currentUser");
      if (!currentUser) {
        window.location.href = "login.html";
      } else {
        profileUsername.textContent = currentUser;
      }
    }
  });
})();
