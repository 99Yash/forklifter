'use server';
import 'server-only';

import { getCurrentUser } from '@/lib/auth-opts';
import { prisma } from '@/lib/db';
import { profileFormSchema } from '@/lib/schemas';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export async function updateProfile({
  bio,
  displayName,
  linkedinUrl,
  oneLiner,
  email,
  githubUrl,
  twitterUrl,
  username,
  techStack,
}: z.infer<typeof profileFormSchema>) {
  const user = await getCurrentUser();
  if (!user) throw new Error("You're not authenticated.");

  const dbUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) throw new Error('User not found');

  if (dbUser.username !== username) {
    if (
      username === 'dashboard' ||
      username.includes('dashboard/') ||
      username.includes('sign-in') ||
      username.includes('signout')
    )
      throw new Error('This is not a valid username"');

    const usernameExists = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (usernameExists) {
      throw new Error(`Username ${username} already exists`);
    }
  }

  await prisma.user.update({
    data: {
      name: displayName,
      username,
      email,
      oneLiner,
      linkedinUrl,
      twitterUrl,
      githubUrl,
      bio,
      techStack,
    },
    where: {
      id: user.id,
    },
  });
  revalidatePath(`/dashboard`);
  revalidatePath(`/${dbUser.username}`);
}
