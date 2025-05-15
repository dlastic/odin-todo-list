import restaurantImg from "./images/restaurant.jpg";

export default function loadHome() {
  const content = document.querySelector("#content");

  const headline = document.createElement("h1");
  const image = document.createElement("img");
  const description = document.createElement("p");

  headline.textContent = "Benvenuti alla Trattoria Daniele";
  description.textContent = `
    Nestled in the heart of the city, Trattoria Roma brings the soul of Italy to your plate.
    From hand-tossed pizzas to slow-simmered sauces passed down through generations,
    every bite is a tribute to authentic Italian tradition.
    Join us for a cozy evening, a glass of wine, and food made with amore.
  `;
  image.src = restaurantImg;
  image.alt = "Italian restaurant tables";

  content.appendChild(headline);
  content.appendChild(image);
  content.appendChild(description);
}
