// Debounce Funktion
// https://davidwalsh.name/javascript-debounce-function
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.

// var myEfficientFn = debounce(function() {
// All the taxing stuff you do
// }, 250);
// window.addEventListener('resize', myEfficientFn);

class Debounce<T extends (...args: any[]) => any> {
    private func: T;
    private wait: number;
    private immediate?: boolean;
    private timeout: ReturnType<typeof setTimeout> | null = null;

    constructor(func: T, wait: number, immediate?: boolean) {
        this.func = func;
        this.wait = wait;
        this.immediate = immediate;
    }

    public execute(...args: Parameters<T>): void {
        const context = this;
        const later = function () {
            context.timeout = null;
            if (!context.immediate) context.func.apply(context, args);
        };
        const callNow = this.immediate && !this.timeout;
        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(later, this.wait);
        if (callNow) this.func.apply(this, args);
    }
}

export { Debounce };