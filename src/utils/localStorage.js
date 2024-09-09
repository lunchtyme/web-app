export const localStorageHelper = {
    saveToLocalStorage(key, value) {
        localStorage.setItem(key, value);
    },
    getLocalStorage(key) {
        return localStorage.getItem(key);
    }
}