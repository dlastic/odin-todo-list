import { addTodo, getTodos } from "./todoManager";

function renderTodos() {
  const container = document.querySelector(".project-preview");
  container.innerHTML = "";
  getTodos().forEach((todo, index) => {
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

export { renderTodos };
