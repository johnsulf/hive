import { allPosts } from "../../api/post/post.js"; 
import { populateFeed } from "./feedContent.js";

export let activeFilters = [];

let currentSearchTerm = "";
export function setCurrentSearchTerm(term) {
    currentSearchTerm = term;
}


export function onSearchAndFilter() {
    searchFormListener();
    filterListeners();
}

function searchFormListener() {
    const searchForm = document.getElementById("searchForm");
    searchForm.addEventListener("keyup", async function (event) {
        event.preventDefault();
        currentSearchTerm = document.getElementById("search").value.trim();
        applyFiltersAndSearch();
    });
}

function filterListeners() {
    const filterItems = document.querySelectorAll('.dropdown-item');
    filterItems.forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault();
            const filterName = this.getAttribute('data-filter');
            addFilter(filterName);
        });
    });
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