import { getPosts } from "../../api/post/post.js";
import { setCurrentSearchTerm } from "./feedSearchAndFilter.js";
import { populateFeed } from "./feedContent.js";

export function updatePagination(meta) {
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
        searchForm.reset();
        setCurrentSearchTerm("");
        populateFeed(fetchedPosts.data);
        updatePagination(fetchedPosts.meta);
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
}