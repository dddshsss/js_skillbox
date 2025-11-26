// 1. Исходный массив с ценами
const prices = [100, 500, 250, 750, 300];

// Получаем элементы из HTML по их ID
const listElement = document.getElementById('price-list');
const sortAscBtn = document.getElementById('sort-asc-btn');
const sortDescBtn = document.getElementById('sort-desc-btn');

// 2. Функция для отображения цен на странице
function renderPrices() {
    // Очищаем текущий список перед отрисовкой, чтобы данные не дублировались
    listElement.innerHTML = '';

    // Проходим по массиву и создаем элементы <li>
    prices.forEach(function(price) {
        const newLi = document.createElement('li');
        newLi.textContent = price;
        listElement.appendChild(newLi);
    });
}

// 3. Функции сортировки

// Сортировка по возрастанию (от меньшего к большему)
function sortPricesAsc() {
    prices.sort(function(a, b) {
        return a - b;
    });
    // Обновляем отображение
    renderPrices();
}

// Сортировка по убыванию (от большего к меньшему)
function sortPricesDesc() {
    prices.sort(function(a, b) {
        return b - a;
    });
    // Обновляем отображение
    renderPrices();
}

// 4. Обработчики событий (при клике вызываем функции сортировки)
sortAscBtn.addEventListener('click', sortPricesAsc);
sortDescBtn.addEventListener('click', sortPricesDesc);

// Первоначальный вызов функции, чтобы отобразить список при загрузке
renderPrices();