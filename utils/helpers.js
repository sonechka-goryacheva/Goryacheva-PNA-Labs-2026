export function isEqualTariffZone(zone1, zone2) {
    return zone1.title === zone2.title &&
           zone1.price === zone2.price &&
           zone1.maxWeight === zone2.maxWeight &&
           zone1.deliveryTime === zone2.deliveryTime;
}

export function getExcludedZones(allZones, filteredZones) {
    const filteredIds = new Set(filteredZones.map(zone => zone.id));
    return allZones.filter(zone => !filteredIds.has(zone.id));
}

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

// Маппинг данных из API (/rate-zones) в формат, который ожидают наши компоненты.
// Формат бэкенда уже совпадает с нашим, но мы задаём значения по умолчанию,
// чтобы карточки и детальная страница не падали с ошибкой при отсутствии поля.
export function mapRateZone(zone) {
    if (!zone) return null;

    return {
        id: zone.id,
        title: zone.title || 'Без названия',
        shortDesc: zone.shortDesc || zone.description || '',
        fullDesc: zone.fullDesc || zone.description || zone.shortDesc || 'Описание уточняется.',
        // На бэкенде путь к картинке вида "/public/assets/Europe.png", а сервер
        // статику не раздаёт. Берём только имя файла — тогда подхватятся картинки,
        // лежащие рядом с index.html (Europe.png, Azia.png и т.д.).
        image: zone.image ? zone.image.split('/').pop() : '',
        // price приводим к строке, т.к. в шаблоне используется как текст.
        price: zone.price != null ? String(zone.price) : '0',
        unit: zone.unit || 'кг',
        maxWeight: zone.maxWeight || 'не указан',
        deliveryTime: zone.deliveryTime || 'уточняется',
        zone: zone.zone || zone.title || '',
        insurance: zone.insurance || 'Включено',
        features: zone.features || 'Регулярные рейсы',
        category: zone.category || 'Тарифная зона',
        countries: Array.isArray(zone.countries) && zone.countries.length
            ? zone.countries
            : ['Уточняется у менеджера'],
        aircrafts: Array.isArray(zone.aircrafts) && zone.aircrafts.length
            ? zone.aircrafts
            : [{ name: 'Boeing 737-800F', capacity: 'до 23 тонн', range: '3,600 км' }]
    };
}