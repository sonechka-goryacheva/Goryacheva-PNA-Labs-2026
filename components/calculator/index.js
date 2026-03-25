export class CalculatorComponent {
    constructor(parent) {
        this.parent = parent;
    }
    
    getHTML() {
        return `
            <div class="calculator-title">
                Расчет стоимости авиаперевозки
            </div>
            <div class="row">
                <div class="col-md-3 mb-3">
                    <input type="text" class="form-control-custom" id="from-city" placeholder="Город отправления">
                </div>
                <div class="col-md-3 mb-3">
                    <input type="text" class="form-control-custom" id="to-city" placeholder="Город назначения">
                </div>
                <div class="col-md-2 mb-3">
                    <input type="number" class="form-control-custom" id="weight" placeholder="Вес (кг)" min="0" step="1">
                </div>
                <div class="col-md-2 mb-3">
                    <input type="number" class="form-control-custom" id="volume" placeholder="Объем (м³)" min="0" step="0.1">
                </div>
                <div class="col-md-2 mb-3">
                    <button class="btn-calculate" id="calculate-btn">Рассчитать</button>
                </div>
            </div>
            <div id="result-box" class="result-box" style="display: none;">
                <div class="result-price" id="result-price">0 ₽</div>
                <div style="font-size: 12px; color: var(--gray);">*ориентировочная стоимость</div>
            </div>
        `;
    }
    
    calculatePrice(weight, volume, from, to) {
        const baseRate = 150;
        let price = weight * baseRate;
        
        if (volume > 0) {
            price += volume * 500;
        }
        
        if (from && to) {
            price *= 1.2;
        }
        
        return Math.round(price);
    }
    
    addListeners(toastCallback) {
        const calculateBtn = document.getElementById('calculate-btn');
        const fromCity = document.getElementById('from-city');
        const toCity = document.getElementById('to-city');
        const weightInput = document.getElementById('weight');
        const volumeInput = document.getElementById('volume');
        const resultBox = document.getElementById('result-box');
        const resultPrice = document.getElementById('result-price');
        
        if (calculateBtn) {
            calculateBtn.addEventListener('click', () => {
                let weight = parseFloat(weightInput.value) || 0;
                let volume = parseFloat(volumeInput.value) || 0;
                const from = fromCity.value;
                const to = toCity.value;
                
                if (weight < 0) weight = 0;
                if (volume < 0) volume = 0;
                
                if (weight === 0 && volume === 0) {
                    toastCallback('Введите вес или объем груза', 'Ошибка');
                    return;
                }
                
                const price = this.calculatePrice(weight, volume, from, to);
                resultPrice.textContent = price.toLocaleString() + ' ₽';
                resultBox.style.display = 'block';
                
                toastCallback(`Стоимость перевозки: ${price.toLocaleString()} ₽`, 'Расчет выполнен');
            });
        }
    }
    
    render(toastCallback) {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(toastCallback);
    }
}