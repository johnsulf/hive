import { API_KEY, BASE_URL, SOCIAL_URL, PROFILES_URL, loggedInUser } from "../../helpers/constants.js";
import { getFromLocalStorage } from "../../helpers/localStorage.js";
import { Profile } from "../../models/profileModel.js";

export let isLoggedInUser = false;
export let profile;

export async function fetchProfile() {
    const name = new URLSearchParams(window.location.search).get("name");

    try {
      const response = await fetch(`${BASE_URL}${SOCIAL_URL}${PROFILES_URL}${name}`, {
            method: "GET",
            headers: {
            "Authorization": "Bearer " + getFromLocalStorage("token"),
            "X-Noroff-API-Key": API_KEY,
            "Content-Type": "application/json"
            },
        });
        const json = await response.json();
        profile = Profile.fromJson(json);
        console.log("Profile:", profile);
        isLoggedInUser = loggedInUser.name === profile.name;
        console.log("isLoggedInUser:", isLoggedInUser);
    } catch (e) {
        console.error("Error fetching profile:", e);
    }
}

function fetchProfiles() {
    fetch("https://v2.api.noroff.dev/social/profiles/", {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + getFromLocalStorage("token"),
            "X-Noroff-API-Key": API_KEY,
            "Content-Type": "application/json"
        },
    })
        .then(response => response.json())
        .then(data => {
            console.log("Profiles:", data);
        })
        .catch(error => {
            console.error("Error fetching profiles:", error);
        });
}

fetchProfile("hestefjes2");
