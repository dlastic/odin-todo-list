function renderTodos(todos, container) {
  container.innerHTML = "";
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

const projectHeading = document.querySelector(".project-heading");
const projectContent = document.querySelector(".project-content");

function clearContent() {
  projectContent.innerHTML = "";
}

function renderView(view) {
  clearContent();

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
      projectContent.innerHTML = "<p>All tasks will be shown here.</p>";
      break;

    default:
      projectHeading.textContent = "Unknown View";
      projectContent.innerHTML = "<p>No view selected.</p>";
  }
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

export { renderTodos, renderView, toggleHidden, toggleHiddenGroup, clearInput };
