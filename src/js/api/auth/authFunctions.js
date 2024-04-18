import { API_KEY, BASE_URL, AUTH_URL, REGISTER_URL, LOGIN_URL } from "../../helpers/constants.js";
import { saveToLocalStorage, getFromLocalStorage } from "../../helpers/localStorage.js";

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
        window.location.replace('/views/feed/feed.html');
        return profile;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to login user. Error: ", error);
    }
}

export async function onAuth(event) {
    event.preventDefault();
    const name = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (event.submitter.innerText === "Sign Up") {
        await register(name, email, password);
        await login(email, password);
    } else {
        await login(email, password);
    }
}