window.onload = function() {
    // --- получение ссылок на элементы HTML ---
    const resultDisplay = document.getElementById("result");
    const allButtons = document.querySelectorAll('.my-btn');

    // ---  переменные состояния калькулятора ---
    let currentInput = "";
    let previousValue = 0;
    let currentOperator = null;
    let memoryValue = 0;

    // --- вспомогательные математические функции ---
    const add = (a, b) => a + b;
    const subtract = (a, b) => a - b;
    const multiply = (a, b) => a * b;
    const divide = (a, b) => (b !== 0 ? a / b : "Ошибка: деление на 0");
    const changeSign = (val) => val * -1;
    const getPercent = (val) => val / 100;
    const getSquareRoot = (val) => val >= 0 ? Math.sqrt(val) : "Ошибка: корень из отрицательного";
    const getSquare = (val) => val * val;
    const getFactorial = (val) => {
        if (val < 0) return "Ошибка: факториал отрицательного";
        if (val > 170) return "Ошибка: слишком большое число";
        if (!Number.isInteger(val)) return "Ошибка: факториал только для целых чисел";
        let result = 1;
        for (let i = 2; i <= val; i++) {
            result *= i;
        }
        return result;
    };
    const addThreeZeros = (val) => {
        let strVal = val.toString();
        if (strVal.includes('.')) {
            return strVal + "000";
        } else {
            return strVal + "000";
        }
    };

    /**
     * ИНДИВИДУАЛЬНАЯ ФУНКЦИЯ: Нормальное распределение веса груза
     * 
     * Формула расчета реального веса груза с учетом нормального распределения:
     * Реальный вес = Заявленный вес × (1 + коэффициент_распределения)
     * 
     * Коэффициент распределения зависит от веса:
     * - Для веса до 50 кг: коэффициент = 0.05 (5% погрешность)
     * - Для веса 50-100 кг: коэффициент = 0.03 (3% погрешность)
     * - Для веса 100-500 кг: коэффициент = 0.02 (2% погрешность)
     * - Для веса свыше 500 кг: коэффициент = 0.01 (1% погрешность)
     * 
     * @param {number} weight - заявленный вес груза в кг
     * @returns {number} - реальный вес груза с учетом нормального распределения
     */
    const calculateNormalDistribution = (weight) => {
        // Проверка входных данных
        if (isNaN(weight) || weight <= 0) {
            return null;
        }
        
        // определяем коэффициент нормального распределения в зависимости от веса
        let distributionCoefficient;
        if (weight <= 50) {
            distributionCoefficient = 0.05;  // 5% для малых грузов
        } else if (weight <= 100) {
            distributionCoefficient = 0.03;  // 3% для средних грузов
        } else if (weight <= 500) {
            distributionCoefficient = 0.02;  // 2% для крупных грузов
        } else {
            distributionCoefficient = 0.01;  // 1% для очень крупных грузов
        }
        
        // формула веса с учетом нормального распредления: реальный вес = заявленный вес × (1 + коэффициент)
        let realWeight = weight * (1 + distributionCoefficient);
        
        // округляем до 2 знаков после запятой
        realWeight = Math.round(realWeight * 100) / 100;
        
        return realWeight;
    };
    
    // функция для отображения результата
    const showNormalDistributionResult = () => {
        // получаем текущее значение с дисплея
        let inputValue = currentInput !== "" ? parseFloat(currentInput) : parseFloat(resultDisplay.innerText);
        
        if (isNaN(inputValue) || inputValue <= 0) {
            const previousDisplay = resultDisplay.innerText;
            resultDisplay.innerText = "Ошибка: введите вес";
            resultDisplay.style.fontSize = "1rem";
            
            setTimeout(() => {
                resultDisplay.innerText = previousDisplay;
                resultDisplay.style.fontSize = "2rem";
            }, 2000);
            return;
        }
        
        // вычисляем результат
        const realWeight = calculateNormalDistribution(inputValue);
        
        if (realWeight === null) {
            const previousDisplay = resultDisplay.innerText;
            resultDisplay.innerText = "Ошибка: некорректный вес";
            resultDisplay.style.fontSize = "1rem";
            
            setTimeout(() => {
                resultDisplay.innerText = previousDisplay;
                resultDisplay.style.fontSize = "2rem";
            }, 2000);
            return;
        }
        
        // сохраняем текущее значение дисплея
        const previousDisplay = resultDisplay.innerText;
        const previousFontSize = resultDisplay.style.fontSize;
        
        // отображаем результат
        resultDisplay.innerText = realWeight;
        resultDisplay.style.fontSize = "1.5rem";
        
        // Через 2 секунды возвращаем предыдущее значение
        setTimeout(() => {
            resultDisplay.innerText = previousDisplay;
            resultDisplay.style.fontSize = previousFontSize || "2rem";
        }, 2000);
    };

    // ---  логика обработки нажатий на кнопки ---
    allButtons.forEach(button => {
        button.addEventListener('click', () => {
            const buttonId = button.id;
            const buttonText = button.innerText;

            // --- ФУНКЦИЯ: нормальное распределение ---
            if (buttonId === 'btn_op_normal_distribution') {
                showNormalDistributionResult();
                return;
            }
            
            // --- обработка цифр (0-9) и точки ---
            if (buttonId.startsWith('btn_digit_') || buttonId === 'btn_digit_dot') {
                // если на дисплее результат функции, очищаем перед вводом
                if (resultDisplay.innerText !== "0" && !resultDisplay.innerText.includes('Ошибка') && 
                    resultDisplay.innerText !== previousValue.toString() && currentInput === "") {
                    
                }
                
                if (buttonText === '.') {
                    if (!currentInput.includes('.')) {
                        if (currentInput === "") {
                            currentInput = "0.";
                        } else {
                            currentInput += ".";
                        }
                    }
                } else {
                    currentInput += buttonText;
                }
                resultDisplay.innerText = currentInput;
            }
            // --- обработка операторов (+, -, x, /) ---
            else if (buttonId === 'btn_op_plus' || buttonId === 'btn_op_minus' ||
                     buttonId === 'btn_op_mult' || buttonId === 'btn_op_div') {
                if (currentInput !== "") {
                    previousValue = parseFloat(currentInput);
                    currentOperator = buttonText;
                    currentInput = "";
                } else if (previousValue !== 0 && currentOperator !== null) {
                    currentOperator = buttonText;
                }
            }
            // --- кнопка "=" ---
            else if (buttonId === 'btn_op_equal') {
                if (currentOperator !== null && currentInput !== "") {
                    let result = 0;
                    const secondValue = parseFloat(currentInput);
                    switch (currentOperator) {
                        case '+':
                            result = add(previousValue, secondValue);
                            break;
                        case '-':
                            result = subtract(previousValue, secondValue);
                            break;
                        case 'x':
                            result = multiply(previousValue, secondValue);
                            break;
                        case '/':
                            result = divide(previousValue, secondValue);
                            break;
                        default:
                            result = secondValue;
                    }
                    
                    if (typeof result === 'string' && result.startsWith('Ошибка')) {
                        resultDisplay.innerText = result;
                        currentInput = "";
                        previousValue = 0;
                        currentOperator = null;
                        return;
                    }
                    
                    resultDisplay.innerText = result;
                    previousValue = result;
                    currentInput = result.toString();
                    currentOperator = null;
                }
            }
            // --- кнопка "C"  ---
            else if (buttonId === 'btn_op_clear') {
                currentInput = "";
                previousValue = 0;
                currentOperator = null;
                memoryValue = 0;
                resultDisplay.innerText = "0";
                resultDisplay.style.fontSize = "2rem";
            }
            // --- кнопка "+/-" ---
            else if (buttonId === 'btn_op_sign') {
                let valueToChange;
                if (currentInput !== "") {
                    valueToChange = parseFloat(currentInput);
                } else if (resultDisplay.innerText !== "0" && !resultDisplay.innerText.startsWith('Ошибка')) {
                    valueToChange = parseFloat(resultDisplay.innerText);
                } else {
                    return;
                }
                const result = changeSign(valueToChange);
                currentInput = result.toString();
                resultDisplay.innerText = currentInput;
            }
            // --- кнопка "%"  ---
            else if (buttonId === 'btn_op_percent') {
                let valueToChange;
                if (currentInput !== "") {
                    valueToChange = parseFloat(currentInput);
                } else if (resultDisplay.innerText !== "0" && !resultDisplay.innerText.startsWith('Ошибка')) {
                    valueToChange = parseFloat(resultDisplay.innerText);
                } else {
                    return;
                }
                const result = getPercent(valueToChange);
                currentInput = result.toString();
                resultDisplay.innerText = currentInput;
            }
            // --- кнопка "del"  ---
            else if (buttonId === 'btn_op_backspace') {
                if (currentInput !== "") {
                    currentInput = currentInput.slice(0, -1);
                    if (currentInput === "") {
                        resultDisplay.innerText = "0";
                    } else {
                        resultDisplay.innerText = currentInput;
                    }
                }
            }
            // --- Кнопка квадратный корень ---
            else if (buttonId === 'btn_op_sqrt') {
                let valueToCompute;
                if (currentInput !== "") {
                    valueToCompute = parseFloat(currentInput);
                } else if (resultDisplay.innerText !== "0" && !resultDisplay.innerText.startsWith('Ошибка')) {
                    valueToCompute = parseFloat(resultDisplay.innerText);
                } else {
                    return;
                }
                const result = getSquareRoot(valueToCompute);
                if (typeof result === 'string' && result.startsWith('Ошибка')) {
                    resultDisplay.innerText = result;
                    currentInput = "";
                } else {
                    currentInput = result.toString();
                    resultDisplay.innerText = currentInput;
                }
            }
            // --- кнопка возведение в квадрат ---
            else if (buttonId === 'btn_op_square') {
                let valueToCompute;
                if (currentInput !== "") {
                    valueToCompute = parseFloat(currentInput);
                } else if (resultDisplay.innerText !== "0" && !resultDisplay.innerText.startsWith('Ошибка')) {
                    valueToCompute = parseFloat(resultDisplay.innerText);
                } else {
                    return;
                }
                const result = getSquare(valueToCompute);
                currentInput = result.toString();
                resultDisplay.innerText = currentInput;
            }
            // --- кнопка факториал  ---
            else if (buttonId === 'btn_op_factorial') {
                let valueToCompute;
                if (currentInput !== "") {
                    valueToCompute = parseFloat(currentInput);
                } else if (resultDisplay.innerText !== "0" && !resultDisplay.innerText.startsWith('Ошибка')) {
                    valueToCompute = parseFloat(resultDisplay.innerText);
                } else {
                    return;
                }
                const result = getFactorial(valueToCompute);
                if (typeof result === 'string' && result.startsWith('Ошибка')) {
                    resultDisplay.innerText = result;
                    currentInput = "";
                } else {
                    currentInput = result.toString();
                    resultDisplay.innerText = currentInput;
                }
            }
            // --- кнопка три нуля ---
            else if (buttonId === 'btn_op_three_zeros') {
                let valueToModify;
                if (currentInput !== "") {
                    valueToModify = parseFloat(currentInput);
                } else if (resultDisplay.innerText !== "0" && !resultDisplay.innerText.startsWith('Ошибка')) {
                    valueToModify = parseFloat(resultDisplay.innerText);
                } else {
                    valueToModify = 0;
                }
                const result = addThreeZeros(valueToModify);
                currentInput = result;
                resultDisplay.innerText = currentInput;
            }
            // --- функции памяти ---
            else if (buttonId === 'btn_op_memory_add') {
                let valueToAdd;
                if (currentInput !== "") {
                    valueToAdd = parseFloat(currentInput);
                } else if (resultDisplay.innerText !== "0" && !resultDisplay.innerText.startsWith('Ошибка')) {
                    valueToAdd = parseFloat(resultDisplay.innerText);
                } else {
                    return;
                }
                memoryValue = add(memoryValue, valueToAdd);
            }
            else if (buttonId === 'btn_op_memory_subtract') {
                let valueToSubtract;
                if (currentInput !== "") {
                    valueToSubtract = parseFloat(currentInput);
                } else if (resultDisplay.innerText !== "0" && !resultDisplay.innerText.startsWith('Ошибка')) {
                    valueToSubtract = parseFloat(resultDisplay.innerText);
                } else {
                    return;
                }
                memoryValue = subtract(memoryValue, valueToSubtract);
            }
            else if (buttonId === 'btn_op_memory_recall') {
                if (memoryValue !== 0) {
                    currentInput = memoryValue.toString();
                    resultDisplay.innerText = currentInput;
                }
            }
            else if (buttonId === 'btn_op_memory_clear') {
                memoryValue = 0;
            }
        });
    });

    // --- логика смены темы ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
        });
    }
};