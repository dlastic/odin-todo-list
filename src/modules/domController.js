import {
  getAllTodos,
  getTodayTodos,
  getPlannedTodos,
  getLists,
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
    const checkIcon = document.createElement("i");
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
    const editTodoFormContainer = renderEditTodoForm(todo);

    item.classList.add("todo-item");
    checkDiv.classList.add("todo-check");
    todoDetails.classList.add("todo-details");
    menuContainer.classList.add("todo-menu");
    dueDate.classList.add("todo-due-date");
    menuIconContainer.classList.add("todo-menu-icon");
    menuIcon.classList.add("fa", "fa-ellipsis-vertical");
    importantDiv.classList.add("todo-important");
    importantIcon.classList.add("todo-important-icon");
    todoEditOptions.classList.add("todo-edit-options", "hidden");
    todoEdit.classList.add("todo-edit");
    todoDelete.classList.add("todo-delete");
    importantIcon.classList.add("fa-star", todo.isImportant ? "fas" : "far");
    checkIcon.classList.add(
      "fa",
      todo.completed ? "fa-check-circle" : "fa-circle",
      todo.completed ? "fa-solid" : "fa-regular"
    );
    item.classList.toggle("todo-completed", todo.completed);

    checkDiv.addEventListener("click", (e) => {
      e.stopPropagation();
      todo.toggleComplete();
      renderView(currentView);
    });

    importantDiv.addEventListener("click", (e) => {
      e.stopPropagation();
      todo.isImportant = !todo.isImportant;
      renderView(currentView);
    });

    todoEdit.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleHidden(editTodoFormContainer);
      toggleHidden(item);
    });

    todoDelete.addEventListener("click", (e) => {
      e.stopPropagation();
      const listId = todo.parentListId;
      const list = getListById(listId);
      list.deleteTodo(todo.id);
      renderView(currentView);
    });

    menuIconContainer.addEventListener("click", (e) => {
      e.stopPropagation();
      document.querySelectorAll(".todo-edit-options").forEach((el) => {
        if (el !== todoEditOptions) el.classList.add("hidden");
      });
      todoEditOptions.classList.toggle("hidden");
    });

    document.addEventListener("click", (e) => {
      todoEditOptions.classList.add("hidden");
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
    checkDiv.appendChild(checkIcon);

    item.appendChild(checkDiv);
    item.appendChild(todoDetails);
    item.appendChild(dueDate);
    item.appendChild(importantDiv);
    item.appendChild(menuContainer);

    container.appendChild(item);
    container.appendChild(editTodoFormContainer);
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
    const listItem = document.createElement("div");
    const listName = document.createElement("span");
    const menuContainer = document.createElement("div");
    const menuIconContainer = document.createElement("div");
    const menuIcon = document.createElement("i");

    listItem.classList.add("nav-link");
    listItem.dataset.id = list.id;
    listName.textContent = list.getName();
    menuIconContainer.classList.add("list-menu-icon");
    menuIcon.classList.add("fa", "fa-ellipsis-vertical");

    menuIconContainer.appendChild(menuIcon);
    menuContainer.appendChild(menuIconContainer);
    listItem.appendChild(listName);
    listItem.appendChild(menuContainer);
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

function renderEditTodoForm(todo) {
  const container = document.createElement("div");
  const form = document.createElement("form");
  const titleInput = document.createElement("input");
  const descriptionInput = document.createElement("input");
  const dueDateInput = document.createElement("input");
  const confirmBtn = document.createElement("button");
  const cancelBtn = document.createElement("button");

  container.classList.add("edit-todo-popup", "hidden");
  form.id = "edit-todo-form";
  form.autocomplete = "off";
  titleInput.name = "title";
  titleInput.value = todo.title;
  titleInput.classList.add("edit-todo-title");
  titleInput.placeholder = "Title";
  titleInput.required = true;
  descriptionInput.name = "description";
  descriptionInput.value = todo.description;
  descriptionInput.placeholder = "Description";
  dueDateInput.type = "date";
  dueDateInput.name = "dueDate";
  dueDateInput.value = todo.dueDate || "";
  confirmBtn.textContent = "Confirm";
  confirmBtn.type = "submit";
  confirmBtn.classList.add("confirm-btn");
  cancelBtn.textContent = "Cancel";
  cancelBtn.type = "button";
  cancelBtn.classList.add("cancel-btn");

  form.appendChild(titleInput);
  form.appendChild(descriptionInput);
  form.appendChild(dueDateInput);
  form.appendChild(confirmBtn);
  form.appendChild(cancelBtn);
  container.appendChild(form);

  cancelBtn.addEventListener("click", (e) => {
    e.preventDefault();
    toggleHidden(container);
    renderView(currentView);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = getFormData(form);
    todo.title = data.title;
    todo.description = data.description;
    todo.dueDate = data.dueDate || null;
    toggleHidden(container);
    renderView(currentView);
  });

  return container;
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
