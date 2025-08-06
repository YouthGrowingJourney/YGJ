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
      openModal("The free plan will be available soon. Stay tuned!");
    });

    buttons[1].addEventListener("click", () => {
      openModal("Premium features will follow!");
    });
  } else {
    console.warn("Nicht genug Buttons auf der Seite gefunden.");
  }

 <script>
  const menuBtn = document.getElementById('menu-toggle');
  const sidebar = document.getElementById('sidebar');

  menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });
</script>




