import TodoList from "./todoList";

const lists = [];
const globalList = new TodoList("Global");

function addList(name) {
  if (!isValidListName(name)) {
    return null;
  }
  const list = new TodoList(name.trim());
  lists.push(list);
  return list;
}

function renameList(id, newName) {
  if (!isValidListName(newName)) {
    return null;
  }
  const list = getListById(id);
  if (!list) return null;
  list.name = newName.trim();
  return list;
}

function deleteList(id) {
  const index = lists.findIndex((list) => list.id === id);
  if (index !== -1) {
    lists.splice(index, 1);
  }
}

function isValidListName(name) {
  const trimmed = name.trim();
  return (
    trimmed.length > 0 &&
    !getLists().some(
      (list) => list.getName().toLowerCase() === trimmed.toLowerCase()
    )
  );
}

function getLists() {
  return lists;
}

function getAllLists() {
  return [...lists, globalList];
}

function getListById(id) {
  return getAllLists().find((list) => list.id === id);
}

function getGlobalList() {
  return globalList;
}

function getGlobalListId() {
  return globalList.id;
}

function addGlobalTodo(todo) {
  globalList.addTodo(todo);
}

function getGlobalTodos() {
  return globalList.getTodos();
}

function getAllTodos() {
  const todos = [];
  getAllLists().forEach((list) => {
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

function getImportantTodos() {
  return getAllTodos().filter((todo) => todo.isImportant);
}

export {
  addList,
  getLists,
  addGlobalTodo,
  getGlobalTodos,
  getAllTodos,
  getPlannedTodos,
  getTodayTodos,
  getGlobalList,
  getListById,
  getGlobalListId,
  renameList,
  deleteList,
  getImportantTodos,
};
