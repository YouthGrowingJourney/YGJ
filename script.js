// script.js

document.addEventListener("DOMContentLoaded", () => {
  // Buttons abrufen
  const buttons = document.querySelectorAll(".btn");

  // Modal-System erstellen
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

    // Schließen des Modals
    document.getElementById("close-modal").addEventListener("click", () => {
      modal.remove();
    });
  }

  // Button-Klicks zuordnen
  if (buttons.length >= 2) {
    buttons[0].addEventListener("click", () => {
      openModal("🚀 Der kostenlose Plan ist bald verfügbar. Stay tuned!");
    });

    buttons[1].addEventListener("click", () => {
      openModal("💎 Premium-Features kommen bald! Bereit für das nächste Level?");
    });
  } else {
    console.warn("Nicht genug Buttons auf der Seite gefunden.");
  }

  // ⚠️ Hier ist Platz für Erweiterungen wie z. B. Warenkorb, Theme-Switcher usw.
});
