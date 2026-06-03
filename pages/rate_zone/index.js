// pages/rate_zone/index.js
// Детальная страница тарифной зоны: данные грузятся из API по id
// (GET /rate-zones/:id), есть кнопка удаления (DELETE /rate-zones/:id).
import { RateZoneDetailComponent } from "../../components/rate_zone_detail/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";
import { Ajax } from "../../modules/ajax.js";
import { RateZoneUrls } from "../../modules/rateZoneUrls.js";
import { mapRateZone } from "../../utils/helpers.js";

export class RateZonePage {
    // Параметр allZones убран — данные берутся напрямую из API.
    constructor(parent, zoneId, toast) {
        this.parent = parent;
        this.zoneId = zoneId;
        this.toast = toast;
        this.ajax = new Ajax();          // класс для XHR-запросов
        this.urls = new RateZoneUrls();  // сборщик адресов API
        this.zoneData = null;            // данные текущей зоны
        this.isLoading = false;          // состояние загрузки
    }

    // GET-запрос за данными одной зоны по id.
    fetchZoneData() {
        this.isLoading = true;
        this.showLoading();

        this.ajax.get(this.urls.getRateZoneById(this.zoneId), (error, data) => {
            this.isLoading = false;

            if (error || !data) {
                this.showError();
                this.toast.show("Не удалось загрузить карточку. Проверьте бэкенд на порту 3001.", "Ошибка загрузки");
                return;
            }

            // Преобразуем данные API в формат компонента и сохраняем.
            this.zoneData = mapRateZone(data);
            this.renderData(this.zoneData);
        });
    }

    // Отрисовка детальной страницы.
    renderData(zone) {
        const pageRoot = document.getElementById('rate-zone-page');
        if (!pageRoot) return;

        pageRoot.innerHTML = '';
        const zoneDetail = new RateZoneDetailComponent(pageRoot);
        zoneDetail.render(zone, this.toast.show.bind(this.toast));
    }

    // DELETE-запрос на удаление зоны.
    deleteZone() {
        this.ajax.delete(this.urls.deleteRateZoneById(this.zoneId), (error) => {
            if (error) {
                this.toast.show("Не удалось удалить карточку. Проверьте бэкенд на порту 3001.", "Ошибка удаления");
                return;
            }

            // Успех: уведомление и через 1 секунду — возврат на главную.
            this.toast.show("Карточка удалена", "Удаление");
            setTimeout(() => {
                const mainPage = new MainPage(this.parent);
                mainPage.render();
            }, 1000);
        });
    }

    showLoading() {
        const pageRoot = document.getElementById('rate-zone-page');
        if (pageRoot) {
            pageRoot.innerHTML = '<div style="padding: 40px; text-align: center; color: var(--gray);">Загрузка...</div>';
        }
    }

    showError() {
        const pageRoot = document.getElementById('rate-zone-page');
        if (pageRoot) {
            pageRoot.innerHTML = '<div style="padding: 40px; text-align: center; color: var(--gray);">Не удалось загрузить карточку.</div>';
        }
    }

    getHTML() {
        // Кнопка "Удалить карточку" — в верхней панели рядом с кнопкой "Назад".
        return `
            <div class="detail-page-container">
                <div class="back-button-wrapper" style="display: flex; align-items: center; justify-content: space-between; gap: 12px;">
                    <div id="back-button-container"></div>
                    <button id="delete-zone-btn" class="card-btn-delete">Удалить карточку</button>
                </div>
                <div class="detail-card">
                    <div id="rate-zone-page" class="detail-container"></div>
                </div>
            </div>
        `;
    }

    // Возврат на главную — без изменений.
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

        // Обработчик кнопки удаления.
        const deleteBtn = document.getElementById('delete-zone-btn');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', () => {
                this.deleteZone();
            });
        }

        // Загружаем данные зоны из API вместо локального объекта.
        this.fetchZoneData();
    }
}
