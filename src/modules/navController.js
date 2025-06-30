import {
  renderView,
  toggleHidden,
  toggleHiddenGroup,
  clearInput,
  renderLists,
  setMinimumDate,
  getFormData,
  showListInputError,
  resetListInputPlaceholder,
  addDataViewToLists,
} from "./domController";
import { addGlobalTodo, addList, getLists } from "./listManager";
import Todo from "./todo";

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
  const cancelTodoBtn = document.querySelector(".cancel-todo-btn");
  const newTodoForm = document.querySelector("#new-todo-form");
  const dueDateInput = document.querySelector("#due-date");
  const todoTitleInput = document.querySelector(".new-todo-title");

  document.addEventListener("DOMContentLoaded", () => {
    setMinimumDate(dueDateInput);
    renderView("my-day");
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
    const result = addList(addNewListInput.value);
    if (!addNewListInput.value.trim()) {
      showListInputError(addNewListInput, "List name required!");
      return;
    }
    if (result === null) {
      showListInputError(addNewListInput, "List already exists!");
      return;
    }
    toggleHiddenGroup(addListGroup);
    clearInput(addNewListInput);
    resetListInputPlaceholder(addNewListInput);
    renderLists(getLists());
    addDataViewToLists(getLists());
    bindUserListEvents();
  });

  cancelNewListBtn.addEventListener("click", () => {
    toggleHiddenGroup(addListGroup);
    clearInput(addNewListBtn);
    resetListInputPlaceholder(addNewListInput);
  });

  newTodoBtn.addEventListener("click", () => {
    toggleHiddenGroup(newTodoGroup);
    todoTitleInput.focus();
  });

  newTodoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const { title, description, dueDate, priority } = getFormData(newTodoForm);
    addGlobalTodo(new Todo(title, description, dueDate, priority));
    toggleHiddenGroup(newTodoGroup);
    renderView();
    newTodoForm.reset();
  });

  cancelTodoBtn.addEventListener("click", () => {
    toggleHiddenGroup(newTodoGroup);
  });

  dueDateInput.addEventListener("click", () => {
    dueDateInput.showPicker();
  });
}

function bindUserListEvents() {
  const userListButtons = document.querySelectorAll(".user-lists li button");
  userListButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      renderView(btn.dataset.view);
    });
  });
}
