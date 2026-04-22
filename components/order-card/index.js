export class OrderCardComponent {
    constructor(parent) {
        this.parent = parent;
    }
    
    getHTML(order) {
        return `
            <div class="order-card" style="background: var(--white); border: 1px solid var(--gray-border); padding: 20px; margin-bottom: 15px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 15px;">
                <div style="flex: 2; min-width: 150px;">
                    <div style="font-weight: 700; color: var(--purple); margin-bottom: 5px;">Заказ №${order.id}</div>
                    <div style="font-size: 13px; color: var(--gray);">${order.date}</div>
                </div>
                <div style="flex: 2; min-width: 120px;">
                    <div style="font-size: 14px; font-weight: 600;">${order.zone}</div>
                    <div style="font-size: 12px; color: var(--gray);">${order.from} → ${order.to}</div>
                </div>
                <div style="flex: 1; min-width: 80px;">
                    <div style="font-size: 14px;">${order.weight} кг</div>
                    <div style="font-size: 12px; color: var(--gray);">${order.volume} м³</div>
                </div>
                <div style="flex: 1; min-width: 80px;">
                    <div style="font-size: 16px; font-weight: 700; color: var(--gold);">${order.price} ₽</div>
                </div>
                <div style="flex: 1; min-width: 100px;">
                    <span style="display: inline-block; padding: 4px 12px; background: ${order.status === 'Доставлен' ? '#2ecc71' : (order.status === 'В пути' ? '#f0d246' : '#e74c3c')}; color: ${order.status === 'Доставлен' ? 'white' : '#333'}; font-size: 12px; font-weight: 600;">
                        ${order.status}
                    </span>
                </div>
            </div>
        `;
    }
    
    render(order) {
        const html = this.getHTML(order);
        this.parent.insertAdjacentHTML('beforeend', html);
    }
}