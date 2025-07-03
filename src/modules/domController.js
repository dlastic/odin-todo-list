import {
  getAllTodos,
  getTodayTodos,
  getPlannedTodos,
  getLists,
  getGlobalList,
  getListById,
} from "./listManager";

let currentView = "all-tasks"; // Default view

function clearContainer(container) {
  container.innerHTML = "";
}

function renderTodos(todos, container) {
  clearContainer(container);
  todos.forEach((todo) => {
    const item = document.createElement("div");
    const checkDiv = document.createElement("div");
    const todoDetails = document.createElement("div");
    const menuContainer = document.createElement("div");
    const importantDiv = document.createElement("div");
    const title = document.createElement("h3");
    const description = document.createElement("p");
    const dueDate = document.createElement("div");
    const importantIcon = document.createElement("i");
    const menuIconContainer = document.createElement("div");
    const menuIcon = document.createElement("i");
    const todoEditOptions = document.createElement("div");
    const todoEdit = document.createElement("button");
    const todoDelete = document.createElement("button");

    item.classList.add("todo-item");
    checkDiv.classList.add("todo-check");
    todoDetails.classList.add("todo-details");
    menuContainer.classList.add("todo-menu");
    dueDate.classList.add("todo-due-date");
    menuIconContainer.classList.add("todo-menu-icon");
    menuIcon.classList.add("fa", "fa-ellipsis-vertical");
    importantDiv.classList.add("todo-important");
    importantIcon.classList.add("todo-important-icon");
    todoEditOptions.classList.add("todo-edit-options");
    todoEdit.classList.add("todo-edit");
    todoDelete.classList.add("todo-delete");
    todo.isImportant
      ? importantIcon.classList.add("fas", "fa-star")
      : importantIcon.classList.add("far", "fa-star");

    importantDiv.addEventListener("click", (e) => {
      e.stopPropagation();
      todo.isImportant = !todo.isImportant;
      renderView(currentView);
    });

    todoDelete.addEventListener("click", (e) => {
      e.stopPropagation();
      const listId = todo.parentListId;
      const list = getListById(listId);
      console.log("Deleting todo:", todo.title, "from list:", list.getName());
      list.deleteTodo(todo.id);
      console.log("Todo deleted successfully.");
      renderView(currentView);
    });

    title.textContent = todo.title;
    description.textContent = todo.description;
    dueDate.textContent = `${todo.dueDate ? todo.dueDate : "No Due Date"}`;
    todoEdit.textContent = "Edit";
    todoDelete.textContent = "Delete";

    todoDetails.appendChild(title);
    todoDetails.appendChild(description);
    menuIconContainer.appendChild(menuIcon);
    importantDiv.appendChild(importantIcon);
    todoEditOptions.appendChild(todoEdit);
    todoEditOptions.appendChild(todoDelete);
    menuContainer.appendChild(menuIconContainer);
    menuContainer.appendChild(todoEditOptions);

    item.appendChild(checkDiv);
    item.appendChild(todoDetails);
    item.appendChild(dueDate);
    item.appendChild(importantDiv);
    item.appendChild(menuContainer);

    container.appendChild(item);
  });
}

function renderView(view) {
  const projectHeading = document.querySelector(".project-heading");
  const projectContent = document.querySelector(".project-content");
  currentView = view;
  clearContainer(projectContent);

  const lists = getLists();
  const matchedList = lists.find(
    (list) => list.id === view || list.id === Number(view)
  );
  if (matchedList) {
    projectHeading.textContent = matchedList.getName();
    renderTodos(matchedList.getTodos(), projectContent);
    return;
  }

  switch (view) {
    case "my-day":
      projectHeading.textContent = "My Day";
      renderTodos(getTodayTodos(), projectContent);
      break;

    case "planned":
      projectHeading.textContent = "Planned";
      renderTodos(getPlannedTodos(), projectContent);
      break;

    case "all-tasks":
      projectHeading.textContent = "All Tasks";
      renderTodos(getAllTodos(), projectContent);
      break;

    default:
      projectHeading.textContent = "All Tasks";
      renderTodos(getAllTodos(), projectContent);
  }
}

function renderLists(lists) {
  const listsContainer = document.querySelector(".user-lists");
  clearContainer(listsContainer);
  lists.forEach((list) => {
    const listItem = document.createElement("li");
    const btn = document.createElement("button");

    btn.classList.add("nav-link");
    btn.textContent = list.getName();
    btn.dataset.id = list.id;

    listItem.appendChild(btn);
    listsContainer.appendChild(listItem);
  });
}

function toggleHidden(element) {
  element.classList.toggle("hidden");
}

function toggleHiddenGroup(elements) {
  elements.forEach((element) => {
    toggleHidden(element);
  });
}

function clearInput(inputEl) {
  inputEl.value = "";
}

function setMinimumDate(inputEl) {
  const today = new Date().toISOString().split("T")[0];
  inputEl.min = today;
}

function getFormData(form) {
  const formData = new FormData(form);
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });
  return data;
}

function showListInputError(input, message) {
  input.value = "";
  input.placeholder = message;
  input.focus();
}

function resetListInputPlaceholder(input) {
  input.placeholder = "Enter list name";
}

function getSelectedUserListId() {
  return getSelectedUserList()?.id || null;
}

function getSelectedUserList() {
  const matchedList = getLists().find(
    (list) => list.id === Number(currentView)
  );
  return matchedList || null;
}

export {
  renderTodos,
  renderView,
  renderLists,
  getFormData,
  toggleHidden,
  toggleHiddenGroup,
  clearInput,
  resetListInputPlaceholder,
  setMinimumDate,
  showListInputError,
  getSelectedUserList,
  getSelectedUserListId,
  currentView,
};
