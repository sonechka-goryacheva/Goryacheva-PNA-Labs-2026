// ============================================
// Домашнее задание. Часть 1
// Вариант: фамилия Г (2.4), группа 1 (3.1), имя С (1.7, 1.9)
// Тема: Расчет стоимости авиаперевозки грузов
// ============================================

// --------------------------------------------------
// Задание 1.7 (1 уровень) - isEqualTariffZone
// Сравнивает две тарифные зоны
// --------------------------------------------------
export function isEqualTariffZone(zone1, zone2) {
    return zone1.title === zone2.title &&
           zone1.price === zone2.price &&
           zone1.maxWeight === zone2.maxWeight &&
           zone1.deliveryTime === zone2.deliveryTime;
}

// --------------------------------------------------
// Задание 1.9 (1 уровень) - createTemplateZones
// Создает массив шаблонных зон (цикл while)
// --------------------------------------------------
export function createTemplateZones(size, templateData) {
    const result = [];
    let i = 0;
    while (i < size) {
        result.push({ ...templateData, id: Date.now() + i });
        i++;
    }
    return result;
}

// --------------------------------------------------
// Задание 2.4 (2 уровень) - getExcludedZones
// Возвращает зоны, которых нет во втором массиве
// --------------------------------------------------
export function getExcludedZones(allZones, filteredZones) {
    const filteredIds = new Set(filteredZones.map(zone => zone.id));
    return allZones.filter(zone => !filteredIds.has(zone.id));
}

// --------------------------------------------------
// Задание 3.1 (3 уровень) - mergeTariffData
// Объединяет объекты, оставляя первые значения
// --------------------------------------------------
export function mergeTariffData(...objects) {
    const result = {};
    for (const obj of objects) {
        for (const key in obj) {
            if (!(key in result)) {
                result[key] = obj[key];
            }
        }
    }
    return result;
}