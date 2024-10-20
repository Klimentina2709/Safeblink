import {
  getDataFromLocalStorage,
  saveDataToLocalStorage,
} from "../localStorage.js";
import { getCurrentlyLoggedIn } from "../helperUser.js";
import { users } from "../profile/usersActivity.js";

const COMMENT_SECTION = "commentSection";
const modal = document.querySelector("#myModal");
const newComments = modal.querySelector(".newComments");

export function createComment(selectedItem) {
  if (!selectedItem) {
    console.error("Selected item is undefined");
    return;
  }

  const selectedItemId = selectedItem.id;

  let arrayOfComments = getDataFromLocalStorage(COMMENT_SECTION) || [];
  renderStoredComments(arrayOfComments);

  const inputComment = document.querySelector(".inputComment");
  const btnComment = document.querySelector(".btnComment");

  const user = getCurrentlyLoggedIn();

  inputComment.parentElement.style.display = user ? "flex" : "none";

  const newBtnComment = btnComment.cloneNode(true);
  btnComment.parentNode.replaceChild(newBtnComment, btnComment);

  newBtnComment.addEventListener("click", () => {
    if (inputComment.value === "") {
      document.querySelector(".hiddenText").style.display = "block";
      return;
    }

    document.querySelector(".hiddenText").style.display = "none";

    const date = new Date();

    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const currentDate = `${day}.${month}.${year}, ${hours}:${minutes}`;

    const user = getCurrentlyLoggedIn();
    const userArray = users.find((id) => id.userId === user);
    const profilePicture = userArray.profilePic;

    const createComment = {
      comments: inputComment.value,
      userImage: profilePicture,
      dateComment: currentDate,
      userComment: user,
      itemId: selectedItemId,
    };

    arrayOfComments.unshift(createComment);
    saveDataToLocalStorage(COMMENT_SECTION, arrayOfComments);

    renderStoredComments(arrayOfComments);
    inputComment.value = "";
  });

  function renderStoredComments(comments) {
    newComments.innerHTML = "";
    comments.forEach((comment) => {
      if (comment.itemId === selectedItemId) {
        newComments.innerHTML += `
          <div class="border-2 border-gray-900 text-indigo-950 rounded-xl p-3 my-3">
            ${comment.comments}
            <div class="flex justify-between pt-2">
              <div class="flex items-center">
                <span class="pr-2">
                  <img src="${comment.userImage}" alt="User Image" class="h-10 w-10 rounded-full" />
                </span>
                <span>${comment.userComment}</span>
              </div>
              <span class="flex items-end">${comment.dateComment}</span>
            </div>
          </div>
        `;
      }
    });
  }
}
