import { webSecurityVideosAndArticles } from "./categoryData.js";
import { createComment } from "./userComments.js";
import { trackVideoPlay, trackArticleView } from "../profile/profileBadge.js";

const categorySection = document.querySelector(".categorySection");
const modal = document.querySelector("#myModal");
const modalSection = modal.querySelector(".modalSection");
const modalComments = modal.querySelector(".modalComments");
const modalVisual = modal.querySelector(".modalVisual");
const escButton = document.querySelector(".escButton");

escButton.addEventListener("click", () => {
  document.querySelector("header").style.display = "block";
  modal.style.display = "none";

  const videos = modalVisual.querySelectorAll(".videoPart");
  videos.forEach((video) => {
    video.pause();
  });
});

export function createCategory(category) {
  const maxWords = 15;
  const truncatedText =
    category.text.split(" ").slice(0, maxWords).join(" ") + "...";
  const card = document.createElement("div");
  card.classList.add("relative", "cardsPart");

  if (category.type === "video") {
    card.innerHTML = `
    <div class="relative cursor-pointer shadow-lg glow-border">
    <video class="videoPart h-full w-full rounded-lg" muted>
        <source src="${category.URL}" type="video/mp4">
        Your browser does not support the video tag.
    </video>

    <div class="absolute inset-x-0 top-1/4 flex justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
        <i class="fa-solid fa-circle-play text-white opacity-75 text-5xl"></i>
    </div>
</div>

    `;
  } else if (category.type === "article") {
    card.innerHTML = `
      <img src="${category.URL}" class="h-full w-full rounded-lg shadow-lg glow-border cursor-pointer articlePart" />
    `;
  }

  card.innerHTML += `
    <div class="absolute bottom-0 left-0 w-full bg-white bg-opacity-60 p-3 h-56 rounded-lg ">
      <h3 class="text-lg font-bold pb-3">${category.title}</h3>
      <p >${truncatedText}</p>
      <span class="text-sm text-gray-700 absolute bottom-3 w-full"> Објавено на ${category.datePosted}</span>
    </div>
  `;

  card.addEventListener("click", () => {
    const itemId = category.id;

    renderCardData(category);

    const selectedItem = webSecurityVideosAndArticles.find(
      (item) => item.id === itemId
    );
    if (selectedItem) {
      createComment(selectedItem);
    }
    if (category.comments && Array.isArray(category.comments)) {
      renderComments(category.comments);
    }
    renderVisual(category);
    modal.style.display = "flex";
  });
  categorySection.appendChild(card);
}

function renderCardData(category) {
  const cardTitle = category.title;
  const cardText = category.text;
  const cardDate = category.datePosted;

  modalSection.innerHTML = `
    <h2 class="text-xl font-semibold mb-2">${cardTitle}</h2>
    <p class="text-gray-700">${cardText}</p>
    <p class="text-sm text-gray-600 mt-2">${cardDate}</p>
  `;
}

export function renderComments(commentsData) {
  modalComments.innerHTML = "";

  document.querySelector("header").style.display = "none";
  commentsData.forEach((comment) => {
    const commentText = comment.comment;
    const userImage = comment.userImage;
    const dateComment = comment.dateComment;
    const userName = comment.userName;

    modalComments.innerHTML += `
      <div class="border-2 border-gray-900 text-indigo-950 rounded-xl p-3 my-3">
        ${commentText}
        <div class="flex justify-between pt-2">
          <div class="flex items-center">
            <span class="pr-2">
              <img src="${userImage}" alt="User Image" class="h-10 w-10 rounded-full" />
            </span>
            <!-- Add the username here if it's available in the comment object -->
            <span>${userName}</span>
          </div>
          <span class="flex items-end">${dateComment}</span>
        </div>
      </div>
    `;
  });
}

function renderVisual(category) {
  if (category.type === "video") {
    modalVisual.innerHTML = `
    <video class="videoPart h-full w-full rounded-lg" controls>
    <source src="${category.URL}" type="video/mp4">
    Your browser does not support the video tag.
</video>
    `;

    const videoElement = modalVisual.querySelector(".videoPart");
    videoElement.addEventListener("play", () => {
      trackVideoPlay(category.id);
    });
  } else if (category.type === "article") {
    modalVisual.innerHTML = `
      <img src="${category.URL}" class="h-full w-full articlePart" />
    `;

    if (category.type === "article") {
      trackArticleView(category.id);
    }
  }
}

webSecurityVideosAndArticles.forEach((category) => {
  createCategory(category);
});
