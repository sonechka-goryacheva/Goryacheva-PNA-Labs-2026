// modules/rateZoneUrls.js
// Адреса (URL) для обращения к РЕАЛЬНОМУ бэкенду из 4-й лабораторной.
// ВАЖНО: порт 3001 и эндпоинт /rate-zones (НЕ 3000 и НЕ /stocks из методички!).
//
// Бэкенд уже использует middleware cors(), поэтому запросы проходят и без
// расширения. Если CORS всё же блокирует — включите расширение "CORS Unblock".

export class RateZoneUrls {
    constructor() {
        // Базовый адрес бэкенда (Express, порт 3001).
        this.baseUrl = 'http://localhost:3001';
    }

    // GET /rate-zones — получить все тарифные зоны.
    getRateZones() {
        return `${this.baseUrl}/rate-zones`;
    }

    // GET /rate-zones?price=... — фильтрация по цене (числовой query-параметр).
    getRateZonesFiltered(price) {
        return `${this.baseUrl}/rate-zones?price=${encodeURIComponent(price)}`;
    }

    // GET /rate-zones/:id — получить одну зону по идентификатору.
    getRateZoneById(id) {
        return `${this.baseUrl}/rate-zones/${id}`;
    }

    // DELETE /rate-zones/:id — удалить зону по идентификатору.
    deleteRateZoneById(id) {
        return `${this.baseUrl}/rate-zones/${id}`;
    }
}
