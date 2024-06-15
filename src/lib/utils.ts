import { env } from '@/env.mjs';
import { clsx, type ClassValue } from 'clsx';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
  return `${env.NEXT_PUBLIC_APP_URL}${path}`;
}

export function getErrorMessage(error: unknown) {
  if (error instanceof z.ZodError) {
    return error.issues.map((issue) => {
      return issue.message;
    });
  } else if (error instanceof Error) {
    return error.message;
  } else {
    return 'Something went wrong, please try again later.';
  }
}

export function catchError(err: unknown) {
  toast.error(getErrorMessage(err));
}

export function formatDate(
  date: Date | string | number,
  options: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }
) {
  return new Intl.DateTimeFormat('en-US', {
    ...options,
  }).format(new Date(date));
}

export function manualDialogClose() {
  document.getElementById('dialog-close')?.click();
}

export function getInitials(name: string) {
  const words = name.split(' ');
  const firstNameInitial = words[0] ? words[0][0] : '';
  const lastNameInitial = words.length > 1 ? words[words.length - 1][0] : '';

  return `${firstNameInitial}${lastNameInitial}`;
}
