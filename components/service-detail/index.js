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
            airplane: `<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" fill="none">
                         <path d="M12 2L12 7M12 2L9 5M12 2L15 5"/>
                         <path d="M5 12L19 12"/>
                         <path d="M3 17L21 17"/>
                         <path d="M8 7L16 7"/>
                         <path d="M6 12L4 17"/>
                         <path d="M18 12L20 17"/>
                       </svg>`,
            country: `<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" fill="none">
                        <circle cx="12" cy="12" r="9"/>
                        <path d="M2 12L22 12"/>
                        <path d="M12 2C9 6 9 18 12 22"/>
                        <path d="M12 2C15 6 15 18 12 22"/>
                      </svg>`
        };
        
        if (type === 'category' && category) {
            return icons.airplane;
        }
        
        return icons[type] || icons.weight;
    }
    
    getHTML(data) {
        let titleIcon = this.getDetailIcon('category', data.category);
        
        // Генерация списка стран
        const countriesList = data.countries.map(country => 
            `<div class="country-item">${this.getDetailIcon('country')} ${country}</div>`
        ).join('');
        
        // Генерация карточек самолетов
        const aircraftsList = data.aircrafts.map(aircraft => `
            <div class="aircraft-card">
                <div class="aircraft-name"> ${aircraft.name}</div>
                <div class="aircraft-capacity">Груз ${aircraft.capacity}</div>
                <div class="aircraft-range">Дальность: ${aircraft.range}</div>
            </div>
        `).join('');
        
        return `
            <div class="row">
                <div class="col-md-5">
                    <!-- ↓↓↓ СЮДА ВСТАВЬТЕ СВОЕ ФОТО ДЛЯ КАЖДОЙ ЗОНЫ ↓↓↓ -->
                    <img src="${data.image}" class="detail-image" alt="${data.title}">
                </div>
                <div class="col-md-7">
                    <div class="detail-title">
                        <span class="detail-title-icon">${titleIcon}</span>
                        ${data.title}
                    </div>
                    <div class="detail-price">от ${data.price} ₽ <small style="font-size: 14px;">/${data.unit || 'кг'}</small></div>
                    <p style="color: var(--gray); line-height: 1.6; margin-bottom: 20px;">${data.fullDesc}</p>
                    
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
                            <span class="detail-info-label">${this.getDetailIcon('insurance')} Страхование:</span>
                            <span class="detail-info-value">${data.insurance}</span>
                        </div>
                        <div class="detail-info-item">
                            <span class="detail-info-label">${this.getDetailIcon('features')} Особенности:</span>
                            <span class="detail-info-value">${data.features}</span>
                        </div>
                    </div>
                    
                    <!-- Блок стран -->
                    <div style="margin-top: 20px;">
                        <div style="font-weight: 600; color: var(--purple); margin-bottom: 10px; display: flex; align-items: center; gap: 8px; margin-left: -8px;"">
                            ${this.getDetailIcon('country')}Страны доставки:
                        </div>
                        <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px;">
                            ${countriesList}
                        </div>
                    </div>
                    
                    <!-- Блок самолетов -->
                    <div style="margin-top: 20px;">
                        <div style="font-weight: 600; color: var(--purple); margin-bottom: 10px; display: flex; align-items: center; gap: 8px;">
                            Рекомендуемые типы воздушных судов:
                        </div>
                        <div style="display: flex; flex-wrap: wrap; gap: 12px;">
                            ${aircraftsList}
                        </div>
                    </div>
                    
                    <button class="btn-order" id="order-btn" style="margin-top: 25px;">Оставить заявку</button>
                </div>
            </div>
        `;
    }
    
    addListeners(data, toastCallback) {
        const orderBtn = document.getElementById('order-btn');
        if (orderBtn) {
            orderBtn.addEventListener('click', () => {
                toastCallback(`Заявка на доставку по зоне "${data.title}" отправлена. Менеджер свяжется с вами.`, "Заявка отправлена");
            });
        }
    }
    
    render(data, toastCallback) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data, toastCallback);
    }
}