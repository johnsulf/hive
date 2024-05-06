import { BASE_URL, AUTH_URL, REGISTER_URL, LOGIN_URL } from "../../helpers/shared/constants.js";
import { saveToLocalStorage } from "../../helpers/shared/localStorage.js";

const authSpinner = document.getElementById("authSpinner");
const submitButton = document.getElementById("authFormActionBtn");

/**
 * Register a new user
 * @param {string} name Users desired name
 * @param {string} email Users noroff email
 * @param {string} password Users password
 * @returns {Promise <{data: {name: string, email: string, id: string}}> | Error} user object or error
 * ```js
 * const name = "John Doe";
 * const email = "johndoe@example.com";
 * const password = "password1234";
 * const result = await register(name, email, password);
 * console.log(result); // {data: {name: "John Doe", email: "johndoe@example.com", id: "60f7c9f4c6b4f40015f6b3b4"}}
 * ```
 */
async function register(name, email, password) {
    try {
        const response = await fetch(BASE_URL+AUTH_URL+REGISTER_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
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
        const response = await fetch(BASE_URL + AUTH_URL + LOGIN_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error("Login failed: " + response.statusText);
        }

        const json = await response.json(); 
        console.log("json: ", json);

        const { accessToken, ...profile } = json.data; 
        saveToLocalStorage("token", accessToken);
        saveToLocalStorage("profile", profile);

        window.location.replace("/views/feed/feed.html");
        return profile;
    } catch (error) {
        console.error("Failed to login user. Error: ", error);
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

    authSpinner.style.display = 'inline-block';
    submitButton.disabled = true;

    try {
        if (buttonAction === "Sign Up") {
            const name = document.getElementById("username").value;
            await register(name, email, password);
            await login(email, password);
        } else {
            await login(email, password);
        }
    } catch ( error ) {
        console.error("Authentication error:", error.message);
    } finally {
        authSpinner.style.display = 'none';
        submitButton.disabled = false;
    }
}
