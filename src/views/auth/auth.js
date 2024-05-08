import { authFormStates } from "../../js/helpers/auth/authFormState.js";
import { onAuth } from "../../js/api/auth/auth.js";

// holds the current authFormState
let authFormState = authFormStates[0];

// selectors
const authForm = document.getElementById("authForm");
const authFormTitle = document.querySelectorAll(".authFormTitle");
const usernameContainer = document.getElementById("usernameContainer");
const authFormActionBtn = document.getElementById("authFormActionBtn");
const toggleAuthStateIntro = document.getElementById("toggleAuthStateIntro");
const toggleAuthStateBtn = document.getElementById("toggleAuthStateBtn");

// event listeners
document.addEventListener("DOMContentLoaded", () => setAuthFormValues());
toggleAuthStateBtn.addEventListener("click", () => toggleAuthFormState());
authForm.addEventListener("submit", onAuth);

// helper function
function setAuthFormValues() {
    authFormTitle.forEach((e) => {
        e.innerText = authFormState.title;
    });

    authFormActionBtn.innerText = authFormState.title;
    toggleAuthStateIntro.innerText = authFormState.toggleStateIntro;
    toggleAuthStateBtn.innerText = authFormState.toggleStateButtonText;
}

function toggleAuthFormState() {
    const isSignup = authFormState.state === "signup";
    authFormState = authFormStates[isSignup ? 1 : 0];
    usernameContainer.style.display = isSignup ? "none" : "block";

    const usernameInput = document.getElementById("username");
    usernameInput.required = !isSignup;
    console.log('usernameInput:', usernameInput);

    setAuthFormValues();
}
