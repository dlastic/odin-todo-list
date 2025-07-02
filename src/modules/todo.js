export default class Todo {
  constructor(title, description, dueDate) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.isImportant = false;
  }

  toggleComplete() {
    this.completed = !this.completed;
  }

  updateImportance(isImportant) {
    this.isImportant = isImportant;
  }
}
