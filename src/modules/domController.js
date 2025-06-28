import { getAllTodos, getGlobalTodos } from "./listManager";

function clearContainer(container) {
  container.innerHTML = "";
}

function renderTodos(todos, container) {
  clearContainer(container);
  todos.forEach((todo) => {
    const item = document.createElement("div");
    const title = document.createElement("h3");
    const description = document.createElement("p");
    const dueDate = document.createElement("p");
    const priority = document.createElement("p");

    item.classList.add("todo-item");
    title.textContent = todo.title;
    description.textContent = todo.description;
    dueDate.textContent = `Due: ${todo.dueDate}`;
    priority.textContent = `Priority: ${todo.priority}`;

    item.appendChild(title);
    item.appendChild(description);
    item.appendChild(dueDate);
    item.appendChild(priority);

    container.appendChild(item);
  });
}

function renderView(view) {
  const projectHeading = document.querySelector(".project-heading");
  const projectContent = document.querySelector(".project-content");

  clearContainer(projectContent);
  switch (view) {
    case "my-day":
      projectHeading.textContent = "My Day";
      projectContent.innerHTML = "<p>Tasks for today will be shown here.</p>";
      break;

    case "planned":
      projectHeading.textContent = "Planned";
      projectContent.innerHTML = "<p>Planned tasks will be shown here.</p>";
      break;

    case "all-tasks":
      projectHeading.textContent = "All tasks";
      renderTodos(getAllTodos(), projectContent);
      break;

    default:
      projectHeading.textContent = "Unknown View";
      projectContent.innerHTML = "<p>No view selected.</p>";
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

export {
  renderTodos,
  renderView,
  renderLists,
  toggleHidden,
  toggleHiddenGroup,
  clearInput,
  setMinimumDate,
};
