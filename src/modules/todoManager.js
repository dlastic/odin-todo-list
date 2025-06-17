import Todo from "./todo";

const todos = [];

function addTodo(title, description, dueDate, priority) {
  const todo = new Todo(title, description, dueDate, priority);
  todos.push(todo);
  return todo;
}

function deleteTodo(index) {
  todos.splice(index, 1);
}

function getTodos() {
  return todos;
}

export { addTodo, deleteTodo, getTodos };
