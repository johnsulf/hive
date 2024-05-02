import { loggedInUser } from "../../js/helpers/constants.js";
import { getPosts, createPost, allPosts } from "../../js/api/post/post.js";
import { buildPostCard } from "../../js/helpers/postCard.js";

const newPostBtn = document.querySelector(".new-post-btn");
const profileLink = document.querySelectorAll(".profile-link");
const image = document.querySelector("#image");
const searchForm = document.getElementById("searchForm");

const activeFilters = [];

searchForm.addEventListener("keyup", async function (event) {
    event.preventDefault();
    const search = document.getElementById("search").value.trim();

    if (!allPosts || !Array.isArray(allPosts.data)) {
        console.log("No posts loaded or allPosts data is not an array.");
        return;
    }

    const filteredPosts = allPosts.data.filter(post => {
    const titleMatch = post.title.toLowerCase().includes(search.toLowerCase());
    const bodyMatch = post.body ? post.body.toLowerCase().includes(search.toLowerCase()) : false;
    const imgAltTextMatch = post.image ? post.image.alt.toLowerCase().includes(search.toLowerCase()) : false;
    const tagsMatch = post.tags ? post.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase())) : false;
    const authorMatch = post.author.name.toLowerCase().includes(search.toLowerCase());
    return titleMatch || bodyMatch || imgAltTextMatch || tagsMatch || authorMatch;
    });
    populateFeed(filteredPosts, search);
});

document.addEventListener("DOMContentLoaded", async function () {

    newPostBtn.innerText += `, ${loggedInUser.name}?`;
    image.src = `${loggedInUser.avatar.url}`; 
    image.alt = `${loggedInUser.avatar.alt}`;

    const feedSpinner = document.getElementById("feedSpinner");
    try {
        feedSpinner.style.display = 'block';

        const fetchedPosts = await getPosts();
        console.log("Fetched Posts:", fetchedPosts);

        if (fetchedPosts && Array.isArray(fetchedPosts.data)) {
            populateFeed(fetchedPosts.data); 
        } else {
            console.error("Expected posts to be contained in an array under 'data', received:", fetchedPosts);
        }
    } catch (error) {
        console.error("Error fetching posts:", error);
    } finally {
        feedSpinner.style.display = 'none';
    }

    attachEventListeners();
});


function attachEventListeners() {
    const newPostForm = document.getElementById("newPostForm");
    newPostForm.addEventListener("submit", async function (event) {
        await createPost(event);
        window.location.reload();
    });

    const filterItems = document.querySelectorAll('.dropdown-item');
    filterItems.forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault();
            const filterName = this.getAttribute('data-filter');
            addFilter(filterName);
        });
    });
}

function setPostLinks() {
    profileLink.forEach((link) => {
        link.href = `../profile/profile.html?name=${loggedInUser.name}`;
    });    
    
    const posts = document.querySelectorAll(".post");
    posts.forEach((post) => {
        post.addEventListener("click", function () {
            window.location.href = `../post/post.html?id=${post.id}`;
        });
    });
}

function populateFeed(posts, searchResult = "") {
    const feed = document.getElementById("feed");
    feed.innerHTML = "";

    if (posts && posts.length > 0) {
        feed.innerHTML = `<p>Showing ${posts.length} posts</p>`;  
        posts.forEach((post) => {
            feed.innerHTML += buildPostCard(post, true);
        });
        setPostLinks();
    } else {
        feed.innerHTML = searchResult === "" ? "<p>No posts found.</p>" : `<p>No posts found for <i>${searchResult}</i>.</p>`;
    }
}

function addFilter(filterName) {
    const activeFiltersDiv = document.getElementById('activeFilters');
    const span = document.createElement('span');
    span.classList.add('badge', 'rounded-pill','bg-primary', 'text-black', 'me-1');
    span.textContent = filterName;

    let filterFunc;

    if (filterName === "This weeks posts") {
        filterFunc = post => new Date(post.created) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    } else if (filterName === "With reactions") {
        filterFunc = post => post.reactions && post.reactions.length > 0;
    } else if (filterName === "With comments") {
        filterFunc = post => post._count["comments"] != 0;
    } else if (filterName === "With Images") {
        filterFunc = post => post.media && post.media.url;
    } else if (filterName === "Only Text") {
        filterFunc = post => !post.media;
    } else if (filterName === "Edited Posts") {
        filterFunc = post => post.updated !== post.created;
    } else {
        console.error("Filter function not defined for: " + filterName);
        return; 
    }

    span.onclick = function() {
        const index = activeFilters.indexOf(filterFunc);
        if (index > -1) {
            activeFilters.splice(index, 1);
        }
        this.remove();
        const filteredPosts = applyFilters(allPosts.data);
        populateFeed(filteredPosts);
    };

    span.filterFunc = filterFunc;
    activeFilters.push(filterFunc);

    activeFiltersDiv.appendChild(span);

    const filteredPosts = applyFilters(allPosts.data);
    populateFeed(filteredPosts);
}

function applyFilters(posts) {
    return posts.filter(post => activeFilters.every(filter => filter(post)));
}

