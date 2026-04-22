import { ServiceCardComponent } from "../../components/service-card/index.js";
import { CalculatorComponent } from "../../components/calculator/index.js";
import { ServicePage } from "../service/index.js";
import { ToastComponent } from "../../components/toast/index.js";
import { isEqualTariffZone, getExcludedZones, mergeTariffData, createTemplateZones } from "../../utils/helpers.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.toast = new ToastComponent();
        this.services = this.getInitialData();
        this.filteredServices = [...this.services];
        this.nextId = 7;
    }
    
    getInitialData() {
        return [
            {
                id: 1,
                title: "Тарифная зона 1 (Европа)",
                shortDesc: "Страны ЕС, Великобритания, Швейцария, Норвегия",
                fullDesc: "Ежедневные рейсы из всех основных аэропортов. Быстрая доставка до двери.",
                image: "Europe.png",
                price: "120",
                unit: "кг",
                maxWeight: "до 5000 кг",
                deliveryTime: "2-3 дня",
                zone: "Европа",
                insurance: "Включено",
                features: "Ежедневные рейсы",
                category: "Тарифная зона",
                countries: ["Германия", "Франция", "Италия", "Испания", "Великобритания", "Швейцария", "Норвегия", "Польша", "Чехия", "Австрия", "Бельгия", "Нидерланды"],
                aircrafts: [
                    { name: "Boeing 737-800F", capacity: "до 23 тонн", range: "3,600 км" },
                    { name: "Airbus A321F", capacity: "до 27 тонн", range: "3,700 км" },
                    { name: "Boeing 767-300F", capacity: "до 60 тонн", range: "6,000 км" }
                ]
            },
            {
                id: 2,
                title: "Тарифная зона 2 (Азия)",
                shortDesc: "Китай, Япония, Южная Корея, Сингапур",
                fullDesc: "Регулярные рейсы с фиксированным расписанием. Экспресс-доставка крупных партий.",
                image: "Azia.png",
                price: "180",
                unit: "кг",
                maxWeight: "до 10000 кг",
                deliveryTime: "3-5 дней",
                zone: "Азия",
                insurance: "Включено",
                features: "Экспресс-доставка",
                category: "Тарифная зона",
                countries: ["Китай", "Япония", "Южная Корея", "Сингапур", "Таиланд", "Вьетнам", "Малайзия", "Индия"],
                aircrafts: [
                    { name: "Boeing 777F", capacity: "до 102 тонн", range: "9,070 км" },
                    { name: "Boeing 747-400F", capacity: "до 112 тонн", range: "8,230 км" },
                    { name: "Airbus A330-200F", capacity: "до 70 тонн", range: "7,400 км" }
                ]
            },
            {
                id: 3,
                title: "Тарифная зона 3 (Америка)",
                shortDesc: "США, Канада, Бразилия, Мексика",
                fullDesc: "Трансатлантические и транстихоокеанские маршруты. Полное таможенное сопровождение.",
                image: "America.avif",
                price: "250",
                unit: "кг",
                maxWeight: "до 20000 кг",
                deliveryTime: "4-7 дней",
                zone: "Америка",
                insurance: "Включено",
                features: "Таможенное сопровождение",
                category: "Тарифная зона",
                countries: ["США", "Канада", "Бразилия", "Мексика", "Аргентина", "Чили", "Перу", "Колумбия"],
                aircrafts: [
                    { name: "Boeing 777F", capacity: "до 102 тонн", range: "9,070 км" },
                    { name: "Boeing 747-400F", capacity: "до 112 тонн", range: "8,230 км" },
                    { name: "Airbus A330-200F", capacity: "до 70 тонн", range: "7,400 км" }
                ]
            },
            {
                id: 4,
                title: "Тарифная зона 4 (Ближний Восток)",
                shortDesc: "ОАЭ, Катар, Саудовская Аравия, Израиль",
                fullDesc: "Регулярные рейсы в основные хабы. Быстрая обработка грузов.",
                image: "Bligni Vostok.webp",
                price: "200",
                unit: "кг",
                maxWeight: "до 8000 кг",
                deliveryTime: "3-4 дня",
                zone: "Ближний Восток",
                insurance: "Включено",
                features: "Регулярные рейсы",
                category: "Тарифная зона",
                countries: ["ОАЭ", "Катар", "Саудовская Аравия", "Израиль", "Кувейт", "Оман", "Бахрейн"],
                aircrafts: [
                    { name: "Boeing 777F", capacity: "до 102 тонн", range: "9,070 км" },
                    { name: "Boeing 747-400F", capacity: "до 112 тонн", range: "8,230 км" },
                    { name: "Airbus A330-200F", capacity: "до 70 тонн", range: "7,400 км" }
                ]
            },
            {
                id: 5,
                title: "Тарифная зона 5 (СНГ и Средняя Азия)",
                shortDesc: "Казахстан, Узбекистан, Азербайджан, Армения",
                fullDesc: "Быстрая доставка по странам СНГ. Индивидуальный подход.",
                image: "CNG&Azia.avif",
                price: "100",
                unit: "кг",
                maxWeight: "до 3000 кг",
                deliveryTime: "1-2 дня",
                zone: "СНГ",
                insurance: "Включено",
                features: "Регулярные рейсы",
                category: "Тарифная зона",
                countries: ["Казахстан", "Узбекистан", "Азербайджан", "Армения", "Киргизия", "Таджикистан", "Туркменистан", "Грузия"],
                aircrafts: [
                    { name: "Ил-76ТД", capacity: "до 48 тонн", range: "6,700 км" },
                    { name: "Boeing 737-800F", capacity: "до 23 тонн", range: "3,600 км" },
                    { name: "Airbus A321F", capacity: "до 27 тонн", range: "3,700 км" }
                ]
            },
            {
                id: 6,
                title: "Тарифная зона 6 (Африка)",
                shortDesc: "ЮАР, Египет, Кения, Нигерия",
                fullDesc: "Специализированные рейсы в Африку. Работа с местными авиакомпаниями.",
                image: "Africa.jpg",
                price: "300",
                unit: "кг",
                maxWeight: "до 15000 кг",
                deliveryTime: "5-8 дней",
                zone: "Африка",
                insurance: "Включено",
                features: "Чартерные рейсы",
                category: "Тарифная зона",
                countries: ["ЮАР", "Египет", "Кения", "Нигерия", "Марокко", "Тунис", "Алжир", "Гана"],
                aircrafts: [
                    { name: "Antonov An-124-100", capacity: "до 150 тонн", range: "5,400 км" },
                    { name: "Boeing 747-400F", capacity: "до 112 тонн", range: "8,230 км" },
                    { name: "Ил-76ТД", capacity: "до 48 тонн", range: "6,700 км" }
                ]
            }
        ];
    }
    
    copyFirstCard() {
        const firstCard = this.services[0];
        if (!firstCard) return;
        
        const isDuplicate = this.services.some(zone => 
            isEqualTariffZone(zone, firstCard)
        );
        
        if (isDuplicate) {
            this.toast.show("Такая тарифная зона уже существует! Копирование отменено.", "Ошибка");
            return;
        }
        
        const metaData = {
            copiedAt: new Date().toLocaleString(),
            source: "копия"
        };
        
        const newCard = mergeTariffData(
            { ...firstCard, id: this.nextId++ },
            { title: `${firstCard.title} (копия)`, shortDesc: `${firstCard.shortDesc} (добавлено)` },
            metaData
        );
        
        this.services.push(newCard);
        this.filteredServices = [...this.services];
        this.renderServices();
        this.toast.show(`Тарифная зона "${newCard.title}" добавлена`, "Карточка создана");
    }
    
    deleteCard(cardId) {
        const cardToDelete = this.services.find(s => s.id === cardId);
        if (!cardToDelete) return;
        
        this.services = this.services.filter(s => s.id !== cardId);
        this.filteredServices = this.filteredServices.filter(s => s.id !== cardId);
        this.renderServices();
        this.toast.show(`Услуга "${cardToDelete.title}" удалена`, "Карточка удалена");
    }
    
    searchServices(searchTerm) {
        if (!searchTerm.trim()) {
            this.filteredServices = [...this.services];
        } else {
            const term = searchTerm.toLowerCase().trim();
            this.filteredServices = this.services.filter(service => 
                service.title.toLowerCase().includes(term) ||
                service.shortDesc.toLowerCase().includes(term) ||
                service.category.toLowerCase().includes(term)
            );
        }
        this.renderServices();
        
        const excludedZones = getExcludedZones(this.services, this.filteredServices);
        if (excludedZones.length > 0) {
            this.toast.show(`Исключено из поиска: ${excludedZones.length} зон`, "Результаты поиска");
        }
        
        const count = this.filteredServices.length;
        if (count === 0) {
            this.toast.show("Ничего не найдено. Попробуйте изменить запрос.", "Результаты поиска");
        } else {
            this.toast.show(`Найдено ${count} тарифных зон`, "Результаты поиска");
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
                            <input type="text" id="search-input" placeholder="Поиск по тарифной зоне или типу ВС..." class="search-input">
                            <button id="search-btn" class="search-btn">🔍 Найти</button>
                        </div>
                        <div class="action-buttons">
                            <button id="add-card-btn" class="action-btn-add">
                                <span>+</span> Добавить тарифную зону
                            </button>
                            <button id="show-templates-btn" class="action-btn-add" style="background: var(--gold); color: var(--gray-dark);">
                                Шаблоны зон
                            </button>
                        </div>
                    </div>
                </div>
                
                <div id="templates-modal" style="display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 1000; justify-content: center; align-items: center;">
                    <div style="background: white; max-width: 500px; width: 90%; padding: 25px; border-left: 4px solid var(--gold);">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                            <h3 style="color: var(--purple); margin: 0;">Шаблоны тарифных зон</h3>
                            <button id="close-modal-btn" style="background: none; border: none; font-size: 24px; cursor: pointer;">&times;</button>
                        </div>
                        <div id="templates-list" style="max-height: 400px; overflow-y: auto;"></div>
                    </div>
                </div>
                
                <div class="services-section">
                    <div class="section-header">
                        <div class="section-title-wrapper">
                            <div>
                                <div class="section-title">Тарифные зоны</div>
                                <div class="section-subtitle" id="services-count">Всего: ${this.filteredServices.length}</div>
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
        
        this.filteredServices.forEach((service) => {
            const serviceCard = new ServiceCardComponent(pageRoot);
            serviceCard.render(service, this.clickCard.bind(this), this.deleteCard.bind(this));
        });
        
        const countElement = document.getElementById('services-count');
        if (countElement) {
            countElement.textContent = `Всего: ${this.filteredServices.length}`;
        }
    }
    
    showTemplatesModal() {
        const templateZone = {
            title: "Стандартная зона",
            price: "200",
            maxWeight: "до 7000 кг",
            deliveryTime: "3-4 дня",
            insurance: "Включено"
        };
        const templates = createTemplateZones(3, templateZone);
        
        const modal = document.getElementById('templates-modal');
        const templatesList = document.getElementById('templates-list');
        
        if (templatesList) {
            templatesList.innerHTML = templates.map((t, index) => `
                <div style="background: var(--gray-bg); padding: 12px; margin-bottom: 10px; border-left: 3px solid var(--gold);">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                        <span style="font-weight: 700; color: var(--purple);">Зона ${index + 1}</span>
                        <span style="font-size: 12px;">ID: ${t.id}</span>
                    </div>
                    <div style="font-size: 13px; margin-bottom: 5px;"><strong>${t.title}</strong></div>
                    <div style="font-size: 12px; color: var(--gray);">Цена: ${t.price} ₽</div>
                    <div style="font-size: 12px; color: var(--gray);">Вес: ${t.maxWeight}</div>
                    <div style="font-size: 12px; color: var(--gray);">Срок: ${t.deliveryTime}</div>
                    <div style="font-size: 12px; color: var(--gray);">Страхование: ${t.insurance}</div>
                </div>
            `).join('');
        }
        
        if (modal) {
            modal.style.display = 'flex';
        }
    }
    
    closeTemplatesModal() {
        const modal = document.getElementById('templates-modal');
        if (modal) {
            modal.style.display = 'none';
        }
    }
    
    clickCard(serviceId) {
        const servicePage = new ServicePage(this.parent, serviceId, this.toast, this.services);
        servicePage.render();
    }
    
    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        
        const calculatorContainer = document.getElementById('calculator-container');
        const calculator = new CalculatorComponent(calculatorContainer);
        calculator.render(this.toast.show.bind(this.toast));
        
        this.renderServices();
        
        const searchBtn = document.getElementById('search-btn');
        const searchInput = document.getElementById('search-input');
        const addBtn = document.getElementById('add-card-btn');
        const showTemplatesBtn = document.getElementById('show-templates-btn');
        const closeModalBtn = document.getElementById('close-modal-btn');
        
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
        
        if (showTemplatesBtn) {
            showTemplatesBtn.addEventListener('click', () => {
                this.showTemplatesModal();
            });
        }
        
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', () => {
                this.closeTemplatesModal();
            });
        }
        
        window.addEventListener('click', (e) => {
            const modal = document.getElementById('templates-modal');
            if (e.target === modal) {
                this.closeTemplatesModal();
            }
        });
    }
}