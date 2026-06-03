// modules/ajax.js
// Класс для асинхронных XHR-запросов к REST API.
// ВАЖНО: для работы с бэкендом http://localhost:3000 нужно включить
// расширение браузера "CORS Unblock" (по условию задания CORS в коде не исправляется).
//
// Все методы асинхронные и работают через колбэк вида callback(error, data):
//   - при успехе:  callback(null, данные)
//   - при ошибке:  callback(объектОшибки, null)

export class Ajax {
    // Базовый метод. method — HTTP-метод (GET/POST/PUT/DELETE),
    // url — адрес запроса, body — тело (или null), callback — функция обратного вызова.
    request(method, url, body, callback) {
        const xhr = new XMLHttpRequest();

        // Третий аргумент true делает запрос асинхронным.
        xhr.open(method, url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        // Срабатывает при получении ответа от сервера.
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                let data = null;
                try {
                    // Пустой ответ (например, после DELETE) парсить не нужно.
                    data = xhr.responseText ? JSON.parse(xhr.responseText) : null;
                } catch (e) {
                    data = xhr.responseText;
                }
                callback(null, data);
            } else {
                // Сервер ответил, но статус не успешный.
                callback(new Error(`Ошибка запроса: HTTP ${xhr.status}`), null);
            }
        };

        // Срабатывает при сетевой ошибке (в т.ч. при заблокированном CORS).
        xhr.onerror = function () {
            callback(new Error('Сетевая ошибка. Проверьте, запущен ли бэкенд и включён ли CORS Unblock.'), null);
        };

        // Отправляем запрос. Для GET/DELETE тело отсутствует.
        xhr.send(body ? JSON.stringify(body) : null);
    }

    // GET-запрос.
    get(url, callback) {
        this.request('GET', url, null, callback);
    }

    // POST-запрос (понадобится в следующих лабораторных).
    post(url, body, callback) {
        this.request('POST', url, body, callback);
    }

    // PUT-запрос (понадобится в следующих лабораторных).
    put(url, body, callback) {
        this.request('PUT', url, body, callback);
    }

    // DELETE-запрос.
    delete(url, callback) {
        this.request('DELETE', url, null, callback);
    }
}
