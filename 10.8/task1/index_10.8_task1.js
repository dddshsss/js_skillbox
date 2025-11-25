// 1. Находим все миниатюры
const thumbnails = document.querySelectorAll('.thumb');

// 2. Находим элементы большого блока
const fullImage = document.getElementById('full-image');
const placeholderText = document.getElementById('placeholder-text');

// 3. Перебираем каждую миниатюру и вешаем обработчик клика
thumbnails.forEach((thumb) => {
    thumb.addEventListener('click', (event) => {
        
        // Получаем ссылку (src) из элемента, по которому кликнули
        const clickedSrc = event.target.src;
        
        // Устанавливаем этот src большому изображению
        fullImage.src = clickedSrc;
        
        // Показываем картинку и скрываем текст-заглушку
        fullImage.style.display = 'block';
        placeholderText.style.display = 'none';
    });
});
