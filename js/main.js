//handling different logic

//play and pause for video

const pauseIcon = document.getElementById("pauseIcon");
const playIcon = document.getElementById("playIcon");
const videoPlayer = document.getElementById("videoPlayer");

playIcon.addEventListener("click", function () {
  videoPlayer.play();
});
pauseIcon.addEventListener("click", function () {
  videoPlayer.pause();
});

//PopUp

export function setPopUp(headerTitle, paragraph, path) {
  document.querySelector("header").style.display = "none";
  document.querySelector("#fixedDiv").style.display = "none";
  const div = document.createElement("div");
  div.setAttribute(
    "class",
    "fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
  );
  const innerDiv = document.createElement("div");
  innerDiv.setAttribute(
    "class",
    "shadow-md p-4 rounded-xl bg-teal-300 hover:bg-gradient-to-br from-teal-200 via-light-teal-300 to-teal-400 transition-colors duration-300 bg-opacity-70 backdrop-blur-lg w-1/2 h-1/2 flex flex-col items-center justify-center "
  );

  const header = document.createElement("h2");
  header.setAttribute(
    "class",
    "text-2xl sm:text-4xl md:text-6xl font-bold mb-4 text-white text-stroke"
  );
  header.innerText = headerTitle;

  const p = document.createElement("p");
  p.setAttribute(
    "class",
    "text-sm sm:text-base md:text-xl lg:text-2xl font-bold mb-4 text-blue-950"
  );
  p.innerText = paragraph;

  const buttonLink = document.createElement("button");
  buttonLink.setAttribute(
    "class",
    "block py-1 sm:py-2 mt-10 px-10 sm:px-20 bg-white bg-opacity-45 text-blue-950 font-medium rounded-lg hover:bg-white hover:bg-opacity-75 hover:brightness-110 text-center transition-all duration-300 shadow-md"
  );
  buttonLink.innerText = "Продолжи";

  buttonLink.addEventListener("click", () => {
    setTimeout(() => {
      div.remove();
    }, 500);
    location.hash = path;
    document.querySelector("header").style.display = "block";
    document.querySelector("#fixedDiv").style.display = "block";
  });

  innerDiv.append(header, p, buttonLink);
  div.appendChild(innerDiv);
  document.body.appendChild(div);
}

//BurgerMenu

document.getElementById("burger-menu").addEventListener("click", function () {
  document.querySelector(".navbarItems").classList.toggle("hidden");
});
