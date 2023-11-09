
const debounce = (fn: any, delay: any) => {
    let timerId: any;
    return (...args: any[]) => {
        clearTimeout(timerId);
        timerId = setTimeout(() => fn(...args), delay);
    };
};

export {debounce}