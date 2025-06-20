import { renderView } from "./domController";

export default function bindEvents() {
  const homeBtns = document.querySelectorAll(".home-section button");

  homeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      renderView(btn.dataset.view);
    });
  });
}
