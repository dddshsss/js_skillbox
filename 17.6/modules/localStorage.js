const STORAGE_KEY = 'warehouse_records';

export function getRecords() {
    try {
        const records = localStorage.getItem(STORAGE_KEY);
        return records ? JSON.parse(records) : [];
    } catch (e) {
        console.error("Ошибка при чтении из localStorage:", e);
        return [];
    }
}

export function saveRecords(records) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    } catch (e) {
        console.error("Ошибка при сохранении в localStorage:", e);
    }
}

export function addRecord(record) {
    const records = getRecords();
    records.push(record);
    saveRecords(records);
}

export function deleteRecord(id) {
    let records = getRecords();
    records = records.filter(record => record.id !== id);
    saveRecords(records);
}

export function updateRecords(newRecords) {
    saveRecords(newRecords);
}