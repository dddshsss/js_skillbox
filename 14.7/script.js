// --- ПЕРЕМЕННЫЕ И ЭЛЕМЕНТЫ DOM ---
const titleInput = document.getElementById('title');
const genreInput = document.getElementById('genre');
const yearInput = document.getElementById('year');
const isWatchedInput = document.getElementById('isWatched');

const addBtn = document.getElementById('add-btn');
const updateBtn = document.getElementById('update-btn');
const cancelBtn = document.getElementById('cancel-btn');
const errorMsg = document.getElementById('error-msg');

const moviesList = document.getElementById('movies-list');
const sortSelect = document.getElementById('sort-select');
const sortBtn = document.getElementById('sort-btn');

// Хранилище фильмов (массив объектов)
// Загружаем из LocalStorage или создаем пустой массив
let movies = JSON.parse(localStorage.getItem('movies')) || [];

// Переменная для хранения ID редактируемого фильма
let editingId = null;

// --- ИНИЦИАЛИЗАЦИЯ ---
// При загрузке страницы отображаем таблицу
document.addEventListener('DOMContentLoaded', renderTable);

// --- ФУНКЦИИ ---

// 1. Функция сохранения в LocalStorage
function saveToLocalStorage() {
    localStorage.setItem('movies', JSON.stringify(movies));
}

// 2. Функция отрисовки таблицы
function renderTable() {
    moviesList.innerHTML = ''; // Очищаем таблицу перед перерисовкой

    movies.forEach(movie => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${movie.title}</td>
            <td>${movie.genre}</td>
            <td>${movie.year}</td>
            <td>${movie.isWatched ? 'Да' : 'Нет'}</td>
            <td>
                <button class="action-btn" onclick="editMovie(${movie.id})">Редактировать</button>
                <button class="action-btn" onclick="deleteMovie(${movie.id})">Удалить</button>
            </td>
        `;

        moviesList.appendChild(tr);
    });
}

// 3. Функция валидации
function validateForm() {
    const title = titleInput.value.trim();
    const genre = genreInput.value.trim();
    const year = yearInput.value.trim();

    if (!title || !genre || !year) {
        errorMsg.textContent = 'Пожалуйста, заполните все поля (Название, Жанр, Год).';
        errorMsg.style.display = 'block';
        return false;
    }

    errorMsg.style.display = 'none';
    return true;
}

// 4. Добавление фильма
addBtn.addEventListener('click', () => {
    if (!validateForm()) return;

    const newMovie = {
        id: Date.now(), // Уникальный ID на основе времени
        title: titleInput.value.trim(),
        genre: genreInput.value.trim(),
        year: yearInput.value.trim(),
        isWatched: isWatchedInput.checked
    };

    movies.push(newMovie);
    saveToLocalStorage();
    renderTable();
    resetForm();
});

// 5. Удаление фильма
// (Функция вызывается из HTML атрибута onclick)
window.deleteMovie = function(id) {
    // Фильтруем массив, оставляя только те фильмы, ID которых НЕ совпадает с удаляемым
    movies = movies.filter(movie => movie.id !== id);
    saveToLocalStorage();
    renderTable();

    // Если мы удалили фильм, который редактировали в данный момент
    if (editingId === id) {
        resetEditMode();
    }
};

// 6. Начало редактирования
window.editMovie = function(id) {
    // Находим фильм по ID
    const movie = movies.find(m => m.id === id);
    if (!movie) return;

    // Заполняем форму данными
    titleInput.value = movie.title;
    genreInput.value = movie.genre;
    yearInput.value = movie.year;
    isWatchedInput.checked = movie.isWatched;

    // Запоминаем ID редактируемого фильма
    editingId = id;

    // Переключаем кнопки
    addBtn.classList.add('hidden');
    updateBtn.classList.remove('hidden');
    cancelBtn.classList.remove('hidden');
    
    // Убираем сообщение об ошибке, если было
    errorMsg.style.display = 'none';
};

// 7. Обновление фильма (сохранение изменений)
updateBtn.addEventListener('click', () => {
    if (!validateForm()) return;

    // Находим индекс редактируемого фильма в массиве
    const index = movies.findIndex(m => m.id === editingId);

    if (index !== -1) {
        // Обновляем поля
        movies[index].title = titleInput.value.trim();
        movies[index].genre = genreInput.value.trim();
        movies[index].year = yearInput.value.trim();
        movies[index].isWatched = isWatchedInput.checked;

        saveToLocalStorage();
        renderTable();
        resetEditMode(); // Выход из режима редактирования
    }
});

// 8. Отмена редактирования
cancelBtn.addEventListener('click', resetEditMode);

function resetEditMode() {
    editingId = null;
    resetForm();
    
    // Возвращаем кнопки в исходное состояние
    addBtn.classList.remove('hidden');
    updateBtn.classList.add('hidden');
    cancelBtn.classList.add('hidden');
    errorMsg.style.display = 'none';
}

// Очистка полей формы
function resetForm() {
    titleInput.value = '';
    genreInput.value = '';
    yearInput.value = '';
    isWatchedInput.checked = false;
}

// 9. Сортировка
sortBtn.addEventListener('click', () => {
    const criteria = sortSelect.value; // 'title', 'genre' или 'year'

    movies.sort((a, b) => {
        if (criteria === 'year') {
            // Сортировка чисел (год)
            return a.year - b.year;
        } else {
            // Сортировка строк (Название, Жанр)
            // localeCompare обеспечивает правильную сортировку для кириллицы
            return a[criteria].localeCompare(b[criteria]);
        }
    });

    saveToLocalStorage(); // Сохраняем отсортированный порядок (по желанию)
    renderTable();
});
