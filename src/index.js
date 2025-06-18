import "./styles.css";
import { addTodo } from "./modules/todoManager";
import { renderTodos } from "./modules/domController";

addTodo("Study JavaScript", "Work on todo app", "2025-06-20", "High");
addTodo("Read book", "Finish current chapter", "2025-06-19", "Medium");
addTodo("Study JavaScript", "Work on todo app", "2025-06-20", "High");
addTodo("Read book", "Finish current chapter", "2025-06-19", "Medium");
addTodo("Study JavaScript", "Work on todo app", "2025-06-20", "High");
addTodo("Read book", "Finish current chapter", "2025-06-19", "Medium");
addTodo("Study JavaScript", "Work on todo app", "2025-06-20", "High");
addTodo("Read book", "Finish current chapter", "2025-06-19", "Medium");

renderTodos();
