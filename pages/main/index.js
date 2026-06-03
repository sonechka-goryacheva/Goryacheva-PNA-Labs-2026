// pages/main/index.js
// Главная страница: список тарифных зон из REST API (порт 3001, /rate-zones)
// с фильтрацией по ЦЕНЕ через query-параметр ?price=...
import { RateZoneCardComponent } from "../../components/rate_zone_card/index.js";
import { CalculatorComponent } from "../../components/calculator/index.js";
import { RateZonePage } from "../rate_zone/index.js";
import { ToastComponent } from "../../components/toast/index.js";
import { Ajax } from "../../modules/ajax.js";
import { RateZoneUrls } from "../../modules/rateZoneUrls.js";
import { mapRateZone } from "../../utils/helpers.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.toast = new ToastComponent();
        this.ajax = new Ajax();            // класс для XHR-запросов
        this.urls = new RateZoneUrls();    // сборщик адресов API
        this.isLoading = false;            // состояние загрузки
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    // GET-запрос за списком зон.
    // searchPrice === '' -> все зоны, иначе -> фильтр по цене (?price=...).
    fetchZones(searchPrice = '') {
        this.isLoading = true;
        this.showLoading();

        const term = String(searchPrice).trim();
        // Выбираем нужный URL: с фильтром по цене или без.
        const url = term
            ? this.urls.getRateZonesFiltered(term)
            : this.urls.getRateZones();

        // Асинхронный XHR-запрос с колбэком (error, data).
        this.ajax.get(url, (error, data) => {
            this.isLoading = false;

            if (error) {
                this.showError();
                this.toast.show("Не удалось загрузить данные. Проверьте, что бэкенд запущен на порту 3001.", "Ошибка загрузки");
                return;
            }

            // Преобразуем данные API в формат наших компонентов.
            const zones = Array.isArray(data) ? data.map(mapRateZone) : [];

            // Если был поиск и ничего не найдено — сообщаем об этом.
            if (term && zones.length === 0) {
                this.toast.show("Ничего не найдено", "Результаты поиска");
            }

            this.renderZones(zones);
        });
    }

    // Поиск по цене. Принимает значение из текстового поля.
    searchZones(searchTerm) {
        const value = String(searchTerm).trim();

        // Пустой ввод -> показываем все зоны.
        if (!value) {
            this.fetchZones();
            return;
        }

        const price = parseInt(value, 10);

        // Лёгкая валидация числового поля.
        if (isNaN(price)) {
            this.toast.show("Введите числовое значение цены", "Ошибка поиска");
            return;
        }
        if (price < 0) {
            this.toast.show("Цена не может быть отрицательной", "Ошибка поиска");
            return;
        }

        // Фильтрация выполняется на бэкенде через ?price=...
        this.fetchZones(price);
    }

    showLoading() {
        const pageRoot = this.pageRoot;
        if (pageRoot) {
            pageRoot.innerHTML = '<div style="padding: 40px; text-align: center; color: var(--gray); width: 100%;">Загрузка...</div>';
        }
    }

    showError() {
        const pageRoot = this.pageRoot;
        if (pageRoot) {
            pageRoot.innerHTML = '<div style="padding: 40px; text-align: center; color: var(--gray); width: 100%;">Не удалось загрузить тарифные зоны.</div>';
        }
    }

    // Отрисовка списка карточек.
    renderZones(zones) {
        const pageRoot = this.pageRoot;
        if (!pageRoot) return;

        pageRoot.innerHTML = '';

        zones.forEach((zone) => {
            const zoneCard = new RateZoneCardComponent(pageRoot);
            // Передаём только обработчик клика — кнопки удаления в карточке больше нет.
            zoneCard.render(zone, this.clickCard.bind(this));
        });

        const countElement = document.getElementById('zones-count');
        if (countElement) {
            countElement.textContent = `Всего: ${zones.length}`;
        }
    }

    getHTML() {
        // Поле поиска — числовое (по цене). Кнопка "Добавить" удалена (Вариант 1).
        return `
            <div class="calculator-wrapper">
                <div id="calculator-container" class="calculator-card"></div>
            </div>
            
            <div class="container">
                <div class="control-panel">
                    <div class="control-group">
                        <div class="search-box">
                            <input type="number" id="search-input" placeholder="Поиск по точной цене (₽)" class="search-input" min="0" step="1">
                            <button id="search-btn" class="search-btn">🔍 Найти</button>
                        </div>
                    </div>
                </div>
                
                <div class="services-section">
                    <div class="section-header">
                        <div class="section-title-wrapper">
                            <div>
                                <div class="section-title">Тарифные зоны</div>
                                <div class="section-subtitle" id="zones-count">Загрузка...</div>
                            </div>
                        </div>
                    </div>
                    <div id="main-page" class="services-grid"></div>
                </div>
            </div>
        `;
    }

    clickCard(zoneId) {
        // Детальная страница сама запросит данные у API по id.
        const rateZonePage = new RateZonePage(this.parent, zoneId, this.toast);
        rateZonePage.render();
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const calculatorContainer = document.getElementById('calculator-container');
        const calculator = new CalculatorComponent(calculatorContainer);
        calculator.render(this.toast.show.bind(this.toast));

        // Загружаем карточки из API вместо локального массива.
        this.fetchZones();

        const searchBtn = document.getElementById('search-btn');
        const searchInput = document.getElementById('search-input');

        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                this.searchZones(searchInput.value);
            });
        }

        if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.searchZones(searchInput.value);
                }
            });
        }
    }
}
