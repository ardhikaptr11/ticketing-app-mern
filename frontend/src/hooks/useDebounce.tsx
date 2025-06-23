import { useRef } from "react";

export const useDebounce = () => {
    const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

    const debounce = (fn: Function, delay: number) => {
        if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

        debounceTimeout.current = setTimeout(() => {
            fn();
            debounceTimeout.current = null;
        }, delay);
    };

    return debounce;
};
