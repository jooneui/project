import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function normalizeTag(input: string) {
  return input.trim().replace(/\s+/g, " ");
}

export function getBaseUrl() {
  return process.env.APP_BASE_URL || "http://localhost:3000";
}
