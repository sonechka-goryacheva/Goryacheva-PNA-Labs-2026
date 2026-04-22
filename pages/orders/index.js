import { OrderCardComponent } from "../../components/order-card/index.js";
import { ToastComponent } from "../../components/toast/index.js";

export class OrdersPage {
    constructor(parent) {
        this.parent = parent;
        this.toast = new ToastComponent();
        this.orders = this.getOrders();
    }
    
    getOrders() {
        return [
            {
                id: 1001,
                date: "15.04.2025",
                zone: "Тарифная зона 1 (Европа)",
                from: "Москва",
                to: "Берлин",
                weight: 250,
                volume: 1.2,
                price: 30000,
                status: "Доставлен"
            },
            {
                id: 1002,
                date: "18.04.2025",
                zone: "Тарифная зона 2 (Азия)",
                from: "Санкт-Петербург",
                to: "Пекин",
                weight: 500,
                volume: 2.5,
                price: 90000,
                status: "В пути"
            },
            {
                id: 1003,
                date: "20.04.2025",
                zone: "Тарифная зона 3 (Америка)",
                from: "Москва",
                to: "Нью-Йорк",
                weight: 1200,
                volume: 5.0,
                price: 300000,
                status: "В пути"
            },
            {
                id: 1004,
                date: "22.04.2025",
                zone: "Тарифная зона 4 (Ближний Восток)",
                from: "Казань",
                to: "Дубай",
                weight: 80,
                volume: 0.5,
                price: 16000,
                status: "Оформляется"
            },
            {
                id: 1005,
                date: "25.04.2025",
                zone: "Тарифная зона 5 (СНГ)",
                from: "Москва",
                to: "Алматы",
                weight: 350,
                volume: 1.8,
                price: 35000,
                status: "Оформляется"
            },
            {
                id: 1006,
                date: "28.04.2025",
                zone: "Тарифная зона 6 (Африка)",
                from: "Санкт-Петербург",
                to: "Каир",
                weight: 200,
                volume: 1.0,
                price: 60000,
                status: "В пути"
            }
        ];
    }
    
    getHTML() {
        return `
            <div class="container" style="padding: 40px 20px;">
                <div class="orders-header" style="margin-bottom: 30px;">
                    <h2 style="color: var(--purple); font-weight: 700;">Мои заказы</h2>
                    <p style="color: var(--gray);">История и статус ваших заказов</p>
                </div>
                <div id="orders-container"></div>
            </div>
        `;
    }
    
    renderOrders() {
        const container = document.getElementById('orders-container');
        if (!container) return;
        
        container.innerHTML = '';
        
        if (this.orders.length === 0) {
            container.innerHTML = '<div style="text-align: center; padding: 50px; color: var(--gray);">У вас пока нет заказов</div>';
            return;
        }
        
        this.orders.forEach((order) => {
            const orderCard = new OrderCardComponent(container);
            orderCard.render(order);
        });
    }
    
    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        this.renderOrders();
    }
}