// script.js

document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.querySelectorAll(".btn")[0];
  const premiumBtn = document.querySelectorAll(".btn")[1];

  startBtn.addEventListener("click", () => {
    alert("The free plan is coming soon!");
  });

  premiumBtn.addEventListener("click", () => {
    alert("Premium-Features are there soon!");
  });
});
