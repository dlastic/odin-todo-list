import TodoList from "./todoList";

const lists = [];
const globalList = new TodoList("Global");

function addList(name) {
  const list = new TodoList(name);
  lists.push(list);
  return list;
}

function getLists() {
  return lists;
}

function addGlobalTodo(todo) {
  globalList.addTodo(todo);
}

function getGlobalTodos() {
  return globalList.getTodos();
}

function getAllTodos() {
  const todos = [...getGlobalTodos()];
  lists.forEach((list) => {
    todos.push(...list.getTodos());
  });
  return todos;
}

function getPlannedTodos() {
  return getAllTodos().filter((todo) => Boolean(todo.dueDate));
}

function getTodayTodos() {
  const today = new Date();
  return getAllTodos().filter((todo) => {
    const dueDate = new Date(todo.dueDate);
    return (
      dueDate.getFullYear() === today.getFullYear() &&
      dueDate.getMonth() === today.getMonth() &&
      dueDate.getDate() === today.getDate()
    );
  });
}

export {
  addList,
  getLists,
  addGlobalTodo,
  getGlobalTodos,
  getAllTodos,
  getPlannedTodos,
  getTodayTodos,
};
