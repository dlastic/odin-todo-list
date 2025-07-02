export default class Todo {
  constructor(title, description, dueDate, isImportant) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.isImportant = isImportant;
  }

  toggleComplete() {
    this.completed = !this.completed;
  }

  updateImportance(isImportant) {
    this.isImportant = isImportant;
  }
}
