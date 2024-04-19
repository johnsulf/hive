import { loggedInUser } from "../../js/helpers/constants.js";
import { formatDateTime } from "../../js/helpers/dateTime.js";

const newPostBtn = document.querySelector(".new-post-btn");
const profileLink = document.querySelectorAll(".profile-link");
const image = document.querySelector("#image");

document.addEventListener("DOMContentLoaded", async function () {

    newPostBtn.innerText += `, ${loggedInUser.name}?`;
    image.src = `${loggedInUser.avatar.url}`; 
    image.alt = `${loggedInUser.avatar.alt}`;
    profileLink.forEach((link) => {
        link.href = `../profile/profile.html?name=${loggedInUser.name}`;
    });
});

export function populateFeed(allPosts) {
    const feed = document.getElementById("feed");
    feed.innerHTML = "";
    allPosts.data.forEach((post) => {
        feed.innerHTML += `
        <div class="post container card my-3 position-relative">
            <div class="row">
                <a href="../profile/profile.html?name=${post.author.name}" class="profile-link col-2 my-3">
                    <img src="${post.author.avatar["url"]}" alt="${post.author.avatar["alt"]}" class="img-fluid rounded-circle float-end">
                </a>
                <div class="col my-2">
                    <p>
                        <strong>${post.author.name}</strong>
                        <small class="text-muted">&nbsp;&nbsp;${formatDateTime(post.created)}</small>
                    </p>
                    <p class="m-0 h5">${post.title}</p>
                    <p>${post.body}</p>
                    <strong>${post.tags}</strong>
                </div>
            </div>
            <div class="row justify-content-start">
                <div class="col-2"></div>
                <div class="col-1 d-flex fw-bold gap-1">
                    <p>${post._count.reactions}</p>
                    <i class="bi bi-hand-thumbs-up"></i>
                </div>
                <div class="col-1 d-flex fw-bold gap-1">
                    <p>${post._count.comments}</p>
                    <i class="bi bi-chat col-1"></i>
                </div>
            </div>
        </div>
        `;
    });
}