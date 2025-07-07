import "./styles.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import bindEvents from "./modules/navController";
import { getLists, loadFromLocalStorage } from "./modules/listManager";
import { renderLists } from "./modules/domController";

loadFromLocalStorage();
renderLists(getLists());
bindEvents();
