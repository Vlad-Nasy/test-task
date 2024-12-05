// Size Buttons

const sizeValueElement = document.querySelector(".params__size-value");
const sizeButtons = document.querySelectorAll(".params__size-item");

sizeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!button.classList.contains("disabled")) {
      sizeValueElement.textContent = button.textContent;

      sizeButtons.forEach((btn) => btn.classList.remove("selected"));

      button.classList.add("selected");
    }
  });
});

// Tabs
const tabHeaders = document.querySelectorAll(".tabs__header-item");
const tabContents = document.querySelectorAll(".tabs__content-item");

tabHeaders.forEach((header, index) => {
  header.addEventListener("click", () => {
    tabHeaders.forEach((tab) => tab.classList.remove("selected"));

    header.classList.add("selected");

    tabContents.forEach((content) => content.classList.add("hidden"));

    tabContents[index].classList.remove("hidden");
  });
});

// Modal
const sizeGuideBtn = document.querySelector(".params__size-guide-btn");
const modalOverlay = document.querySelector(".modal-overlay");
const closeModalBtn = document.querySelector(".modal__close-btn");

sizeGuideBtn.addEventListener("click", () => {
  modalOverlay.classList.add("open");
});

closeModalBtn.addEventListener("click", () => {
  modalOverlay.classList.remove("open");
});

modalOverlay.addEventListener("click", (event) => {
  if (event.target === modalOverlay) {
    modalOverlay.classList.remove("open");
  }
});

// Like Buttons
const likeButtons = document.querySelectorAll(".like-btn");

likeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    likeButtons.forEach((btn) => btn.classList.toggle("active"));
  });
});
