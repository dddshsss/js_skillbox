// 1. Исходный массив товаров
// Можно задать их в любом порядке, скрипт их отсортирует при первом запуске
const products = [
    "Яблоки",
    "Арбуз",
    "Молоко",
    "Сахар",
    "Книга",
    "Кофе",
    "Макароны"
];

// 2. Получаем элементы
const listElement = document.getElementById('cartList');
const addBtn = document.getElementById('addBtn');

// 3. Функция отрисовки списка
function renderCart() {
    // Сначала сортируем массив по алфавиту
    // Метод sort() меняет порядок элементов внутри массива products
    products.sort();

    // Очищаем HTML списка перед отрисовкой
    listElement.innerHTML = '';

    // Проходим по отсортированному массиву
    products.forEach((product, index) => {
        const li = document.createElement('li');
        // Формируем текст: "1) Арбуз"
        li.textContent = `${index + 1}) ${product}`;
        listElement.appendChild(li);
    });
}

// 4. Логика добавления товара
addBtn.addEventListener('click', () => {
    const newProduct = prompt('Введите название товара:');

    // Проверка: пользователь не нажал "Отмена" и строка не пустая
    if (newProduct && newProduct.trim() !== "") {
        // Добавляем товар в массив
        products.push(newProduct.trim());
        
        // Запускаем отрисовку (она сама отсортирует массив заново)
        renderCart();
    } else {
        alert('Название товара не введено!');
    }
});

renderCart();