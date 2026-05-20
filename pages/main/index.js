import { ServiceCardComponent } from "../../components/service-card/index.js";
import { CalculatorComponent } from "../../components/calculator/index.js";
import { ServicePage } from "../service/index.js";
import { ToastComponent } from "../../components/toast/index.js";
import { ajax } from "../../modules/ajax.js";
import { stockUrls } from "../../modules/stockUrls.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.toast = new ToastComponent();
        this.stocks = [];
        this.filteredStocks = [];
    }

    /**
     * Загрузка всех карточек или с фильтром по цене
     */
    loadStocks(priceFilter = null) {
        let url = stockUrls.getStocks();
        if (priceFilter !== null && !isNaN(priceFilter)) {
            url = `${stockUrls.getStocks()}?price=${priceFilter}`;
        }

        ajax.get(url, (data, status) => {
            if (status === 200 && data) {
                this.stocks = data;
                this.filteredStocks = [...this.stocks];
                this.renderServices();
                this.updateCount();

                if (priceFilter !== null) {
                    this.toast.show(`Найдено ${this.stocks.length} зон с ценой ${priceFilter} ₽`, "Результаты поиска");
                } else {
                    this.toast.show(`Загружено ${this.stocks.length} тарифных зон`, "API");
                }
            } else {
                this.toast.show("Ошибка загрузки данных с сервера", "Ошибка");
                console.error("GET /stocks error", status, data);
            }
        });
    }

    /**
     * Удаление карточки через DELETE
     */
    deleteStock(id) {
        const url = stockUrls.deleteStockById(id);
        ajax.delete(url, (data, status) => {
            if (status === 204) {
                this.stocks = this.stocks.filter(s => s.id !== id);
                this.filteredStocks = this.filteredStocks.filter(s => s.id !== id);
                this.renderServices();
                this.updateCount();
                this.toast.show(`Тарифная зона удалена (ID: ${id})`, "Удаление выполнено");
            } else {
                this.toast.show(`Ошибка удаления: статус ${status}`, "Ошибка");
                console.error("DELETE error", status, data);
            }
        });
    }

    /**
     * Поиск по точной цене (через API)
     */
    searchServices(searchTerm) {
        if (!searchTerm.trim()) {
            this.loadStocks();
            this.updateCount();
            this.toast.show(`Показаны все зоны`, "Сброс поиска");
            return;
        }

        const searchPrice = parseInt(searchTerm.trim());

        if (isNaN(searchPrice)) {
            this.toast.show("Введите числовое значение цены", "Ошибка поиска");
            return;
        }

        if (searchPrice < 0) {
            this.toast.show("Цена не может быть отрицательной", "Ошибка поиска");
            return;
        }

        this.loadStocks(searchPrice);
    }

    updateCount() {
        const countElement = document.getElementById('services-count');
        if (countElement) {
            countElement.textContent = `Всего: ${this.filteredStocks.length}`;
        }
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    getHTML() {
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
                        <!-- Кнопка добавления появится в 6-й лабе -->
                    </div>
                </div>
                
                <div class="services-section">
                    <div class="section-header">
                        <div class="section-title-wrapper">
                            <div>
                                <div class="section-title">Тарифные зоны</div>
                                <div class="section-subtitle" id="services-count">Загрузка...</div>
                            </div>
                        </div>
                    </div>
                    <div id="main-page" class="services-grid"></div>
                </div>
            </div>
        `;
    }

    renderServices() {
        const pageRoot = this.pageRoot;
        if (!pageRoot) return;
        pageRoot.innerHTML = '';

        this.filteredStocks.forEach((stock) => {
            const serviceCard = new ServiceCardComponent(pageRoot);
            serviceCard.render(stock, this.clickCard.bind(this), this.deleteStock.bind(this));
        });
    }

    clickCard(stockId) {
        const servicePage = new ServicePage(this.parent, stockId, this.toast);
        servicePage.render();
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const calculatorContainer = document.getElementById('calculator-container');
        const calculator = new CalculatorComponent(calculatorContainer);
        calculator.render(this.toast.show.bind(this.toast));

        const searchBtn = document.getElementById('search-btn');
        const searchInput = document.getElementById('search-input');
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                this.searchServices(searchInput.value);
            });
        }
        if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.searchServices(searchInput.value);
                }
            });
        }

        this.loadStocks();
    }
}