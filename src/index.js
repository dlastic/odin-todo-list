import loadHome from "./home.js";
import loadMenu from "./menu.js";
import loadAbout from "./about.js";
import "./styles.css";

const NavigationUI = (() => {
  const homeBtn = document.querySelector("#home");
  const menuBtn = document.querySelector("#menu");
  const aboutBtn = document.querySelector("#about");
  const content = document.querySelector("#content");

  const resetContent = () => {
    content.innerHTML = "";
  };

  const bindEvents = () => {
    homeBtn.addEventListener("click", () => {
      resetContent();
      loadHome();
    });
    menuBtn.addEventListener("click", () => {
      resetContent();
      loadMenu();
    });
    aboutBtn.addEventListener("click", () => {
      resetContent();
      loadAbout();
    });
  };

  const init = () => {
    loadHome();
    bindEvents();
  };

  return { init };
})();

NavigationUI.init();
