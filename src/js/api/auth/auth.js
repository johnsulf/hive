const API_KEY = "e7ae91be-9c36-4703-bcf9-9b7c3fde3b98";

const BASE_URL = "https://v2.api.noroff.dev/";
const AUTH_URL = "auth/";
const REGISTER_URL = "register/";
const LOGIN_URL = "login/";

function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

async function register(name, email, password) {
    try {
        const response = await fetch(`${BASE_URL}${AUTH_URL}${REGISTER_URL}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });
        const result = await response.json();
        console.log("result: ", result);
        return result;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to register user. Error: ", error);
    }
}

async function login(email, password) {
    try {
        const response = await fetch(`${BASE_URL}${AUTH_URL}${LOGIN_URL}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        const { accessToken, ...profile } = (await response.json()).data;
        saveToLocalStorage("token", accessToken);
        saveToLocalStorage("profile", profile);
        console.log("profile: ", profile);
        return profile;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to login user. Error: ", error);
    }
}

async function onAuth(event) {
    event.preventDefault();
    const name = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    console.log("event.submitter.innerText: ", event.submitter.innerText);

    if (event.submitter.innerText === "Sign Up") {
        await register(name, email, password);
        await login(email, password);
    } else {
        await login(email, password);
    }
}

function authFormListener() {
    const authForm = document.getElementById("authForm");
    authForm.addEventListener("submit", onAuth);
}

authFormListener();