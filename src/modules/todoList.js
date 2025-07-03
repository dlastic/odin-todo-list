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

  deleteTodo(id) {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      this.todos.splice(index, 1);
    }
  }

  getTodos() {
    return this.todos;
  }

  getName() {
    return this.name;
  }
}
