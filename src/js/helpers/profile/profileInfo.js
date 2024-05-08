
export function displayProfileInfo(profile) {
    const nameContainer = document.getElementById('name');
    const emailContainer = document.getElementById('email');
    const imageContainer = document.getElementById('image');
    const bioContainer = document.getElementById('bio');
    const postCountElement = document.getElementById("postCount");
    const followerCountElement = document.getElementById("followerCount");
    const followingCountElement = document.getElementById("followingCount");

    postCountElement.textContent = profile.posts.length;
    followerCountElement.textContent = profile._count.followers;
    followingCountElement.textContent = profile._count.following;
    nameContainer.innerHTML = profile.name;
    emailContainer.innerHTML = profile.email;
    emailContainer.href = `mailto:${profile.email}`;
    imageContainer.src = profile.avatar.url;

    if (profile.bio) {
        bioContainer.innerHTML = profile.bio;
    }
}