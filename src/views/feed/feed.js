import { userToken } from "../../js/index.js";

const test = document.querySelector(".test");

function populateFeed() {
    userToken ? test.innerHTML = "You are logged in!" : test.innerHTML = "You are not logged in!";
}
