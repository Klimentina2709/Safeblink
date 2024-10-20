import { routes } from "./router.js";
import { setPopUp } from "./main.js";

export const LOGGED_SESSION = "currentUsername";
const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let inputNameValue = document.querySelector("#name").value;
  let inputPasswordValue = document.querySelector("#password").value;

  const requestData = {
    username: inputNameValue,
    password: inputPasswordValue,
  };
  if (inputNameValue === "" || inputPasswordValue === "") {
    document.querySelector(".hiddenFormText").style.display = "block";
    return;
  }

  document.querySelector(".hiddenFormText").style.display = "none";

  fetch("http://localhost:5000/api/authentication", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  })
    .then((response) => {
      if (response.ok) {
        localStorage.setItem(LOGGED_SESSION, inputNameValue);
        setPopUp("Добредојде", "Успешно креиран профил", routes.profilePage);
      } else {
        if (response.status === 401) {
          setPopUp(
            "Грешка",
            "Погрешно внесени корисничко име или лозинка",
            routes.signPage
          );
        }
      }
    })
    .catch((error) => {
      alert(error.message);
    });

  form.reset();
});
