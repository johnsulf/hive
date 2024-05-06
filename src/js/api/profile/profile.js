import { API_KEY, BASE_URL, SOCIAL_URL, PROFILES_URL, loggedInUser } from "../../helpers/shared/constants.js";
import { getFromLocalStorage } from "../../helpers/shared/localStorage.js";
import { Profile } from "../../models/profileModel.js";

export let isLoggedInUser = false;
export let isFollowingUser = false;
export let profile;

export async function fetchProfile() {
    const name = new URLSearchParams(window.location.search).get("name");
    try {
      const response = await fetch(BASE_URL+SOCIAL_URL+PROFILES_URL+name+"?_followers=true&_following=true&_posts=true", {
            method: "GET",
            headers: {
            "Authorization": "Bearer " + getFromLocalStorage("token"),
            "X-Noroff-API-Key": API_KEY,
            "Content-Type": "application/json"
            },
        });
        const json = await response.json();
        profile = Profile.fromJson(json);
        isLoggedInUser = loggedInUser.name === profile.name;
        isFollowingUser = profile.followers.some(follower => follower.name === loggedInUser.name);
    } catch (e) {
        console.error("Error fetching profile:", e);
    }
}

export async function followOrUnfollowUser(followOrUnfollow) {
    try {
        await fetch(BASE_URL+SOCIAL_URL+PROFILES_URL+profile.name+"/"+followOrUnfollow, {
            method: "PUT",
            headers: {
                "Authorization": "Bearer " + getFromLocalStorage("token"),
                "X-Noroff-API-Key": API_KEY,
                "Content-Type": "application/json"
            },
        });
    }
    catch (e) {
        console.error("Error following user:", e);
    }
}

export async function editProfile(data) {
    try {
        const response = await fetch(BASE_URL+SOCIAL_URL+PROFILES_URL+profile.name, {
            method: "PUT",
            headers: {
                "Authorization": "Bearer " + getFromLocalStorage("token"),
                "X-Noroff-API-Key": API_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        const json = await response.json();
        profile = Profile.fromJson(json);
    }
    catch (e) {
        console.error("Error editing profile:", e);
    }
}

