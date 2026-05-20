import { ServiceCardComponent } from "../../components/service-card/index.js";
import { CalculatorComponent } from "../../components/calculator/index.js";
import { ServicePage } from "../service/index.js";
import { ToastComponent } from "../../components/toast/index.js";
import { isEqualTariffZone, getExcludedZones, mergeTariffData } from "../../utils/helpers.js";

const API_URL = 'http://localhost:3000/stocks';

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.toast = new ToastComponent();
        this.rate_zones = [];
        this.filteredZones = [];
        this.nextId = 7;
    }
    
    async loadData() {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Ошибка загрузки');
            this.rate_zones = await response.json();
            this.filteredZones = [...this.rate_zones];
            this.renderServices();
            this.toast.show(`Загружено ${this.rate_zones.length} тарифных зон`, "Данные получены");
        } catch (error) {
            console.error('Ошибка загрузки данных:', error);
            this.toast.show('Не удалось загрузить данные с сервера', "Ошибка");
            this.rate_zones = [];
            this.filteredZones = [];
            this.renderServices();
        }
    }
    
    async copyFirstCard() {
        const firstZone = this.rate_zones[0];
        if (!firstZone) {
            this.toast.show("Нет зон для копирования", "Ошибка");
            return;
        }
        
        const isDuplicate = this.rate_zones.some(zone => 
            isEqualTariffZone(zone, firstZone)
        );
        
        if (isDuplicate) {
            this.toast.show("Такая тарифная зона уже существует! Копирование отменено.", "Ошибка");
            return;
        }
        
        const newZoneData = {
            title: `${firstZone.title} (копия)`,
            shortDesc: `${firstZone.shortDesc} (добавлено)`,
            fullDesc: firstZone.fullDesc,
            image: firstZone.image,
            price: firstZone.price,
            unit: firstZone.unit,
            maxWeight: firstZone.maxWeight,
            deliveryTime: firstZone.deliveryTime,
            zone: firstZone.zone,
            insurance: firstZone.insurance,
            features: firstZone.features,
            category: firstZone.category,
            countries: firstZone.countries,
            aircrafts: firstZone.aircrafts
        };
        
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newZoneData)
            });
            
            if (!response.ok) throw new Error('Ошибка создания');
            
            const newZone = await response.json();
            await this.loadData(); // Перезагружаем данные
            this.toast.show(`Тарифная зона "${newZone.title}" добавлена`, "Карточка создана");
        } catch (error) {
            console.error('Ошибка создания:', error);
            this.toast.show('Не удалось создать зону', "Ошибка");
        }
    }
    
    async deleteCard(cardId) {
        try {
            const response = await fetch(`${API_URL}/${cardId}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) throw new Error('Ошибка удаления');
            
            await this.loadData(); // Перезагружаем данные
            this.toast.show(`Тарифная зона удалена`, "Карточка удалена");
        } catch (error) {
            console.error('Ошибка удаления:', error);
            this.toast.show('Не удалось удалить зону', "Ошибка");
        }
    }
    
    async searchServices(searchTerm) {
        if (!searchTerm.trim()) {
            await this.loadData();
            this.toast.show(`Показаны все ${this.rate_zones.length} зон`, "Сброс поиска");
            return;
        }
        
        const searchPrice = parseInt(searchTerm.trim());
        
        if (searchPrice < 0) {
            this.toast.show("Цена не может быть отрицательной", "Ошибка поиска");
            return;
        }
        
        if (isNaN(searchPrice)) {
            this.toast.show("Введите числовое значение цены", "Ошибка поиска");
            return;
        }
        
        try {
            const response = await fetch(`${API_URL}?price=${searchPrice}`);
            if (!response.ok) throw new Error('Ошибка поиска');
            
            this.filteredZones = await response.json();
            this.renderServices();
            
            const count = this.filteredZones.length;
            if (count === 0) {
                this.toast.show(`Зон с ценой ${searchPrice} ₽ не найдено`, "Результаты поиска");
            } else {
                this.toast.show(`Найдено ${count} зон с ценой ${searchPrice} ₽`, "Результаты поиска");
            }
        } catch (error) {
            console.error('Ошибка поиска:', error);
            this.toast.show('Ошибка поиска', "Ошибка");
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
                        <div class="action-buttons">
                            <button id="add-card-btn" class="action-btn-add">
                                <span>+</span> Добавить тарифную зону
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="services-section">
                    <div class="section-header">
                        <div class="section-title-wrapper">
                            <div>
                                <div class="section-title">Тарифные зоны</div>
                                <div class="section-subtitle" id="services-count">Всего: ${this.filteredZones.length}</div>
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
        
        this.filteredZones.forEach((zone) => {
            const serviceCard = new ServiceCardComponent(pageRoot);
            serviceCard.render(zone, this.clickCard.bind(this), this.deleteCard.bind(this));
        });
        
        const countElement = document.getElementById('services-count');
        if (countElement) {
            countElement.textContent = `Всего: ${this.filteredZones.length}`;
        }
    }
    
    clickCard(zoneId) {
        const servicePage = new ServicePage(this.parent, zoneId, this.toast, this.rate_zones);
        servicePage.render();
    }
    
    async render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        
        const calculatorContainer = document.getElementById('calculator-container');
        const calculator = new CalculatorComponent(calculatorContainer);
        calculator.render(this.toast.show.bind(this.toast));
        
        // Загружаем данные перед рендером карточек
        await this.loadData();
        
        const searchBtn = document.getElementById('search-btn');
        const searchInput = document.getElementById('search-input');
        const addBtn = document.getElementById('add-card-btn');
        
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
        
        if (addBtn) {
            addBtn.addEventListener('click', () => {
                this.copyFirstCard();
            });
        }
    }
}