import TodoList from "./todoList";

const lists = [];
const globalList = new TodoList("Global");

function addList(name) {
  const list = new TodoList(name);
  lists.push(list);
  return list;
}

function getLists(params) {
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

export { addList, getLists, addGlobalTodo, getGlobalTodos, getAllTodos };
