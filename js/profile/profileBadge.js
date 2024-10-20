import {
  loadItemsFromLocalStorage,
  saveItemsToLocalStorage,
  getDataFromLocalStorage,
} from "../localStorage.js";
import { getCurrentlyLoggedIn } from "../helperUser.js";
import { USER_COMMENTS } from "../discussionCategory/discussions.js";

const PROFILE_BADGE_VIDEO = "profileBadgeVideo";
const PROFILE_BADGE_ARTICLE = "profileBadgeArticle";

let countedVideos = [];
let countedArticles = [];
let videoViews = 0;
let articleView = 0;

export function initializeBadges() {
  countedVideos = loadItemsFromLocalStorage(PROFILE_BADGE_VIDEO) || [];
  countedArticles = loadItemsFromLocalStorage(PROFILE_BADGE_ARTICLE) || [];

  videoViews = new Set(countedVideos).size;
  articleView = new Set(countedArticles).size;

  clearBadges();
  renderVideoBadge();
  renderArticleBadge();
  renderDiscussionBadge();
}

function clearBadges() {
  const badgesSection = document.querySelector("#badgesSection");
  while (badgesSection.firstChild) {
    badgesSection.removeChild(badgesSection.firstChild);
  }
}

export function trackVideoPlay(videoId) {
  if (!countedVideos.includes(videoId)) {
    videoViews++;
    countedVideos.push(videoId);
    saveItemsToLocalStorage(countedVideos, PROFILE_BADGE_VIDEO);
    initializeBadges();
  }
}

export function trackArticleView(articleId) {
  if (!countedArticles.includes(articleId)) {
    articleView++;
    countedArticles.push(articleId);
    saveItemsToLocalStorage(countedArticles, PROFILE_BADGE_ARTICLE);
    initializeBadges();
  }
}

export function renderVideoBadge() {
  const milestones = [5, 10, 15];
  const badgesSection = document.querySelector("#badgesSection");

  milestones.forEach((milestone) => {
    if (
      videoViews >= milestone &&
      !document.querySelector(`#badge-${milestone}-videos`)
    ) {
      const div = document.createElement("div");
      div.id = `badge-${milestone}-videos`;

      const imgBadge = document.createElement("img");
      imgBadge.src = `../../assets/img/${milestone}VideosBadge.png`;
      div.appendChild(imgBadge);
      badgesSection.appendChild(div);
    }
  });
}

export function renderArticleBadge() {
  const badgesSection = document.querySelector("#badgesSection");

  if (articleView >= 10) {
    const div = document.createElement("div");
    const imgBadge = document.createElement("img");
    imgBadge.src = "../../assets/img/articles.png";
    div.appendChild(imgBadge);
    badgesSection.appendChild(div);
  }
}

export function renderDiscussionBadge() {
  const badgesSection = document.querySelector("#badgesSection");

  const user = getCurrentlyLoggedIn();
  const existingComments = getDataFromLocalStorage(USER_COMMENTS) || [];

  const userCommented = existingComments.some(
    (comment) => comment.user === user
  );

  if (userCommented) {
    const div = document.createElement("div");
    const imgBadge = document.createElement("img");
    imgBadge.src = "../../assets/img/discussion.png";
    div.appendChild(imgBadge);
    badgesSection.appendChild(div);
  }
}
