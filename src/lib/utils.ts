import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { v4 as uuidv4 } from 'uuid';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateUUID = () => uuidv4();

export function sanitizeText(text: string) {
  return text.replace('<has_function_call>', '');
}
