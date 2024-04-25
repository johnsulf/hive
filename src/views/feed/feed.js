import { loggedInUser } from "../../js/helpers/constants.js";
import { getPosts, createPost } from "../../js/api/post/post.js";
import { buildPostCard } from "../../js/helpers/postCard.js";

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
    
    populateFeed(await getPosts());
    
    const posts = document.querySelectorAll(".post");

    posts.forEach((post) => {
        post.addEventListener("click", function () {
            window.location.href = `../post/post.html?id=${post.id}`;
        });
    });

    const newPostForm = document.getElementById("newPostForm");
    newPostForm.addEventListener("submit", async function (event) {
        await createPost(event);
        window.location.reload();
    });
});

function populateFeed(allPosts) {
    const feed = document.getElementById("feed");
    feed.innerHTML = "";

    allPosts.data.forEach((post) => {
        feed.innerHTML += buildPostCard(post, true);
    });
}