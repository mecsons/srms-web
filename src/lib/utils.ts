import {format} from "date-fns";
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatAvatarName(name: string): string {
  const words = name.trim().split(' ');
  const filteredWords = words.filter(word => word.length > 0);
  const twoWords = filteredWords.slice(0, 2);

  return twoWords.map(word => word[0]).join('').toUpperCase();
}

export const formatDateString = (date: string) => {
  const dateObj = new Date(date);
  return format(dateObj, "dd MMM yyyy");
};