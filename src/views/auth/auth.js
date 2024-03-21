import { authFormStates } from "./authFormState.js";

// holds the current authFormState
let authFormState = authFormStates[0];

// selectors
const authFormTitle = document.querySelectorAll(".authFormTitle");
const usernameContainer = document.getElementById("usernameContainer");
const authFormActionBtn = document.getElementById("authFormActionBtn");
const toggleAuthStateIntro = document.getElementById("toggleAuthStateIntro");
const toggleAuthStateBtn = document.getElementById("toggleAuthStateBtn");

// event listeners
document.addEventListener("DOMContentLoaded", () => setAuthFormValues());
toggleAuthStateBtn.addEventListener("click", () => toggleAuthFormState());

// helper function
function setAuthFormValues() {
    authFormTitle.forEach((e) => {
        e.innerText = authFormState.title;
    });

    authFormActionBtn.innerText = authFormState.title;
    toggleAuthStateIntro.innerText = authFormState.toggleStateIntro;
    toggleAuthStateBtn.innerText = authFormState.toggleStateButtonText;
}

// function that toggles the state
function toggleAuthFormState() {
    switch (authFormState.state) {
        case "signup":
            authFormState = authFormStates[1];
            usernameContainer.style.display = "none";
            setAuthFormValues();
            break;
        case "signin":
            authFormState = authFormStates[0];
            usernameContainer.style.display = "block";
            setAuthFormValues();
            break;
    }
}