import { webSecurityVideosAndArticles } from "./categoryData.js";
import { createCategory } from "./category.js";
import {
  saveItemsToLocalStorage,
  loadItemsFromLocalStorage,
  USER_FILTERS,
} from "../localStorage.js";
import { getCurrentlyLoggedIn } from "../helperUser.js";

let selectedFilters = [];

export function renderFilters() {
  const user = getCurrentlyLoggedIn();
  const filters = loadItemsFromLocalStorage(USER_FILTERS);

  if (user && filters.length !== 0) {
    selectedFilters = [...new Set([...selectedFilters, ...filters])];
    applyFilters(selectedFilters);
    highlightFilterButtons();
    if (filters) {
      deselectAllButton();
    }
  } else {
    renderAllCategories();
    highlightAllButton();
  }
}

function highlightFilterButtons() {
  document.querySelectorAll(".filterButton").forEach((button) => {
    const filter = button.getAttribute("data-filter");
    if (selectedFilters.includes(filter)) {
      button.classList.add("border-4");
    } else {
      button.classList.remove("border-4");
    }
  });
}

function highlightAllButton() {
  const allButton = document.querySelector(".allFilter");
  allButton.classList.add("text-white");
}

function deselectAllButton() {
  const allButton = document.querySelector(".allFilter");
  allButton.classList.remove("text-white");
}

renderFilters();

export function renderCategories(clickedButton) {
  const filter = clickedButton.getAttribute("data-filter");
  if (filter === "all") {
    renderAllCategories();
    highlightAllButton();
    return;
  }

  deselectAllButton();

  const index = selectedFilters.indexOf(filter);
  if (index === -1) {
    selectedFilters.push(filter);
  } else {
    selectedFilters.splice(index, 1);
  }

  applyFilters(selectedFilters);
  const user = getCurrentlyLoggedIn();
  if (user) {
    saveItemsToLocalStorage(selectedFilters, USER_FILTERS);
  }
}

export function renderAllCategories() {
  const categorySection = document.querySelector(".categorySection");
  categorySection.innerHTML = "";

  webSecurityVideosAndArticles.forEach((category) => {
    createCategory(category);
  });

  selectedFilters = [];
  const filterButtons = document.querySelectorAll(".filterButton");
  filterButtons.forEach((button) => {
    button.classList.remove("border-4");
  });
}

document.querySelectorAll(".filterButton").forEach((button) => {
  button.addEventListener("click", (event) => {
    renderCategories(event.currentTarget);
  });
});

document.querySelector(".allFilter").addEventListener("click", (event) => {
  renderCategories(event.currentTarget);
});

function applyFilters(filters) {
  let filteredCategories;
  if (filters.length === 0) {
    filteredCategories = webSecurityVideosAndArticles;
  } else {
    filteredCategories = webSecurityVideosAndArticles.filter((category) => {
      return (
        filters.includes(category.type) || filters.includes(category.category)
      );
    });
  }

  const categorySection = document.querySelector(".categorySection");
  categorySection.innerHTML = "";
  filteredCategories.forEach((category) => {
    createCategory(category);
  });

  highlightFilterButtons();
}
