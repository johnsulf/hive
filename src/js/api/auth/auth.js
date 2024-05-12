import { BASE_URL, AUTH_URL, REGISTER_URL, LOGIN_URL } from "../../helpers/shared/constants.js";
import { saveToLocalStorage } from "../../helpers/shared/localStorage.js";
import { showToast } from "../../helpers/shared/errorToast.js";

const submitButton = document.getElementById("authFormActionBtn");

/**
 * Registers a new user using the Noroff API
 * @param {string} name 
 * @param {string} email 
 * @param {string} password
 * 
 * @returns {Promise}
 * @throws {Error}
 * 
 * @example
 * register("John Doe", "johndoe@example.com, "password123");
 */

async function register(name, email, password) {
    try {
        const response = await fetch(BASE_URL + AUTH_URL + REGISTER_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
        });
        const result = await response.json();

        if (!response.ok) {
            showToast(result.errors[0].message || "Failed to register.", true);
            throw new Error(result.errors[0].message || "Registration failed.");
        }

        return result;
    } catch (error) {
        throw new Error("Failed to register user. Error: ", error);
    }
}

async function login(email, password) {
    try {
        const response = await fetch(BASE_URL + AUTH_URL + LOGIN_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const json = await response.json();

        if (!response.ok) {
            showToast(json.errors[0].message || "Login failed.", true);
            throw new Error("Login failed: " + json.errors[0].message || response.statusText);
        }

        const { accessToken, ...profile } = json.data;
        saveToLocalStorage("token", accessToken);
        saveToLocalStorage("profile", profile);

        window.location.replace("/views/feed/feed.html");
        return profile;
    } catch (error) {
        throw new Error("Failed to login user. Error: ", error);
    }
}

export function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("profile");
    window.location.replace("/index.html");
}

export async function onAuth(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const buttonAction = event.submitter.innerText;

    submitButton.disabled = true;

    try {
        if (buttonAction === "Sign Up") {
            const name = document.getElementById("username").value;
            await register(name, email, password);
            await login(email, password);
        } else {
            await login(email, password);
        }
    } catch (error) {
        throw new Error("Authentication error:", error.message);
    } finally {
        submitButton.disabled = false;
    }
}
