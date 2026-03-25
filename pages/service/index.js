import { ServiceDetailComponent } from "../../components/service-detail/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";

export class ServicePage {
    constructor(parent, serviceId, toast) {
        this.parent = parent;
        this.serviceId = serviceId;
        this.toast = toast;
    }
    
    getData() {
        const services = {
            1: {
                id: 1,
                title: "Авиадоставка грузов",
                fullDesc: "Авиационные перевозки с нами – это оптимальная стоимость доставки и бережное отношение к грузу. Мы сотрудничаем с ведущими авиакомпаниями и гарантируем сохранность вашего груза. Быстрая доставка по России и всему миру.",
                image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800",
                price: "150",
                maxWeight: "до 5000 кг",
                deliveryTime: "1-3 дня",
                zone: "Россия, СНГ, Европа, Азия",
                insurance: "Включено в стоимость",
                features: "Отслеживание груза 24/7"
            },
            2: {
                id: 2,
                title: "Экспресс-доставка корреспонденции",
                fullDesc: "Уникальная технология позволяет отправить письмо или небольшую посылку за 2 часа до вылета рейса и получить в аэропорту назначения через 2 часа после посадки воздушного судна. Идеально для срочных документов.",
                image: "https://images.unsplash.com/photo-1589571894960-20bbe2828d0a?w=800",
                price: "500",
                maxWeight: "до 5 кг",
                deliveryTime: "от 4 часов",
                zone: "Москва - регионы России",
                insurance: "По запросу",
                features: "Срочная доставка"
            },
            3: {
                id: 3,
                title: "Таможенное оформление грузов",
                fullDesc: "Профессиональное таможенное оформление импортных и экспортных грузов. Помощь в подготовке документов, расчет пошлин и сборов, консультации экспертов. Работаем со всеми видами грузов.",
                image: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=800",
                price: "5000",
                maxWeight: "без ограничений",
                deliveryTime: "1-2 дня",
                zone: "Россия",
                insurance: "Не требуется",
                features: "Консультация эксперта"
            },
            4: {
                id: 4,
                title: "Перевозка животных",
                fullDesc: "Перевозка животных самолетом по России и миру. Индивидуальные контейнеры, ветеринарный контроль, комфортные условия для ваших питомцев. Полное сопровождение от двери до двери.",
                image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800",
                price: "3000",
                maxWeight: "до 50 кг",
                deliveryTime: "1-5 дней",
                zone: "Россия, СНГ, Европа",
                insurance: "Обязательное",
                features: "Ветеринарный контроль"
            },
            5: {
                id: 5,
                title: "Скоропортящиеся продукты",
                fullDesc: "Авиадоставка скоропортящихся продуктов для ресторанов и кафе. Контроль температуры, ускоренная обработка, доставка от двери до двери. Гарантия свежести продукции.",
                image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800",
                price: "250",
                maxWeight: "до 1000 кг",
                deliveryTime: "1-2 дня",
                zone: "Россия",
                insurance: "Включено",
                features: "Температурный контроль"
            },
            6: {
                id: 6,
                title: "Автомобильные перевозки",
                fullDesc: "Доставка грузов любого веса и объёма по Москве и области собственным автотранспортом. Доставка из аэропорта до адреса получателя (до двери). Оперативно и надежно.",
                image: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=800",
                price: "1000",
                maxWeight: "до 1500 кг",
                deliveryTime: "1 день",
                zone: "Москва, МО",
                insurance: "По запросу",
                features: "Автопарк, экспедирование"
            }
        };
        
        return services[this.serviceId] || services[1];
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
        
        const pageRoot = document.getElementById('service-page');
        const serviceData = this.getData();
        const serviceDetail = new ServiceDetailComponent(pageRoot);
        serviceDetail.render(serviceData, this.toast.show.bind(this.toast));
    }
}