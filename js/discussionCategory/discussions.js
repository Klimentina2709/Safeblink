import { commentsData } from "./commentsData.js";
import { getCurrentlyLoggedIn } from "../helperUser.js";
import {
  getDataFromLocalStorage,
  saveDataToLocalStorage,
} from "../localStorage.js";
import { setPopUp } from "../main.js";
import { routes } from "../router.js";
import { users } from "../profile/usersActivity.js";

export const USER_COMMENTS = "discussionComments";

const discussionSection = document.querySelector(".discussionSection");

export function createCommentHTML(comment) {
  let backgroundColorClass = backgroundColor(comment);
  discussionSection.innerHTML += `
  <div class="p-4 mb-4 flex flex-col justify-between rounded-md shadow-lg bg-opacity-60 backdrop-blur-lg  ${backgroundColorClass}">
      <p style="word-break: break-all;">${comment.text}</p>
      <div>
      <div class="flex items-center pt-5">
          <img src="${comment.image}" alt="img" class="w-8 h-8 rounded-full" />
          <div class="flex justify-between p-2 w-full">
          <span>${comment.user}</span>
          <span class="text-gray-600">${comment.date}</span>
          </div>
      </div>
      <div class="border-b border-stone-800 text-gray-600 cursor-not-allowed">Пиши коментар</div>
          <div class="flex justify-between py-2 w-full">
          <span> <i class="fas fa-plus cursor-not-allowed"></i> ${comment.commentCount} коментар</span>
          <span> <i class="fa-regular fa-heart cursor-not-allowed heart-interaction"></i> ${comment.reactionCount} реакции</span>
      </div>
  </div>
</div>

    `;
}

function backgroundColor(comment) {
  if (comment.reactionCount > 20) {
    return "bg-indigo-600";
  } else if (comment.reactionCount > 10 && comment.reactionCount <= 20) {
    return "bg-purple-600";
  } else if (comment.reactionCount <= 10) {
    return "bg-sky-600";
  }
}

const user = getCurrentlyLoggedIn();
const iconPlus = document.querySelector(".fa-beat");

document.querySelector("#fixedDiv").style.display = user ? "none" : "flex";
document.querySelector("#textareaInputField").style.display = user
  ? "block"
  : "none";

iconPlus.addEventListener("click", () => {
  setPopUp(
    "Oops..",
    "Потребно е да бидете логирани за да пристапите кон целосната содржина",
    routes.signPage
  );
});

const textarea = document.querySelector("#textarea");
const btn = document.querySelector(".btn");

const date = new Date();
const monthsMacedonian = [
  "Јануари",
  "Февруари",
  "Март",
  "Април",
  "Мај",
  "Јуни",
  "Јули",
  "Август",
  "Септември",
  "Октомври",
  "Ноември",
  "Декември",
];

const month = monthsMacedonian[date.getMonth()];
const day = date.getDate();
const year = date.getFullYear();
const hours = date.getHours();
const minutes = date.getMinutes();

const formattedDate = `${day} ${month} ${year}, ${hours}:${minutes}`;

btn.addEventListener("click", () => {
  if (textarea.value === "") {
    document.querySelector(".hiddenTextarea").style.display = "block";
    return;
  }
  document.querySelector(".hiddenTextarea").style.display = "none";

  const userLogged = getCurrentlyLoggedIn();
  const userArray = users.find((id) => id.userId === userLogged);
  const profilePicture = userArray.profilePic;

  const newComment = {
    id: Math.random().toString(16).slice(2),
    text: textarea.value,
    user: userLogged,
    date: formattedDate,
    image: profilePicture,
    commentCount: 0,
    reactionCount: 0,
  };

  const existingComments = getDataFromLocalStorage(USER_COMMENTS) || [];
  const updatedComments = [newComment, ...existingComments];
  saveDataToLocalStorage(USER_COMMENTS, updatedComments);
  handleCardsForLoggedInUser();

  textarea.value = "";
});

export function handleCardsForLoggedInUser() {
  const user = getCurrentlyLoggedIn();
  document.querySelector("#fixedDiv").style.display = user ? "none" : "flex";
  document.querySelector("#textareaInputField").style.display = user
    ? "block"
    : "none";

  const loadComments = getDataFromLocalStorage(USER_COMMENTS);
  const displayComments = mergeComments(loadComments);

  discussionSection.innerHTML = "";
  displayComments.forEach((comment) => {
    createCommentHTML(comment);
  });
}

export function handleCardsForLoggedOutUser() {
  const user = getCurrentlyLoggedIn();
  document.querySelector("#fixedDiv").style.display = user ? "none" : "flex";
  document.querySelector("#textareaInputField").style.display = user
    ? "block"
    : "none";
  const loadComments = getDataFromLocalStorage(USER_COMMENTS);
  const displayComments = mergeComments(loadComments);

  discussionSection.innerHTML = "";
  const someData = displayComments.slice(0, 12);

  someData.forEach((comment) => {
    createCommentHTML(comment);
  });
}

export function mergeComments(loadComments) {
  return [...loadComments, ...commentsData];
}
