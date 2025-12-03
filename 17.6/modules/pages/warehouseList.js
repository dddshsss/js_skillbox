import { getRecords, deleteRecord } from '../localStorage.js';
import { navigate } from '../router.js';

export default function warehouseListPage() {
    const pageContainer = document.createElement('div');
    pageContainer.innerHTML = `
        <h1>Склад</h1>
        <button id="add-record-btn" class="button" style="margin-bottom: 20px;">Добавить запись</button>
        <table id="records-table">
            <thead>
                <tr>
                    <th data-sort-key="name">Название <span class="sort-icon"></span></th>
                    <th data-sort-key="shelf">Полка <span class="sort-icon"></span></th>
                    <th data-sort-key="weight">Вес <span class="sort-icon"></span></th>
                    <th data-sort-key="storageTime">Время хранения <span class="sort-icon"></span></th>
                    <th>Действие</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    `;

    const addRecordBtn = pageContainer.querySelector('#add-record-btn');
    addRecordBtn.addEventListener('click', () => navigate('/add'));

    const tableBody = pageContainer.querySelector('#records-table tbody');
    const tableHeaders = pageContainer.querySelectorAll('#records-table th[data-sort-key]');

    let currentSort = { key: null, order: 'asc' };

    function renderRecordsTable() {
        let records = getRecords();
        
        if (currentSort.key) {
            records.sort((a, b) => {
                const valA = a[currentSort.key];
                // ИСПРАВЛЕНИЕ: valB должно получать значение по ключу, а не по ключу из объекта current
                const valB = b[currentSort.key]; 

                let comparison = 0;
                if (typeof valA === 'string' && typeof valB === 'string') {
                    comparison = valA.localeCompare(valB);
                } else if (typeof valA === 'number' && typeof valB === 'number') {
                    comparison = valA - valB;
                }
                // Если типы разные или неподдерживаемые, сравнение не производится

                return currentSort.order === 'asc' ? comparison : -comparison;
            });
        }

        tableBody.innerHTML = '';

        if (records.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 20px; color: #888;">На складе пока ничего нет.</td></tr>';
            return;
        }

        records.forEach(record => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${record.name}</td>
                <td>${record.shelf}</td>
                <td>${record.weight} кг</td>
                <td>${record.storageTime} дней</td>
                <td><button class="button red delete-record-btn" data-id="${record.id}">Удалить</button></td>
            `;
            tableBody.appendChild(row);
        });

        pageContainer.querySelectorAll('.delete-record-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const id = event.target.dataset.id;
                if (confirm('Вы уверены, что хотите удалить эту запись?')) {
                    deleteRecord(id);
                    renderRecordsTable();
                }
            });
        });
    }

    tableHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const sortKey = header.dataset.sortKey;
            
            if (currentSort.key === sortKey) {
                currentSort.order = currentSort.order === 'asc' ? 'desc' : 'asc';
            } else {
                currentSort.key = sortKey;
                currentSort.order = 'asc';
            }

            tableHeaders.forEach(th => th.classList.remove('asc', 'desc'));
            header.classList.add(currentSort.order);
            
            renderRecordsTable();
        });
    });

    renderRecordsTable();

    return pageContainer;
}