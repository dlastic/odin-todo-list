import TodoList from "./todoList";
import Todo from "./todo";

const lists = [];
const globalList = new TodoList("Global");

function addList(name) {
  if (!isValidListName(name)) {
    return null;
  }
  const list = new TodoList(name.trim());
  lists.push(list);
  saveToLocalStorage();
  return list;
}

function renameList(id, newName) {
  if (!isValidListName(newName)) {
    return null;
  }
  const list = getListById(id);
  if (!list) return null;
  list.name = newName.trim();
  saveToLocalStorage();
  return list;
}

function deleteList(id) {
  const index = lists.findIndex((list) => list.id === id);
  if (index !== -1) {
    lists.splice(index, 1);
  }
  saveToLocalStorage();
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

function saveToLocalStorage() {
  const data = {
    lists: lists.map((list) => ({
      id: list.id,
      name: list.name,
      todos: list.todos,
    })),
    globalList: {
      id: globalList.id,
      name: globalList.name,
      todos: globalList.todos,
    },
  };
  localStorage.setItem("odin-todo-data", JSON.stringify(data));
}

function loadFromLocalStorage() {
  const data = JSON.parse(localStorage.getItem("odin-todo-data"));
  if (!data) return;
  lists.length = 0;
  data.lists.forEach((listData) => {
    const list = new TodoList(listData.name);
    list.id = listData.id;
    list.todos = listData.todos.map((todo) => Object.assign(new Todo(), todo));
    lists.push(list);
  });
  globalList.id = data.globalList.id;
  globalList.name = data.globalList.name;
  globalList.todos = data.globalList.todos.map((todo) =>
    Object.assign(new Todo(), todo)
  );
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
  saveToLocalStorage,
  loadFromLocalStorage,
  getAllLists,
};
