import { getCurrentlyLoggedIn } from "./helperUser.js";

export const USER_FILTERS = "userFilters";

export function saveItemsToLocalStorage(item, userKey) {
  const userId = getCurrentlyLoggedIn();
  const key = `${userKey}_${userId}`;
  localStorage.setItem(key, JSON.stringify(item));
}

export function loadItemsFromLocalStorage(userKey) {
  const userId = getCurrentlyLoggedIn();
  const key = `${userKey}_${userId}`;
  const storedItems = localStorage.getItem(key);

  if (storedItems) {
    return JSON.parse(storedItems);
  }
  return [];
}

export function saveDataToLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getDataFromLocalStorage(key) {
  const storedData = localStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : [];
}
