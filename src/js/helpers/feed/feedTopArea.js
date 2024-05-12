import { loggedInUser } from "../shared/constants.js";

export function populateFeedTopArea() {
    const newPostBtn = document.querySelector(".new-post-btn");
    const image = document.querySelector("#image");
    const profileLink = document.querySelectorAll(".profile-link");

    profileLink.forEach((link) => {
        link.href = `../profile/profile.html?name=${loggedInUser.name}`;
    });

    newPostBtn.innerText += `, ${loggedInUser.name}?`;
    image.src = `${loggedInUser.avatar.url}`;
    image.alt = `${loggedInUser.avatar.alt}`;
}