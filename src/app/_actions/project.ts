'use server';

import { getCurrentUser } from '@/lib/auth-opts';
import { prisma } from '@/lib/db';
import { projectSchema } from '@/lib/schemas';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export async function addProject(input: z.infer<typeof projectSchema>) {
  const user = await getCurrentUser();
  if (!user) throw new Error("You're not authenticated.");
  const dbUser = await prisma.user.findUnique({
    where: {
      id: user?.id,
    },
  });
  if (!dbUser) throw new Error('User not found');

  await prisma.project.create({
    data: {
      ...input,
      userId: user.id,
    },
  });
  revalidatePath(`/dashboard/projects`);
  revalidatePath(`/${dbUser.username}`);
}

export async function updateProject(
  projectId: string,
  input: z.infer<typeof projectSchema>
) {
  const user = await getCurrentUser();
  if (!user) throw new Error("You're not authenticated.");

  const dbUser = await prisma.user.findUnique({
    where: {
      id: user?.id,
    },
  });

  if (!dbUser) throw new Error('User not found');

  await prisma.project.update({
    where: {
      id: projectId,
      userId: dbUser.id,
    },
    data: input,
  });

  revalidatePath(`/dashboard/projects`);
  revalidatePath(`/${dbUser.username}`);
}

export async function deleteProject(id: string) {
  const user = await getCurrentUser();
  if (!user) throw new Error("You're not authenticated.");

  const dbUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) throw new Error('User not found');

  await prisma.project.delete({
    where: {
      id,
      userId: dbUser.id,
    },
  });

  revalidatePath(`/dashboard/projects`);
  revalidatePath(`/${dbUser.username}`);
}
