import { addRecord } from '../localStorage.js';
import { navigate } from '../router.js';
import { generateUUID } from '../utils/helpers.js';
import { validateField, validateNumberField } from '../utils/validation.js';

export default function addItemPage() {
    const pageContainer = document.createElement('div');
    pageContainer.innerHTML = `
        <h1>Добавить запись</h1>
        <form id="add-item-form">
            <div class="form-group">
                <label for="name">Название:</label>
                <input type="text" id="name" name="name" required>
                <div class="error-message" id="name-error"></div>
            </div>
            <div class="form-group">
                <label for="shelf">Полка:</label>
                <input type="text" id="shelf" name="shelf" required>
                <div class="error-message" id="shelf-error"></div>
            </div>
            <div class="form-group">
                <label for="weight">Вес (кг):</label>
                <input type="number" id="weight" name="weight" step="0.01" required>
                <div class="error-message" id="weight-error"></div>
            </div>
            <div class="form-group">
                <label for="storageTime">Время хранения (дней):</label>
                <input type="number" id="storageTime" name="storageTime" required>
                <div class="error-message" id="storageTime-error"></div>
            </div>
            <div class="form-actions">
                <button type="submit" class="button">Добавить</button>
            </div>
        </form>
    `;

    const form = pageContainer.querySelector('#add-item-form');
    
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = form.elements.name.value;
        const shelf = form.elements.shelf.value;
        const weight = form.elements.weight.value;
        const storageTime = form.elements.storageTime.value;

        pageContainer.querySelectorAll('.error-message').forEach(el => el.textContent = '');

        let hasError = false;

        const nameError = validateField(name, 'Название');
        if (nameError) {
            pageContainer.querySelector('#name-error').textContent = nameError;
            hasError = true;
        }

        const shelfError = validateField(shelf, 'Полка');
        if (shelfError) {
            pageContainer.querySelector('#shelf-error').textContent = shelfError;
            hasError = true;
        }

        const weightError = validateNumberField(weight, 'Вес');
        if (weightError) {
            pageContainer.querySelector('#weight-error').textContent = weightError;
            hasError = true;
        }

        const storageTimeError = validateNumberField(storageTime, 'Время хранения');
        if (storageTimeError) {
            pageContainer.querySelector('#storageTime-error').textContent = storageTimeError;
            hasError = true;
        }

        if (hasError) {
            return;
        }

        const newRecord = {
            id: generateUUID(),
            name: name,
            shelf: shelf,
            weight: parseFloat(weight),
            storageTime: parseInt(storageTime, 10),
        };

        addRecord(newRecord);
        navigate('/');
    });

    return pageContainer;
}