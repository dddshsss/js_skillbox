// 1. Исходные данные (как на скриншоте)
const books = [
    "Мастер и Маргарита",
    "Гарри Поттер",
    "За пропастью во ржи",
    "Властелин колец",
    "Дюна",
    "Отцы и дети"
];

// 2. Находим элементы в HTML
const listElement = document.getElementById('book-list');
const addButton = document.getElementById('add-btn');
const searchButton = document.getElementById('search-btn');

// 3. Функция отрисовки (отображения) списка
function renderList() {
    // Очищаем список перед обновлением
    listElement.innerHTML = '';

    // Проходим по массиву циклом
    for (let i = 0; i < books.length; i++) {
        const li = document.createElement('li');
        
        // Формируем текст: (индекс + 1) + скобка + название
        li.textContent = `${i + 1}) ${books[i]}`;
        
        // Добавляем в ul
        listElement.appendChild(li);
    }
}

// 4. Обработчик кнопки "Добавить книгу"
addButton.addEventListener('click', function() {
    const title = prompt('Введите название книги:');

    // Проверка: не null (отмена) и не пустая строка
    if (title && title.trim() !== '') {
        books.push(title.trim());
        renderList(); // Перерисовываем список
    } else {
        alert('Название книги не введено!');
    }
});

// 5. Обработчик кнопки "Найти"
searchButton.addEventListener('click', function() {
    const searchTitle = prompt('Введите название книги для поиска:');

    // Сначала убираем старую подсветку со всех элементов
    const allItems = document.querySelectorAll('.book-list li');
    for (let item of allItems) {
        item.classList.remove('highlight');
    }

    if (searchTitle && searchTitle.trim() !== '') {
        // Ищем индекс книги (сравниваем в нижнем регистре, чтобы "дюна" нашла "Дюна")
        const foundIndex = books.findIndex(book => 
            book.toLowerCase() === searchTitle.trim().toLowerCase()
        );

        if (foundIndex !== -1) {
            // Если нашли — добавляем класс highlight нужному элементу li
            allItems[foundIndex].classList.add('highlight');
            
            // (Опционально) Прокручиваем к найденному элементу
            allItems[foundIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            alert('Книга не найдена!');
        }
    } else {
         // Если нажали ОК на пустом поле, можно тоже вывести ошибку или ничего не делать
         if (searchTitle !== null) {
             alert('Книга не найдена!');
         }
    }
});

// Запускаем отрисовку при загрузке страницы
renderList();