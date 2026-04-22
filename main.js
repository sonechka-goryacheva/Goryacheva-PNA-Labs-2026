import { MainPage } from "./pages/main/index.js";

const root = document.getElementById('root');

function renderMainPage() {
    const mainPage = new MainPage(root);
    mainPage.render();
}

const homeButton = document.getElementById('home-button');
if (homeButton) {
    homeButton.addEventListener('click', () => {
        renderMainPage();
    });
}

renderMainPage();