export const getLocalStorage = (key, defaultValue = null) => {
    try {
        const data = localStorage.getItem(key);
        if (!data) return defaultValue; 
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error getting "${key}" from localStorage:`, error);
        return defaultValue;
    }
};

export const setLocalStorage = (key, data) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error(`Error setting "${key}" to localStorage:`, error);
        return false;
    }
};

export const removeLocalStorage = (key) => {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error(`Error removing "${key}" from localStorage:`, error);
        return false;
    }
};

export const clearLocalStorage = () => {
    try {
        localStorage.clear();
        return true;
    } catch (error) {
        console.error('Error clearing localStorage:', error);
        return false;
    }
};