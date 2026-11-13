import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Standard shadcn/ui className merger combining clsx and tailwind-merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * One-line utilities (inspired by phuocng/1loc)
 */
export const clamp = (val: number, min: number, max: number) =>
  Math.min(Math.max(val, min), max);

export const randomItem = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

export const formatNumberWithCommas = (num: number): string =>
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const truncate = (str: string, maxLen: number): string =>
  str.length > maxLen ? `${str.slice(0, maxLen)}...` : str;

