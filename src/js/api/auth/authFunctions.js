import { BASE_URL, AUTH_URL, REGISTER_URL, LOGIN_URL } from "../../helpers/constants.js";
import { saveToLocalStorage } from "../../helpers/localStorage.js";

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

    try {
        if (buttonAction === "Sign Up") {
            const name = document.getElementById("username").value;
            await register(name, email, password);
            await login(email, password);
        } else {
            await login(email, password);
        }
    } catch (error) {
        console.error("Authentication error:", error.message);
    }
}
