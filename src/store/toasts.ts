import { writable } from "svelte/store";

const createToasts = () => {
    let { subscribe, update } = writable<string[]>([]);

    /**
     * Show a message in the toaster.
     *
     * @param text
     * @param duration (ms)
     */
    const showMessage = (text: string, duration: number = 1000) => {
        update((n) => [...n, text]);

        if (duration !== Infinity) {
            setTimeout(() => {
                update((n) => [...n.slice(1)]);
            }, duration);
        }
    };

    return { subscribe, showMessage };
};

export const toasts = createToasts();
