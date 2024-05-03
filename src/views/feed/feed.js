import { loggedInUser } from "../../js/helpers/constants.js";
import { getPosts, createPost, allPosts } from "../../js/api/post/post.js";
import { buildPostCard } from "../../js/helpers/postCard.js";

const newPostBtn = document.querySelector(".new-post-btn");
const profileLink = document.querySelectorAll(".profile-link");
const image = document.querySelector("#image");
const searchForm = document.getElementById("searchForm");

let activeFilters = [];
let currentSearchTerm = "";

searchForm.addEventListener("keyup", async function (event) {
    event.preventDefault();
    currentSearchTerm = document.getElementById("search").value.trim();
    applyFiltersAndSearch();
});

document.addEventListener("DOMContentLoaded", async function () {
    newPostBtn.innerText += `, ${loggedInUser.name}?`;
    image.src = `${loggedInUser.avatar.url}`;
    image.alt = `${loggedInUser.avatar.alt}`;

    const feedSpinner = document.getElementById("feedSpinner");
    try {
        feedSpinner.style.display = 'block';
        const fetchedPosts = await getPosts(1);
        console.log("Fetched Posts:", fetchedPosts);

        if (fetchedPosts && Array.isArray(fetchedPosts.data)) {
            populateFeed(fetchedPosts.data);
            updatePagination(fetchedPosts.meta);
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
        feed.innerHTML = searchResult === "" ? "<p>No posts found.</p>" 
        : searchResult.length != 0 && activeFilters.length != 0 ? `<p>No posts found for <i>${searchResult}</i> and filter(s).</p>` 
        : `<p>No posts found for <i>${searchResult}</i>.</p>`;
    }
}

function updatePagination(meta) {
    const pagination = document.getElementById('pagination');
    const ul = pagination.querySelector('.pagination');
    ul.innerHTML = '';

    if (!meta.isFirstPage && meta.previousPage) {
        let prev = document.createElement('li');
        prev.className = 'page-item';
        prev.innerHTML = `<a class="page-link text-black" href="#">Previous</a>`;
        prev.addEventListener('click', () => loadPage(meta.previousPage));
        ul.appendChild(prev);
    }

    for (let i = 1; i <= meta.pageCount; i++) {
        let pageItem = document.createElement('li');
        pageItem.className = `page-item ${i === meta.currentPage ? 'active' : ''}`;
        pageItem.innerHTML = `<a class="page-link text-black" href="#">${i}</a>`;
        pageItem.addEventListener('click', () => loadPage(i));
        ul.appendChild(pageItem);
    }

    if (!meta.isLastPage && meta.nextPage) {
        let next = document.createElement('li');
        next.className = 'page-item';
        next.innerHTML = `<a class="page-link text-black" href="#">Next</a>`;
        next.addEventListener('click', () => loadPage(meta.nextPage));
        ul.appendChild(next);
    }
}

async function loadPage(pageNumber) {
    try {
        const fetchedPosts = await getPosts(pageNumber);
        if (fetchedPosts && Array.isArray(fetchedPosts.data)) {
            searchForm.reset();
            currentSearchTerm = "";
            populateFeed(fetchedPosts.data);
            updatePagination(fetchedPosts.meta);
        } else {
            console.error("Expected posts to be contained in an array under 'data', received:", fetchedPosts);
        }
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
}


function applyFiltersAndSearch() {
    let filteredPosts = allPosts.data;

    if (currentSearchTerm) {
        filteredPosts = filteredPosts.filter(post => {
            const titleMatch = post.title.toLowerCase().includes(currentSearchTerm.toLowerCase());
            const bodyMatch = post.body ? post.body.toLowerCase().includes(currentSearchTerm.toLowerCase()) : false;
            const imgAltTextMatch = post.image ? post.image.alt.toLowerCase().includes(currentSearchTerm.toLowerCase()) : false;
            const tagsMatch = post.tags ? post.tags.some(tag => tag.toLowerCase().includes(currentSearchTerm.toLowerCase())) : false;
            const authorMatch = post.author.name.toLowerCase().includes(currentSearchTerm.toLowerCase());
            return titleMatch || bodyMatch || imgAltTextMatch || tagsMatch || authorMatch;
        });
    }

    filteredPosts = filteredPosts.filter(post => activeFilters.every(filter => filter(post)));

    populateFeed(filteredPosts, currentSearchTerm);
}

function addFilter(filterName) {
    const activeFiltersDiv = document.getElementById('activeFilters');
    const span = document.createElement('span');
    span.classList.add('badge', 'rounded-pill', 'bg-primary', 'text-black', 'me-1');
    span.textContent = filterName;

    let filterFunc = determineFilterFunction(filterName);

    if (!filterFunc) {
        console.error("Filter function not defined for: " + filterName);
        return;
    }

    span.onclick = function() {
        activeFilters = activeFilters.filter(f => f !== filterFunc);
        this.remove();
        applyFiltersAndSearch();
    };

    if (!activeFilters.includes(filterFunc)) {
        activeFilters.push(filterFunc);
        activeFiltersDiv.appendChild(span);
    }

    applyFiltersAndSearch();
}

function determineFilterFunction(filterName) {
    switch(filterName) {
        case "This weeks posts":
            return post => new Date(post.created) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        case "With reactions":
            return post => post.reactions && post.reactions.length > 0;
        case "With comments":
            return post => post._count["comments"] != 0;
        case "With Images":
            return post => post.media && post.media.url;
        case "Only Text":
            return post => !post.media;
        case "Edited Posts":
            return post => post.updated !== post.created;
        default:
            return null;
    }
}


