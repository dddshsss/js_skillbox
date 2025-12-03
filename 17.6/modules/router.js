import { showPreloader, hidePreloader } from './preloader.js';

const routes = {
    '/': 'warehouseList',
    '/add': 'addItem',
};

export async function navigate(path) {
    showPreloader();
    const app = document.getElementById('app');
    app.innerHTML = '';

    const componentName = routes[path];
    if (!componentName) {
        app.innerHTML = '<h1>404 - Страница не найдена</h1>';
        hidePreloader();
        return;
    }

    try {
        const module = await import(`./pages/${componentName}.js`);
        
        const componentElement = module.default(); 
        app.appendChild(componentElement);

        // Обновляем URL-хеш без перезагрузки страницы
        window.history.pushState(null, '', '#' + path); // Используем pushState для более чистого URL

    } catch (error) {
        console.error(`Ошибка загрузки компонента для пути ${path}:`, error);
        app.innerHTML = `<h1>Ошибка загрузки страницы</h1><p>${error.message}</p>`;
    } finally {
        hidePreloader();
    }
}

export function initRouter() {
    const handleHashChange = () => {
        const path = window.location.hash.slice(1) || '/';
        navigate(path);
    };

    window.addEventListener('popstate', handleHashChange); // Слушаем popstate для кнопки "назад/вперед"
    window.addEventListener('hashchange', handleHashChange); // Для старых браузеров и прямого изменения хеша
    
    handleHashChange(); 
}
