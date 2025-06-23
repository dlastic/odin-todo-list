export default class TodoList {
  constructor(title) {
    this.title = title;
    this.todos = [];
  }

  addTodo(todo) {
    this.todos.push(todo);
  }

  deleteTodo(index) {
    this.todos.splice(index, 1);
  }

  getTodos() {
    return this.todos;
  }

  getTitle() {
    return this.title;
  }
}
