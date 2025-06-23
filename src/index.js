import "./styles.css";
import { renderTodos, renderView } from "./modules/domController";
import bindEvents from "./modules/navController";

// addTodo("Study JavaScript", "Work on todo app", "2025-06-20", "High");
// addTodo("Read book", "Finish current chapter", "2025-06-19", "Medium");

renderView("my-day");
bindEvents();
