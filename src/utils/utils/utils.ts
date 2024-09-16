import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge multiple class names into a single string.
 *
 * @param inputs - Class names to merge
 * @returns Merged class names as a string
 */

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
