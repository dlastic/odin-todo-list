import { saveToLocalStorage } from "./listManager";

let nextListId = 1;

export default class TodoList {
  constructor(name) {
    this.id = nextListId++;
    this.name = name;
    this.todos = [];
  }

  addTodo(todo) {
    this.todos.push(todo);
    saveToLocalStorage();
  }

  deleteTodo(id) {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      this.todos.splice(index, 1);
    }
    saveToLocalStorage();
  }

  getTodos() {
    return this.todos;
  }

  getName() {
    return this.name;
  }
}
