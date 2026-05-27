import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges tailwind classes safely, resolving conflicts.
 * Example: cn("bg-red-500", condition && "bg-blue-500") -> "bg-blue-500" if true
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}