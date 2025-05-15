export default function loadAbout() {
  const content = document.querySelector("#content");

  const headline = document.createElement("h1");
  const paragraph1 = document.createElement("p");
  const paragraph2 = document.createElement("p");
  const paragraph3 = document.createElement("p");

  headline.textContent = "About Us";
  paragraph1.textContent =
    "Trattoria Daniele was founded with a passion for bringing genuine Italian cuisine to our local community. " +
    "What started as a family dream quickly grew into a beloved neighborhood destination.";
  paragraph2.textContent =
    "We source our ingredients from trusted Italian producers and local farms to ensure every dish is rich in flavor and tradition. " +
    "Our team is dedicated to creating an inviting, warm atmosphere that feels like home.";
  paragraph3.textContent =
    "Come visit us and experience Italian hospitality, one plate at a time.";

  content.appendChild(headline);
  content.appendChild(paragraph1);
  content.appendChild(paragraph2);
  content.appendChild(paragraph3);
}
