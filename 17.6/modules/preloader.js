const preloaderElement = document.getElementById('preloader');

export function showPreloader() {
    if (preloaderElement) {
        preloaderElement.classList.remove('hidden');
    }
}

export function hidePreloader() {
    if (preloaderElement) {
        preloaderElement.classList.add('hidden');
    }
}