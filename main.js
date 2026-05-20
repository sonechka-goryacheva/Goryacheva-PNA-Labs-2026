import { MainPage } from "./pages/main/index.js";
import { OrdersPage } from "./pages/orders/index.js";

const root = document.getElementById('root');

let currentPage = 'main';

function renderMainPage() {
    currentPage = 'main';
    const mainPage = new MainPage(root);
    mainPage.render();
}

function renderOrdersPage() {
    currentPage = 'orders';
    const ordersPage = new OrdersPage(root);
    ordersPage.render();
}

const homeButton = document.getElementById('home-button');
const ordersButton = document.getElementById('orders-button');

if (homeButton) {
    homeButton.addEventListener('click', () => {
        renderMainPage();
    });
}

if (ordersButton) {
    ordersButton.addEventListener('click', () => {
        renderOrdersPage();
    });
}

renderMainPage();