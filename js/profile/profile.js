import { users } from "./usersActivity.js";
import { getCurrentlyLoggedIn } from "../helperUser.js";

// Input
const wrapperDivs = document.querySelectorAll(".wrapperDiv");

wrapperDivs.forEach((wrapper) => {
  const inputBtn = wrapper.querySelector(".inputBtn");
  const inputDiv = wrapper.querySelector(".inputDiv");

  wrapper.addEventListener("mouseover", () => {
    inputBtn.classList.remove("hidden");
    inputDiv.classList.add("border-2", "rounded-md");
  });

  wrapper.addEventListener("mouseout", () => {
    inputBtn.classList.add("hidden");
    inputDiv.classList.remove("border-2", "rounded-md");
  });
});

//Input fields writing

//Year
document.getElementById("year").addEventListener("input", function (e) {
  this.value = this.value.replace(/\D/g, "");
  if (this.value.length > 4) {
    this.value = this.value.slice(0, 4);
  }
});

//Email
document.getElementById("emailButton").addEventListener("click", function () {
  const emailInput = document.getElementById("email");
  const emailError = document.getElementById("emailError");

  if (emailInput.value === "" || !isValidEmail(emailInput.value)) {
    emailError.classList.remove("hidden");
    return;
  } else {
    emailError.classList.add("hidden");
  }
});

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

//Show profile Image

export function showProfileImage() {
  const user = getCurrentlyLoggedIn();
  const userImage = document.querySelector("#userImage");

  const loggedInUser = users.find(
    (userIdentifier) => userIdentifier.userId === user
  );

  if (loggedInUser) {
    userImage.src = loggedInUser.profilePic;
  }
}
