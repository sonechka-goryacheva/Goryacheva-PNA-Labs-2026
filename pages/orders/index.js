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
                from: "Москва (SVO)",
                to: "Берлин (BER)",
                weight: 250,
                volume: 1.2,
                price: 30000,
                status: "Доставлен"
            },
            {
                id: 1002,
                date: "18.04.2025",
                from: "Санкт-Петербург (LED)",
                to: "Пекин (PEK)",
                weight: 500,
                volume: 2.5,
                price: 90000,
                status: "В пути"
            },
            {
                id: 1003,
                date: "20.04.2025",
                from: "Москва (SVO)",
                to: "Нью-Йорк (JFK)",
                weight: 1200,
                volume: 5.0,
                price: 300000,
                status: "В пути"
            },
            {
                id: 1004,
                date: "22.04.2025",
                from: "Казань (KZN)",
                to: "Дубай (DXB)",
                weight: 80,
                volume: 0.5,
                price: 16000,
                status: "Оформляется"
            },
            {
                id: 1005,
                date: "25.04.2025",
                from: "Москва (SVO)",
                to: "Алматы (ALA)",
                weight: 350,
                volume: 1.8,
                price: 35000,
                status: "Оформляется"
            },
            {
                id: 1006,
                date: "28.04.2025",
                from: "Санкт-Петербург (LED)",
                to: "Каир (CAI)",
                weight: 200,
                volume: 1.0,
                price: 60000,
                status: "В пути"
            }
        ];
    }
    
    getStatusColor(status) {
        switch(status) {
            case 'Доставлен': return '#2ecc71';
            case 'В пути': return '#f0d246';
            case 'Оформляется': return '#e74c3c';
            default: return '#666';
        }
    }
    
    getStatusTextColor(status) {
        return status === 'В пути' ? '#333' : 'white';
    }
    
    getHTML() {
        return `
            <div class="orders-page-container" style="padding: 40px 0;">
                <div class="container">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
                        <div>
                            <h2 style="color: var(--purple); font-weight: 700;">Мои заказы</h2>
                            <p style="color: var(--gray);">История и статус ваших заказов</p>
                        </div>
                    </div>
                    
                    <div id="orders-list-container">
                        ${this.renderOrdersList()}
                    </div>
                </div>
            </div>
        `;
    }
    
    renderOrdersList() {
        if (this.orders.length === 0) {
            return '<div style="text-align: center; padding: 50px; color: var(--gray);">У вас пока нет заказов</div>';
        }
        
        return this.orders.map(order => `
            <div class="order-item" style="background: var(--white); border: 1px solid var(--gray-border); margin-bottom: 15px; padding: 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 15px;">
                <div style="flex: 2; min-width: 150px;">
                    <div style="font-weight: 700; color: var(--purple); margin-bottom: 5px;">Заказ №${order.id}</div>
                    <div style="font-size: 13px; color: var(--gray);">${order.date}</div>
                </div>
                <div style="flex: 2; min-width: 150px;">
                    <div style="font-size: 14px; font-weight: 600;">${order.from}</div>
                    <div style="font-size: 12px; color: var(--gray);">→ ${order.to}</div>
                </div>
                <div style="flex: 1; min-width: 100px;">
                    <div style="font-size: 14px;">${order.weight} кг</div>
                    <div style="font-size: 12px; color: var(--gray);">${order.volume} м³</div>
                </div>
                <div style="flex: 1; min-width: 100px;">
                    <div style="font-size: 16px; font-weight: 700; color: var(--gold);">${order.price.toLocaleString()} ₽</div>
                </div>
                <div style="flex: 1; min-width: 120px;">
                    <span style="display: inline-block; padding: 4px 12px; background: ${this.getStatusColor(order.status)}; color: ${this.getStatusTextColor(order.status)}; font-size: 12px; font-weight: 600;">
                        ${order.status}
                    </span>
                </div>
            </div>
        `).join('');
    }
    
    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
    }
}