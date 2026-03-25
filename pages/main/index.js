import { ServiceCardComponent } from "../../components/service-card/index.js";
import { CalculatorComponent } from "../../components/calculator/index.js";
import { ServicePage } from "../service/index.js";
import { ToastComponent } from "../../components/toast/index.js";

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
                title: "Авиадоставка грузов",
                shortDesc: "Оперативная доставка грузов воздушным транспортом по России и миру",
                fullDesc: "Авиационные перевозки с нами – это оптимальная стоимость доставки и бережное отношение к грузу. Мы сотрудничаем с ведущими авиакомпаниями и гарантируем сохранность вашего груза.",
                image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800",
                price: "150",
                unit: "кг",
                maxWeight: "до 5000 кг",
                deliveryTime: "1-3 дня",
                zone: "Россия, СНГ, Европа, Азия",
                insurance: "Включено в стоимость",
                features: "Отслеживание груза 24/7",
                category: "Авиа"
            },
            {
                id: 2,
                title: "Экспресс-доставка корреспонденции",
                shortDesc: "Доставка писем и документов за 2 часа до вылета рейса",
                fullDesc: "Уникальная технология позволяет отправить письмо или небольшую посылку за 2 часа до вылета рейса и получить в аэропорту назначения через 2 часа после посадки воздушного судна.",
                image: "https://images.unsplash.com/photo-1589571894960-20bbe2828d0a?w=800",
                price: "500",
                unit: "отправление",
                maxWeight: "до 5 кг",
                deliveryTime: "от 4 часов",
                zone: "Москва - регионы России",
                insurance: "По запросу",
                features: "Срочная доставка",
                category: "Экспресс"
            },
            {
                id: 3,
                title: "Таможенное оформление грузов",
                shortDesc: "Полное сопровождение таможенных процедур",
                fullDesc: "Профессиональное таможенное оформление импортных и экспортных грузов. Помощь в подготовке документов, расчет пошлин и сборов, консультации экспертов.",
                image: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=800",
                price: "5000",
                unit: "декларация",
                maxWeight: "без ограничений",
                deliveryTime: "1-2 дня",
                zone: "Россия",
                insurance: "Не требуется",
                features: "Консультация эксперта",
                category: "Документы"
            },
            {
                id: 4,
                title: "Перевозка животных",
                shortDesc: "Безопасная перевозка домашних питомцев",
                fullDesc: "Перевозка животных самолетом по России и миру. Индивидуальные контейнеры, ветеринарный контроль, комфортные условия для ваших питомцев.",
                image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800",
                price: "3000",
                unit: "животное",
                maxWeight: "до 50 кг",
                deliveryTime: "1-5 дней",
                zone: "Россия, СНГ, Европа",
                insurance: "Обязательное",
                features: "Ветеринарный контроль",
                category: "Спецгруз"
            },
            {
                id: 5,
                title: "Скоропортящиеся продукты",
                shortDesc: "Авиадоставка продуктов для ресторанов и кафе",
                fullDesc: "Авиадоставка скоропортящихся продуктов с контролем температуры. Свежие продукты от производителя к вашему столу.",
                image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800",
                price: "250",
                unit: "кг",
                maxWeight: "до 1000 кг",
                deliveryTime: "1-2 дня",
                zone: "Россия",
                insurance: "Включено",
                features: "Температурный контроль",
                category: "Термо"
            },
            {
                id: 6,
                title: "Автомобильные перевозки",
                shortDesc: "Доставка грузов по Москве и области",
                fullDesc: "Доставка грузов любого веса и объёма по Москве и области собственным автотранспортом. Доставка из аэропорта до адреса получателя.",
                image: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=800",
                price: "1000",
                unit: "рейс",
                maxWeight: "до 1500 кг",
                deliveryTime: "1 день",
                zone: "Москва, МО",
                insurance: "По запросу",
                features: "Автопарк, экспедирование",
                category: "Авто"
            }
        ];
    }
    
    copyFirstCard() {
        const firstCard = this.services[0];
        if (!firstCard) return;
        
        const newCard = {
            ...firstCard,
            id: this.nextId++,
            title: `${firstCard.title} (копия)`,
            shortDesc: `${firstCard.shortDesc} (добавлено)`
        };
        
        this.services.push(newCard);
        this.filteredServices = [...this.services];
        this.renderServices();
        this.toast.show(`Услуга "${newCard.title}" добавлена`, "Карточка создана");
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
        
        const count = this.filteredServices.length;
        if (count === 0) {
            this.toast.show("Ничего не найдено. Попробуйте изменить запрос.", "Результаты поиска");
        } else {
            this.toast.show(`Найдено ${count} услуг`, "Результаты поиска");
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
                            <input type="text" id="search-input" placeholder="Поиск по названию, описанию или категории..." class="search-input">
                            <button id="search-btn" class="search-btn">🔍 Найти</button>
                        </div>
                        <div class="action-buttons">
                            <button id="add-card-btn" class="action-btn-add">
                                <span>+</span> Добавить услугу (копировать первую)
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="services-section">
                    <div class="section-header">
                        <div class="section-title-wrapper">
                            <div class="section-icon">
                                <svg viewBox="0 0 24 24" stroke="#34084b" stroke-width="1.5" fill="none">
                                    <path d="M12 2L12 7M12 2L9 5M12 2L15 5"/>
                                    <path d="M5 12L19 12"/>
                                    <path d="M3 17L21 17"/>
                                    <path d="M8 7L16 7"/>
                                    <path d="M6 12L4 17"/>
                                    <path d="M18 12L20 17"/>
                                </svg>
                            </div>
                            <div>
                                <div class="section-title">Наши услуги</div>
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
    
    clickCard(serviceId) {
        const servicePage = new ServicePage(this.parent, serviceId, this.toast);
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