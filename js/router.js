import {
  handleCardsForLoggedInUser,
  handleCardsForLoggedOutUser,
} from "./discussionCategory/discussions.js";
import { initializeBadges } from "./profile/profileBadge.js";
import {
  getCurrentlyLoggedIn,
  handleLoggedInUsers,
  handleLoggedOutUsers,
  handleLogout,
} from "./helperUser.js";
import { setPopUp } from "./main.js";
import { setProfile } from "./profile/usersActivity.js";
import { showProfileImage } from "./profile/profile.js";
import { renderFilters } from "./informCategory/categoryFilters.js";

export const routes = {
  landingPage: "landingPage",
  discussionPage: "discussionPage",
  contactPage: "contactPage",
  profilePage: "profilePage",
  learnPage: "learnPage",
  signPage: "signUp",
};

const loggedUser = getCurrentlyLoggedIn();
const currentLocation = location.hash.slice(1);

window.onload = function () {
  window.scrollTo(0, 0);
};

hideSections();

if (loggedUser) {
  handleLoggedInUsers();
  handleCardsForLoggedInUser();
  showProfileImage();
  setProfile();
} else {
  handleLoggedOutUsers();
  handleCardsForLoggedOutUser();
}

if (currentLocation === routes.profilePage && loggedUser) {
  initializeBadges();
}

if (!currentLocation) {
  location.hash = routes.landingPage;
} else {
  const currentSection = document.querySelector(`#${currentLocation}`);
  currentSection.style.display = "block";
}

window.addEventListener("hashchange", () => {
  const hash = location.hash.slice(1);
  const current = document.querySelector(`#${hash}`);
  const valueRoutes = Object.values(routes);

  hideSections();

  renderFilters();
  const loggedUser = getCurrentlyLoggedIn();
  if (loggedUser) {
    setProfile();
    showProfileImage();
    handleLoggedInUsers();
    handleCardsForLoggedInUser();

    if (hash === routes.profilePage) {
      initializeBadges();
    }
  } else {
    handleLoggedOutUsers();
    handleCardsForLoggedOutUser();
  }

  if (valueRoutes.includes(hash)) {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    current.scrollIntoView({
      behavior: "smooth",
    });
    current.style.display = "block";
  } else {
    document.querySelector(`#${routes.landingPage}`).style.display = "block";
  }
});

function hideSections() {
  document
    .querySelectorAll("section")
    .forEach((section) => (section.style.display = "none"));
}

function logOutTheUser(el) {
  document.querySelector(el).addEventListener("click", () => {
    setPopUp("Довидување", "Се гледаме наскоро :)", routes.landingPage);
    handleLogout();
  });
}

logOutTheUser("#logOut a");
logOutTheUser("#logOutSmallerScreen a");
