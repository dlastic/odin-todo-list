import {
  renderView,
  toggleHidden,
  toggleHiddenGroup,
  clearInput,
  renderLists,
  setMinimumDate,
} from "./domController";
import { addList, getLists } from "./listManager";

export default function bindEvents() {
  const homeBtns = document.querySelectorAll(".home-section button");
  const addListBtn = document.querySelector(".add-list-btn");
  const addListPopup = document.querySelector(".add-list-popup");
  const addListGroup = [addListBtn, addListPopup];
  const addNewListBtn = document.querySelector(".add-btn");
  const cancelNewListBtn = document.querySelector(".cancel-btn");
  const addNewListInput = document.querySelector(".add-list-input");
  const newTodoBtn = document.querySelector(".new-todo-btn");
  const newTodoPopup = document.querySelector(".new-todo-popup");
  const newTodoGroup = [newTodoBtn, newTodoPopup];
  const addTodoBtn = document.querySelector(".add-todo-btn");
  const cancelTodoBtn = document.querySelector(".cancel-todo-btn");
  const newTodoForm = document.querySelector(".new-todo-form");
  const dueDateInput = document.querySelector("#due-date");

  document.addEventListener("DOMContentLoaded", () => {
    setMinimumDate(dueDateInput);
  });

  homeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      renderView(btn.dataset.view);
    });
  });

  addListGroup.forEach((el) => {
    addListBtn.addEventListener("click", () => {
      toggleHidden(el);
    });
  });

  addListBtn.addEventListener("click", () => {
    addNewListInput.focus();
  });

  addNewListInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addNewListBtn.click();
    }
  });

  addNewListBtn.addEventListener("click", () => {
    addList(addNewListInput.value);
    toggleHiddenGroup(addListGroup);
    clearInput(addNewListInput);
    renderLists(getLists());
  });

  cancelNewListBtn.addEventListener("click", () => {
    toggleHiddenGroup(addListGroup);
    clearInput(addNewListBtn);
  });

  newTodoBtn.addEventListener("click", () => {
    toggleHiddenGroup(newTodoGroup);
  });

  cancelTodoBtn.addEventListener("click", () => {
    toggleHiddenGroup(newTodoGroup);
  });
}
