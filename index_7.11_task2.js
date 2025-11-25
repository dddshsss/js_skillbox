// 1. Исходный массив роста (как на скриншоте)
const heights = [164, 157, 160, 143, 170];

// 2. Получаем элементы DOM
const listElement = document.getElementById('heightList');
const addBtn = document.getElementById('addBtn');
const filterBtn = document.getElementById('filterBtn');

// 3. Функция отрисовки списка
// Она принимает массив arr как аргумент, чтобы мы могли рисовать
// либо полный список, либо отфильтрованный.
function renderList(arr) {
    listElement.innerHTML = ''; // Очищаем текущий список

    arr.forEach((item, index) => {
        const li = document.createElement('li');
        // Формат вывода: "1) 164"
        li.textContent = `${index + 1}) ${item}`;
        listElement.appendChild(li);
    });
}

// 4. Логика добавления роста
addBtn.addEventListener('click', () => {
    const input = prompt('Введите рост ученика:');

    // Проверка: пользователь не нажал Отмена и ввел не пустую строку
    if (input && input.trim() !== "") {
        // Преобразуем строку в число и добавляем в массив
        heights.push(Number(input));
        
        // Перерисовываем ВЕСЬ список (сбрасываем фильтр, если он был)
        renderList(heights);
    } else {
        alert('Рост не введён!');
    }
});

// 5. Логика фильтрации
filterBtn.addEventListener('click', () => {
    const minHeightInput = prompt('Введите минимальный рост для фильтрации:');

    // Если ввели значение (не пусто и не нажали отмена)
    if (minHeightInput && minHeightInput.trim() !== "") {
        const minHeight = Number(minHeightInput);

        // Создаем новый массив, в котором только те, кто выше или равен minHeight
        const filteredHeights = heights.filter(height => height >= minHeight);

        // Рисуем отфильтрованный список
        renderList(filteredHeights);
    } else {
        // Если пользователь ничего не ввел (нажал ОК на пустом или Отмена),
        // показываем полный список
        renderList(heights);
    }
});

// Первичная отрисовка при загрузке страницы
renderList(heights);