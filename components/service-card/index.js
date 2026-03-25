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

            // Милый котик с ушками для перевозки животных
            'Спецгруз': `<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" fill="none">
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
            // Снежинка для скоропортящихся продуктов
            'Термо': `<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" fill="none">
                        <path d="M12 4V20M12 4L9 7M12 4L15 7M12 20L9 17M12 20L15 17"/>
                        <path d="M5 12L19 12M5 12L8 9M5 12L8 15M19 12L16 9M19 12L16 15"/>
                        <path d="M7 7L17 17M7 17L17 7"/>
                      </svg>`,
            // Грузовик для авто
            'Авто': `<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" fill="none">
                        <path d="M4 12L20 12L18 6H6L4 12Z"/>
                        <circle cx="7" cy="16" r="2"/>
                        <circle cx="17" cy="16" r="2"/>
                     </svg>`
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
                        <button class="delete-card-btn" data-id="${data.id}" title="Удалить карточку">
                            🗑️
                        </button>
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
                    <button class="card-btn" data-id="${data.id}">
                        Подробнее
                        <span class="btn-arrow">→</span>
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
        
        const deleteBtn = document.querySelector(`.delete-card-btn[data-id="${data.id}"]`);
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
                    !e.target.classList.contains('delete-card-btn')) {
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