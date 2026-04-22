import { ServiceDetailComponent } from "../../components/service-detail/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";

export class ServicePage {
    constructor(parent, serviceId, toast, allServices) {
        this.parent = parent;
        this.serviceId = serviceId;
        this.toast = toast;
        this.allServices = allServices;
    }
    
    getData() {
        const services = {
            1: {
                id: 1,
                title: "Тарифная зона 1 (Европа)",
                fullDesc: "Ежедневные рейсы из всех основных аэропортов. Быстрая доставка до двери.",
                image: "Europe.png",
                price: "120",
                maxWeight: "до 5000 кг",
                deliveryTime: "2-3 дня",
                zone: "Европа",
                insurance: "Включено",
                features: "Ежедневные рейсы",
                countries: ["Германия", "Франция", "Италия", "Испания", "Великобритания", "Швейцария", "Норвегия", "Польша", "Чехия", "Австрия", "Бельгия", "Нидерланды"],
                aircrafts: [
                    { name: "Boeing 737-800F", capacity: "до 23 тонн", range: "3,600 км" },
                    { name: "Airbus A321F", capacity: "до 27 тонн", range: "3,700 км" },
                    { name: "Boeing 767-300F", capacity: "до 60 тонн", range: "6,000 км" }
                ]
            },
            2: {
                id: 2,
                title: "Тарифная зона 2 (Азия)",
                fullDesc: "Регулярные рейсы с фиксированным расписанием. Экспресс-доставка крупных партий.",
                image: "Azia.png",
                price: "180",
                maxWeight: "до 10000 кг",
                deliveryTime: "3-5 дней",
                zone: "Азия",
                insurance: "Включено",
                features: "Экспресс-доставка",
                countries: ["Китай", "Япония", "Южная Корея", "Сингапур", "Таиланд", "Вьетнам", "Малайзия", "Индия"],
                aircrafts: [
                    { name: "Boeing 777F", capacity: "до 102 тонн", range: "9,070 км" },
                    { name: "Boeing 747-400F", capacity: "до 112 тонн", range: "8,230 км" },
                    { name: "Airbus A330-200F", capacity: "до 70 тонн", range: "7,400 км" }
                ]
            },
            3: {
                id: 3,
                title: "Тарифная зона 3 (Америка)",
                fullDesc: "Трансатлантические и транстихоокеанские маршруты. Полное таможенное сопровождение.",
                image: "America.avif",
                price: "250",
                maxWeight: "до 20000 кг",
                deliveryTime: "4-7 дней",
                zone: "Америка",
                insurance: "Включено",
                features: "Таможенное сопровождение",
                countries: ["США", "Канада", "Бразилия", "Мексика", "Аргентина", "Чили", "Перу", "Колумбия"],
                aircrafts: [
                    { name: "Boeing 777F", capacity: "до 102 тонн", range: "9,070 км" },
                    { name: "Boeing 747-400F", capacity: "до 112 тонн", range: "8,230 км" },
                    { name: "Airbus A330-200F", capacity: "до 70 тонн", range: "7,400 км" }
                ]
            },
            4: {
                id: 4,
                title: "Тарифная зона 4 (Ближний Восток)",
                fullDesc: "Регулярные рейсы в основные хабы. Быстрая обработка грузов.",
                image: "Bligni Vostok.webp",
                price: "200",
                maxWeight: "до 8000 кг",
                deliveryTime: "3-4 дня",
                zone: "Ближний Восток",
                insurance: "Включено",
                features: "Хабы Дубай, Доха",
                countries: ["ОАЭ", "Катар", "Саудовская Аравия", "Израиль", "Кувейт", "Оман", "Бахрейн"],
                aircrafts: [
                    { name: "Boeing 777F", capacity: "до 102 тонн", range: "9,070 км" },
                    { name: "Boeing 747-400F", capacity: "до 112 тонн", range: "8,230 км" },
                    { name: "Airbus A330-200F", capacity: "до 70 тонн", range: "7,400 км" }
                ]
            },
            5: {
                id: 5,
                title: "Тарифная зона 5 (СНГ и Средняя Азия)",
                fullDesc: "Быстрая доставка по странам СНГ. Индивидуальный подход.",
                image: "CNG&Azia.avif",
                price: "100",
                maxWeight: "до 3000 кг",
                deliveryTime: "1-2 дня",
                zone: "СНГ",
                insurance: "Включено",
                features: "Регулярные рейсы",
                countries: ["Казахстан", "Узбекистан", "Азербайджан", "Армения", "Киргизия", "Таджикистан", "Туркменистан", "Грузия"],
                aircrafts: [
                    { name: "Ил-76ТД", capacity: "до 48 тонн", range: "6,700 км" },
                    { name: "Boeing 737-800F", capacity: "до 23 тонн", range: "3,600 км" },
                    { name: "Airbus A321F", capacity: "до 27 тонн", range: "3,700 км" }
                ]
            },
            6: {
                id: 6,
                title: "Тарифная зона 6 (Африка)",
                fullDesc: "Специализированные рейсы в Африку. Работа с местными авиакомпаниями.",
                image: "Africa.jpg",
                price: "300",
                maxWeight: "до 15000 кг",
                deliveryTime: "5-8 дней",
                zone: "Африка",
                insurance: "Включено",
                features: "Чартерные рейсы",
                countries: ["ЮАР", "Египет", "Кения", "Нигерия", "Марокко", "Тунис", "Алжир", "Гана"],
                aircrafts: [
                    { name: "Antonov An-124-100", capacity: "до 150 тонн", range: "5,400 км" },
                    { name: "Boeing 747-400F", capacity: "до 112 тонн", range: "8,230 км" },
                    { name: "Ил-76ТД", capacity: "до 48 тонн", range: "6,700 км" }
                ]
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