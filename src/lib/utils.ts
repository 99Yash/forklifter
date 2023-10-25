import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function extractInitials(fullName: string): string {
  const words = fullName.split(" ");
  const initials = words.map((word) => (word ? word[0]!.toUpperCase() : ""));
  return initials.join("");
}
