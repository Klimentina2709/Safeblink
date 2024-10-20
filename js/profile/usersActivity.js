import { getCurrentlyLoggedIn } from "../helperUser.js";
import {
  saveItemsToLocalStorage,
  loadItemsFromLocalStorage,
} from "../localStorage.js";

export const users = [
  {
    userId: "User123",
    email: "user123@gmail.com",
    profilePic: "../assets/imgProfile/profilePic1.jpg",
    birthYear: "1999",
    gender: "female",
  },
  {
    userId: "User456",
    email: "user456@gmail.com",
    profilePic: "../assets/imgProfile/profilePic3.png",
    birthYear: "1996",
    gender: "male",
  },
  {
    userId: "User789",
    email: "user789@gmail.com",
    profilePic: "../assets/imgProfile/profilePic2.png",
    birthYear: "1990",
    gender: "female",
  },
];

const EDIT = "edit";

const username = document.querySelector("#username");
const profilePic = document.querySelector("#profilePic");
const year = document.querySelector("#year");
const gender = document.querySelector("#gender");
const email = document.querySelector("#email");

export function setProfile() {
  const userLogged = getCurrentlyLoggedIn();
  const loggedInUser = users.find((user) => user.userId === userLogged);

  username.value = loggedInUser.userId;
  year.value = loggedInUser.birthYear;
  gender.value = loggedInUser.gender;
  email.value = loggedInUser.email;
  profilePic.src = loggedInUser.profilePic;

  const newInputValue = loadItemsFromLocalStorage(EDIT);

  if (newInputValue) {
    if (newInputValue.inputEmail) {
      email.value = newInputValue.inputEmail;
    }
    if (newInputValue.inputGender) {
      gender.value = newInputValue.inputGender;
    }
    if (newInputValue.inputYear) {
      year.value = newInputValue.inputYear;
    }
  }
}

export function editFunctionality() {
  const wrapperDiv = document.querySelectorAll(".wrapperDiv");

  wrapperDiv.forEach((wrapper) => {
    const input = wrapper.querySelector("input");
    const button = wrapper.querySelector(".inputBtn");

    button.addEventListener("click", () => {
      if (input.disabled) {
        input.disabled = false;
        button.textContent = "Зачувај";
      } else {
        const newData = {
          inputEmail: email.value,
          inputYear: year.value,
          inputGender: gender.value,
        };
        saveItemsToLocalStorage(newData, EDIT);
        input.disabled = true;
        button.textContent = "Промени";
      }
    });
  });
}

editFunctionality();
