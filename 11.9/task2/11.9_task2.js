const form = document.getElementById('delivery-form');
const nameInput = document.getElementById('product-name');
const weightInput = document.getElementById('product-weight');
const distanceInput = document.getElementById('delivery-distance');
const tableBody = document.getElementById('table-body');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    resetErrors();

    let isValid = true;

    // 1. Валидация Названия
    const nameValue = nameInput.value.trim();
    if (nameValue === '') {
        showError(nameInput, 'error-name');
        isValid = false;
    }

    // 2. Валидация Веса
    const weightValue = parseFloat(weightInput.value);
    if (isNaN(weightValue) || weightValue <= 0) {
        showError(weightInput, 'error-weight');
        isValid = false;
    }

    // 3. Валидация Расстояния
    const distanceValue = parseFloat(distanceInput.value);
    if (isNaN(distanceValue) || distanceValue <= 0) {
        showError(distanceInput, 'error-distance');
        isValid = false;
    }

    if (!isValid) return;

    // Расчет стоимости: (вес * расстояние) / 10
    const cost = (weightValue * distanceValue) / 10;

    // Добавляем строку
    addTableRow(nameValue, weightValue, distanceValue, cost);

    // Очищаем форму
    form.reset();
});

function addTableRow(name, weight, distance, cost) {
    const row = document.createElement('tr');

    const nameCell = document.createElement('td');
    nameCell.textContent = name;

    const weightCell = document.createElement('td');
    weightCell.textContent = weight;

    const distanceCell = document.createElement('td');
    distanceCell.textContent = distance;

    const costCell = document.createElement('td');
    
    // ИЗМЕНЕНИЕ ЗДЕСЬ: добавляем " руб" после форматирования числа
    costCell.textContent = cost.toFixed(2) + ' руб'; 

    row.appendChild(nameCell);
    row.appendChild(weightCell);
    row.appendChild(distanceCell);
    row.appendChild(costCell);

    tableBody.appendChild(row);
}

function showError(inputElement, errorId) {
    inputElement.classList.add('error');
    document.getElementById(errorId).style.display = 'inline';
}

function resetErrors() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => input.classList.remove('error'));

    const errors = document.querySelectorAll('.error-message');
    errors.forEach(error => error.style.display = 'none');
}