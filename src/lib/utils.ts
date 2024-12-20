import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function normalize(value: number, min: number, max: number) {
    const normalizedValue = (value - min) / (max - min)
    return parseFloat(normalizedValue.toFixed(2))
}
