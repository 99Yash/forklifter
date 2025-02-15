'use server';
import 'server-only';

import { getCurrentUser } from '@/lib/auth-opts';
import { prisma } from '@/lib/db';
import { experienceSchema } from '@/lib/schemas';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export async function addExperience(input: z.infer<typeof experienceSchema>) {
  const user = await getCurrentUser();
  if (!user) throw new Error("You're not authenticated.");
  const dbUser = await prisma.user.findUnique({
    where: {
      id: user?.id,
    },
  });
  if (!dbUser) throw new Error('User not found');

  await prisma.experience.create({
    data: {
      currentlyWorking: input.endDate ? false : true,
      userId: user.id,
      description: input.description,
      orgName: input.orgName,
      startDate: input.startDate ?? new Date(),
      endDate: input.endDate,
      position: input.position,
      orgUrl: input.orgUrl,
    },
  });
  revalidatePath(`/dashboard/experiences`);
}

export async function updateExperience(
  id: string,
  input: z.infer<typeof experienceSchema>
) {
  const user = await getCurrentUser();
  if (!user) throw new Error("You're not authenticated.");
  const dbUser = await prisma.user.findUnique({
    where: {
      id: user?.id,
    },
  });
  if (!dbUser) throw new Error('User not found');

  await prisma.experience.update({
    where: {
      id,
    },
    data: {
      currentlyWorking: input.endDate ? false : true,
      description: input.description,
      orgName: input.orgName,
      startDate: input.startDate ?? new Date(),
      endDate: input.endDate,
      position: input.position,
      orgUrl: input.orgUrl,
    },
  });
  revalidatePath(`/dashboard/experiences`);
}

export async function deleteExperience(id: string) {
  const user = await getCurrentUser();
  if (!user) throw new Error("You're not authenticated.");
  const dbUser = await prisma.user.findUnique({
    where: {
      id: user?.id,
    },
  });
  if (!dbUser) throw new Error('User not found');

  await prisma.experience.delete({
    where: {
      id,
    },
  });
  revalidatePath(`/dashboard/experiences`);
}
