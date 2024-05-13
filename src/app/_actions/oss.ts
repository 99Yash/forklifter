'use server';

import { getCurrentUser } from '@/lib/auth-opts';
import { prisma } from '@/lib/db';
import { ossSchema } from '@/lib/schemas';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export async function addOSS(input: z.infer<typeof ossSchema>) {
  const user = await getCurrentUser();
  if (!user) throw new Error("You're not authenticated.");

  const dbUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });
  if (!dbUser) throw new Error('User not found');

  await prisma.contribution.create({
    data: {
      orgName: input.orgName,
      orgUrl: input.orgUrl,
      url: input.url,
      description: input.description,
      tags: input.tags,
      userId: user.id,
    },
  });
  revalidatePath(`/dashboard/oss`);
}

export async function updateOSS(id: string, input: z.infer<typeof ossSchema>) {
  const user = await getCurrentUser();
  if (!user) throw new Error("You're not authenticated.");

  await prisma.contribution.update({
    where: {
      id,
      userId: user.id,
    },
    data: {
      orgName: input.orgName,
      orgUrl: input.orgUrl,
      url: input.url,
      description: input.description,
      tags: input.tags,
    },
  });
  revalidatePath(`/dashboard/oss`);
}

export async function deleteOSS(id: string) {
  const user = await getCurrentUser();
  if (!user) throw new Error("You're not authenticated.");

  await prisma.contribution.delete({
    where: {
      id,
      userId: user.id,
    },
  });
  revalidatePath(`/dashboard/oss`);
}
