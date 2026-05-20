import { ServiceDetailComponent } from "../../components/service-detail/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";
import { ajax } from "../../modules/ajax.js";
import { stockUrls } from "../../modules/stockUrls.js";

export class ServicePage {
    constructor(parent, serviceId, toast) {
        this.parent = parent;
        this.serviceId = serviceId;
        this.toast = toast;
        this.stockData = null;
    }

    loadStock() {
        ajax.get(stockUrls.getStockById(this.serviceId), (data, status) => {
            if (status === 200 && data) {
                this.stockData = data;
                this.renderData();
            } else {
                this.toast.show(`Карточка с ID ${this.serviceId} не найдена`, "Ошибка");
                console.error("GET /stocks/:id error", status, data);
                const mainPage = new MainPage(this.parent);
                mainPage.render();
            }
        });
    }

    renderData() {
        const pageRoot = document.getElementById('service-page');
        if (pageRoot && this.stockData) {
            const serviceDetail = new ServiceDetailComponent(pageRoot);
            serviceDetail.render(this.stockData, this.toast.show.bind(this.toast));
        }
    }

    getHTML() {
        return `
            <div class="detail-page-container">
                <div class="back-button-wrapper">
                    <div id="back-button-container"></div>
                </div>
                <div class="detail-card">
                    <div id="service-page" class="detail-container"></div>
                </div>
            </div>
        `;
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const backButtonContainer = document.getElementById('back-button-container');
        const backButton = new BackButtonComponent(backButtonContainer);
        backButton.render(this.clickBack.bind(this));

        this.loadStock();
    }
}