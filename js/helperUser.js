import { LOGGED_SESSION } from "./form.js";
import { routes } from "./router.js";

export function getCurrentlyLoggedIn() {
  return localStorage.getItem(LOGGED_SESSION);
}

export function handleLoggedInUsers() {
  const logSmallerScreen = document.querySelector("#logSmallerScreen");
  const logOutSmallerScreen = document.querySelector("#logOutSmallerScreen");

  document.querySelector("#log").style.display = "none";
  if (logSmallerScreen) logSmallerScreen.style.display = "none";
  document.querySelector("#logOut").style.display = "block";
  if (logOutSmallerScreen) logOutSmallerScreen.style.display = "block";
  document.querySelector("#userImage").style.display = "block";
  document.querySelector("#profile").style.display = "block";
}

export function handleLoggedOutUsers() {
  const logSmallerScreen = document.querySelector("#logSmallerScreen");
  const logOutSmallerScreen = document.querySelector("#logOutSmallerScreen");

  document.querySelector("#log").style.display = "block";
  if (logSmallerScreen) logSmallerScreen.style.display = "block";
  document.querySelector("#logOut").style.display = "none";
  if (logOutSmallerScreen) logOutSmallerScreen.style.display = "none";
  document.querySelector("#userImage").style.display = "none";
  document.querySelector("#profile").style.display = "none";
}

export function handleLogout() {
  const logSmallerScreen = document.querySelector("#logSmallerScreen");

  localStorage.removeItem(LOGGED_SESSION);
  document.querySelector("#profile").style.display = "none";
  document.querySelector("#log").style.display = "block";
  if (logSmallerScreen) logSmallerScreen.style.display = "none";

  location.hash = routes.landingPage;
}
