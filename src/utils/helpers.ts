export const formatAddress = (address: string): string => {
    return address.trim().replace(/\s+/g, ' ');
};

export const validateProfileData = (data: any): boolean => {
    const { name, photo, description } = data;
    return typeof name === 'string' && name.length > 0 &&
           typeof photo === 'string' && photo.length > 0 &&
           typeof description === 'string' && description.length > 0;
};

export const debounce = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
};