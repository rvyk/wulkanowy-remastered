import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function beutifyRepoName(repo: string) {
  return repo.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
}
