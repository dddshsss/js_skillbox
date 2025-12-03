export function validateField(value, fieldName) {
    if (!value || value.trim() === '') {
        return `${fieldName} обязательно для заполнения.`;
    }
    return '';
}

export function validateNumberField(value, fieldName) {
    const error = validateField(value, fieldName);
    if (error) return error;

    const num = Number(value);
    if (isNaN(num) || num <= 0) {
        return `${fieldName} должно быть положительным числом.`;
    }
    return '';
}