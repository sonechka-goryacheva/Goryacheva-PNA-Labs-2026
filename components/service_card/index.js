export class ServiceCardComponent {
    constructor(parent) {
        this.parent = parent;
    }
    
    getIcon(category) {
        const icons = {
            // Самолет для авиадоставки
            'Авиа': `<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" fill="none">
                        <path d="M12 2L12 7M12 2L9 5M12 2L15 5"/>
                        <path d="M5 12L19 12"/>
                        <path d="M3 17L21 17"/>
                        <path d="M8 7L16 7"/>
                        <path d="M6 12L4 17"/>
                        <path d="M18 12L20 17"/>
                     </svg>`,
            // Часы для экспресс
            'Экспресс': `<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" fill="none">
                            <circle cx="12" cy="12" r="9"/>
                            <polyline points="12 7 12 12 15 15"/>
                         </svg>`,
            // Документ для таможни
            'Документы': `<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" fill="none">
                            <path d="M4 4H20V20H4V4Z"/>
                            <path d="M8 7H16"/>
                            <path d="M8 11H16"/>
                            <path d="M8 15H12"/>
                         </svg>`,


        };
        return icons[category] || icons['Авиа'];
    }
    
    getFeatureIcon(type) {
        const icons = {
            weight: `<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" fill="none">
                        <circle cx="12" cy="12" r="9"/>
                        <path d="M12 8L12 12L15 15"/>
                     </svg>`,
            time: `<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" fill="none">
                     <circle cx="12" cy="12" r="9"/>
                     <polyline points="12 7 12 12 15 15"/>
                   </svg>`
        };
        return icons[type];
    }
    
    getHTML(data) {
        return `
            <div class="col-md-4 col-sm-6 mb-4">
                <div class="modern-card" data-id="${data.id}">
                    <div class="card-header-actions">
                        <div class="card-icon">
                            ${this.getIcon(data.category)}
                        </div>
                    </div>
                    <div class="card-category">${data.category}</div>
                    <h3 class="card-title">${data.title}</h3>
                    <p class="card-description">${data.shortDesc}</p>
                    <div class="card-features">
                        <div class="feature">
                            <span class="feature-icon">${this.getFeatureIcon('weight')}</span>
                            <span>${data.maxWeight}</span>
                        </div>
                        <div class="feature">
                            <span class="feature-icon">${this.getFeatureIcon('time')}</span>
                            <span>${data.deliveryTime}</span>
                        </div>
                    </div>
                    <div class="card-price">
                        от ${data.price} ₽
                        <small>/${data.unit}</small>
                    </div>
                <div style="display: flex; gap: 10px; margin-top: auto;">
                    <button class="card-btn" data-id="${data.id}" style=flex: 1;">
                        Подробнее
                        <span class="btn-arrow">→</span>
                    </button>
                    <button class="card-btn-delete" data-id="${data.id}" style="flex: 1;">
                        Удалить
                    </button>
                </div>
            </div>
        `;
    }
    
    addListeners(data, clickListener, deleteListener) {
        const button = document.querySelector(`.card-btn[data-id="${data.id}"]`);
        if (button) {
            button.addEventListener("click", (e) => {
                e.stopPropagation();
                clickListener(data.id);
            });
        }
        
        const deleteBtn = document.querySelector(`.card-btn-delete[data-id="${data.id}"]`);
        if (deleteBtn) {
            deleteBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                deleteListener(data.id);
            });
        }
        
        const card = document.querySelector(`.modern-card[data-id="${data.id}"]`);
        if (card) {
            card.addEventListener("click", (e) => {
                if (!e.target.classList.contains('card-btn') && 
                    !e.target.classList.contains('card-btn-delete')) {
                    clickListener(data.id);
                }
            });
        }
    }
    
    render(data, clickListener, deleteListener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data, clickListener, deleteListener);
    }
}