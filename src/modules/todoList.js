let nextListId = 1;

export default class TodoList {
  constructor(name) {
    this.id = nextListId++;
    this.name = name;
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

  getName() {
    return this.name;
  }
}
