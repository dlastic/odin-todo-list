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
  getSelectedUserList,
  getSelectedUserListId,
  currentView,
} from "./domController";
import {
  addGlobalTodo,
  addList,
  getLists,
  getGlobalListId,
  getListById,
} from "./listManager";
import Todo from "./todo";

export default function bindEvents() {
  const homeNavLinks = document.querySelectorAll(".home-section .nav-link");
  const addListBtn = document.querySelector(".add-list-btn");
  const addListPopup = document.querySelector(".add-list-popup");
  const addListGroup = [addListBtn, addListPopup];
  const addNewListBtn = document.querySelector(".add-btn");
  const cancelNewListBtn = document.querySelector(
    ".add-list-popup-btns .cancel-btn"
  );
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
    renderView(currentView);
  });

  document.addEventListener("click", (e) => {
    if (e.target !== addListBtn && !addListPopup.contains(e.target)) {
      addListPopup.classList.add("hidden");
      addListBtn.classList.remove("hidden");
    }
  });

  homeNavLinks.forEach((btn) => {
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
    renderView(result.id);
  });

  cancelNewListBtn.addEventListener("click", () => {
    toggleHiddenGroup(addListGroup);
    clearInput(addNewListInput);
    resetListInputPlaceholder(addNewListInput);
  });

  newTodoBtn.addEventListener("click", () => {
    toggleHiddenGroup(newTodoGroup);
    todoTitleInput.focus();
  });

  newTodoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const { title, description, dueDate } = getFormData(newTodoForm);
    const trimmed_title = title.trim();
    if (!trimmed_title) {
      showListInputError(todoTitleInput, "Title is required!");
      return;
    }
    if (isGlobalViewSelected()) {
      addGlobalTodo(new Todo(trimmed_title, description, dueDate, getGlobalListId()));
    } else {
      const currentList = getSelectedUserList();
      if (!currentList) {
        console.error("Current list not found!");
        return;
      }
      currentList.addTodo(
        new Todo(trimmed_title, description, dueDate, getSelectedUserListId())
      );
    }
    toggleHiddenGroup(newTodoGroup);
    renderView(currentView);
    newTodoForm.reset();
  });

  cancelTodoBtn.addEventListener("click", () => {
    toggleHiddenGroup(newTodoGroup);
  });

  dueDateInput.addEventListener("click", () => {
    dueDateInput.showPicker();
  });
}

function isGlobalViewSelected() {
  return ["my-day", "planned", "all-tasks", "important"].includes(currentView);
}
