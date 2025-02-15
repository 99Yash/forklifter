import { env } from '@/env.mjs';
import { Prisma } from '@prisma/client';
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

export function getErrorMessage(err: unknown): string {
  if (err instanceof z.ZodError) {
    return err.issues
      .map(
        (issue) =>
          issue.message ?? 'Something went wrong, please try again later.'
      )
      .join('\n');
  }

  if (err instanceof Error) {
    if (err.name === 'PrismaClientKnownRequestError') {
      return handlePrismaKnownRequestError(
        err as Prisma.PrismaClientKnownRequestError
      );
    } else if (
      [
        'PrismaClientUnknownRequestError',
        'PrismaClientInitializationError',
        'PrismaClientRustPanicError',
        'PrismaClientValidationError',
      ].includes(err.name)
    ) {
      return 'Something went wrong, please try again later.';
    } else {
      return err.message;
    }
  }

  return 'Something went wrong, please try again later.';
}

function handlePrismaKnownRequestError(
  err: Prisma.PrismaClientKnownRequestError
): string {
  const userFaultErrors: Record<string, string> = {
    P2000: 'The provided value is too long. Please shorten it.',
    P2001: 'The specified record does not exist. Please check your input.',
    P2002:
      'A unique constraint violation occurred. Ensure the values are unique.',
    P2003: 'A database constraint failed. Please check the related data.',
    P2006: 'Invalid value provided for one or more fields.',
    P2012: 'A required field is missing. Please complete all necessary fields.',
    P2025: 'The record you are trying to operate on does not exist.',
  };

  return (
    userFaultErrors[err.code] ?? 'Something went wrong, please try again later.'
  );
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
