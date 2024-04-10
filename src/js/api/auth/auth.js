import { onAuth } from "./authFunctions.js";

function authFormListener() {
    const authForm = document.getElementById("authForm");
    authForm.addEventListener("submit", onAuth);
}

authFormListener();