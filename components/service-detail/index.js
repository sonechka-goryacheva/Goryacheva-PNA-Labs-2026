export class ServiceDetailComponent {
    constructor(parent) {
        this.parent = parent;
    }
    
    getDetailIcon(type, category = null) {
        const icons = {
            weight: `<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" fill="none">
                        <circle cx="12" cy="12" r="9"/>
                        <path d="M12 8L12 12L15 15"/>
                     </svg>`,
            time: `<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" fill="none">
                     <circle cx="12" cy="12" r="9"/>
                     <polyline points="12 7 12 12 15 15"/>
                   </svg>`,
            zone: `<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" fill="none">
                     <circle cx="12" cy="12" r="9"/>
                     <path d="M12 2L12 7M12 12L12 14M12 22L12 17"/>
                     <circle cx="12" cy="12" r="2"/>
                   </svg>`,
            insurance: `<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" fill="none">
                         <path d="M12 2L12 6M12 12L12 16"/>
                         <path d="M5 8L12 2L19 8L19 16L12 22L5 16L5 8Z"/>
                       </svg>`,
            features: `<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" fill="none">
                        <path d="M9 12L11 14L15 10"/>
                        <circle cx="12" cy="12" r="9"/>
                      </svg>`,
            // Самолет для авиадоставки
            airplane: `<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" fill="none">
                         <path d="M12 2L12 7M12 2L9 5M12 2L15 5"/>
                         <path d="M5 12L19 12"/>
                         <path d="M3 17L21 17"/>
                         <path d="M8 7L16 7"/>
                         <path d="M6 12L4 17"/>
                         <path d="M18 12L20 17"/>
                       </svg>`,
            // Питомец для перевозки животных
            pet: `<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" fill="none">
                    <!-- Левый глаз -->
                    <circle cx="8" cy="10" r="1.2" fill="currentColor"/>
                    <!-- Правый глаз -->
                    <circle cx="16" cy="10" r="1.2" fill="currentColor"/>
                    <!-- Носик -->
                    <circle cx="12" cy="14" r="1" fill="currentColor"/>
                    <!-- Усы -->
                    <path d="M6 13L4 12M6 14L4 15M18 13L20 12M18 14L20 15"/>
                    <!-- Ротик -->
                    <path d="M10 16C10 16 11 17 12 17C13 17 14 16 14 16"/>
                    <!-- Левое ухо -->
                    <path d="M5 6L7 3L9 6" fill="currentColor"/>
                    <!-- Правое ухо -->
                    <path d="M19 6L17 3L15 6" fill="currentColor"/>
                    <!-- Голова -->
                    <path d="M4 10C4 6 7 4 12 4C17 4 20 6 20 10C20 14 17 18 12 18C7 18 4 14 4 10Z"/>
                </svg>`,
            // Снежинка для продуктов
            snowflake: `<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" fill="none">
                          <path d="M12 4V20M12 4L9 7M12 4L15 7M12 20L9 17M12 20L15 17"/>
                          <path d="M5 12L19 12M5 12L8 9M5 12L8 15M19 12L16 9M19 12L16 15"/>
                          <path d="M7 7L17 17M7 17L17 7"/>
                        </svg>`
        };
        
        // Возвращаем специальную иконку заголовка в зависимости от категории
        if (type === 'category' && category) {
            if (category === 'Авиа') return icons.airplane;
            if (category === 'Спецгруз') return icons.pet;
            if (category === 'Термо') return icons.snowflake;
            return icons.airplane;
        }
        
        return icons[type] || icons.weight;
    }
    
    getHTML(data) {
        let titleIcon = this.getDetailIcon('category', data.category);
        
        return `
            <div class="row">
                <div class="col-md-5">
                    <img src="${data.image}" class="detail-image" alt="${data.title}">
                </div>
                <div class="col-md-7">
                    <div class="detail-title">
                        <span class="detail-title-icon">${titleIcon}</span>
                        ${data.title}
                    </div>
                    <div class="detail-price">${data.price} ₽</div>
                    <p style="color: var(--gray); line-height: 1.6;">${data.fullDesc}</p>
                    
                    <div class="detail-info">
                        <div class="detail-info-item">
                            <span class="detail-info-label">${this.getDetailIcon('weight')} Максимальный вес:</span>
                            <span class="detail-info-value">${data.maxWeight}</span>
                        </div>
                        <div class="detail-info-item">
                            <span class="detail-info-label">${this.getDetailIcon('time')} Срок доставки:</span>
                            <span class="detail-info-value">${data.deliveryTime}</span>
                        </div>
                        <div class="detail-info-item">
                            <span class="detail-info-label">${this.getDetailIcon('zone')} Зона доставки:</span>
                            <span class="detail-info-value">${data.zone}</span>
                        </div>
                        <div class="detail-info-item">
                            <span class="detail-info-label">${this.getDetailIcon('insurance')} Страхование:</span>
                            <span class="detail-info-value">${data.insurance}</span>
                        </div>
                        <div class="detail-info-item">
                            <span class="detail-info-label">${this.getDetailIcon('features')} Особенности:</span>
                            <span class="detail-info-value">${data.features}</span>
                        </div>
                    </div>
                    
                    <button class="btn-order" id="order-btn">Оставить заявку</button>
                </div>
            </div>
        `;
    }
    
    addListeners(data, toastCallback) {
        const orderBtn = document.getElementById('order-btn');
        if (orderBtn) {
            orderBtn.addEventListener('click', () => {
                toastCallback(`Заявка на услугу "${data.title}" отправлена. Менеджер свяжется с вами.`, "Заявка отправлена");
            });
        }
    }
    
    render(data, toastCallback) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data, toastCallback);
    }
}