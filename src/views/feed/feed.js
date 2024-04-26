import { loggedInUser } from "../../js/helpers/constants.js";
import { getPosts, createPost, allPosts } from "../../js/api/post/post.js";
import { buildPostCard } from "../../js/helpers/postCard.js";

const newPostBtn = document.querySelector(".new-post-btn");
const profileLink = document.querySelectorAll(".profile-link");
const image = document.querySelector("#image");
const searchForm = document.getElementById("searchForm");

searchForm.addEventListener("keyup", async function (event) {
    event.preventDefault();
    const search = document.getElementById("search").value.trim();
    console.log("Search Query:", search);

    if (!allPosts || !Array.isArray(allPosts.data)) {
        console.log("No posts loaded or allPosts data is not an array.");
        return;
    }

    const filteredPosts = allPosts.data.filter(post => {
        const titleMatch = post.title.toLowerCase().includes(search.toLowerCase());
        const bodyMatch = post.body ? post.body.toLowerCase().includes(search.toLowerCase()) : false;
        const tagsMatch = post.tags ? post.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase())) : false;
        const authorMatch = post.author.name.toLowerCase().includes(search.toLowerCase());
        return titleMatch || bodyMatch || tagsMatch || authorMatch;
    }
    );

    console.log("Filtered Posts:", filteredPosts);
    populateFeed(filteredPosts, search);
});



document.addEventListener("DOMContentLoaded", async function () {
    const fetchedPosts = await getPosts();
    console.log("Fetched Posts:", fetchedPosts);

    if (fetchedPosts && Array.isArray(fetchedPosts.data)) {
        populateFeed(fetchedPosts.data); 
    } else {
        console.error("Expected posts to be contained in an array under 'data', received:", fetchedPosts);
    }

    newPostBtn.innerText += `, ${loggedInUser.name}?`;
    image.src = `${loggedInUser.avatar.url}`; 
    image.alt = `${loggedInUser.avatar.alt}`;

    profileLink.forEach((link) => {
        link.href = `../profile/profile.html?name=${loggedInUser.name}`;
    });

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


function populateFeed(posts, searchResult = "") {
    const feed = document.getElementById("feed");
    feed.innerHTML = "";  

    if (posts && posts.length > 0) {
        posts.forEach((post) => {
            feed.innerHTML += buildPostCard(post, true);
        });
    } else {
        feed.innerHTML = searchResult === "" ? "<p>No posts found.</p>" : `<p>No posts found for ${searchResult}.</p>`;
    }
}
