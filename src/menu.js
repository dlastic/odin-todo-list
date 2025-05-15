import margheritaImg from "./images/margherita.jpg";
import carbonaraImg from "./images/carbonara.jpg";
import lasagnaImg from "./images/lasagna.jpg";

export default function loadMenu() {
  const meals = [
    "Pizza Margherita",
    "Spaghetti Carbonara",
    "Lasagna Bolognese",
  ];
  const images = [margheritaImg, carbonaraImg, lasagnaImg];
  const descriptions = [
    "Classic pizza with tomato sauce, mozzarella, and fresh basil.",
    "Pasta with eggs, pecorino cheese, pancetta, and black pepper.",
    "Layered pasta with rich meat sauce, béchamel, and Parmesan cheese.",
  ];
  const prices = ["250", "265", "260"];

  const content = document.querySelector("#content");
  const headline = document.createElement("h1");
  headline.textContent = "Menu";
  content.appendChild(headline);

  for (let i = 0; i < meals.length; i++) {
    const section = document.createElement("section");
    const meal = document.createElement("h2");
    const image = document.createElement("img");
    const description = document.createElement("p");
    const priceParagraph = document.createElement("p");
    const priceTag = document.createElement("strong");

    meal.textContent = meals[i];
    image.src = images[i];
    image.alt = meals[i];
    description.textContent = descriptions[i];
    priceTag.textContent = "Price:";

    priceParagraph.append(priceTag, ` ${prices[i]} CZK`);

    section.appendChild(meal);
    section.appendChild(image);
    section.appendChild(description);
    section.appendChild(priceParagraph);

    content.appendChild(section);
  }
}
