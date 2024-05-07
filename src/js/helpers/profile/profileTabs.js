import { populateFollowers, populateFollowing } from './profileFollow.js';
import { populateUserPosts } from './profilePosts.js';

export function populateTabs() {
    const tabs = document.querySelectorAll('#profileTabs .nav-link');
    const tabContents = document.querySelectorAll('.tab-content > div');

    tabs.forEach(tab => {
        tab.addEventListener('click', function(event) {
            event.preventDefault();

            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('show', 'active'));

            this.classList.add('active');
            const activeTab = this.getAttribute('data-tab');

            const contentToShow = document.getElementById(activeTab);
            if (contentToShow) {
                contentToShow.classList.add('show', 'active');
            }

            switch(activeTab) {
                case 'postsTab':
                    populateUserPosts(); 
                    break;
                case 'followersTab':
                    populateFollowers(); 
                    break;
                case 'followingTab':
                    populateFollowing(); 
                    break;
            }
        });
    });
}