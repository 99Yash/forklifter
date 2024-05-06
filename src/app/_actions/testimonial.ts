'use server';

import { getCurrentUser } from '@/lib/auth-opts';
import { prisma } from '@/lib/db';
import { testimonialSchema } from '@/lib/schemas';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export async function addTestimonial(input: z.infer<typeof testimonialSchema>) {
  const user = await getCurrentUser();
  if (!user) throw new Error("You're not authenticated.");
  const dbUser = await prisma.user.findUnique({
    where: {
      id: user?.id,
    },
  });
  if (!dbUser) throw new Error('User not found');

  await prisma.testimonial.create({
    data: {
      ...input,
      userId: user.id,
    },
  });
  revalidatePath(`/dashboard/testimonials`);
  revalidatePath(`/${dbUser.username}`);
}

export async function updateTestimonial(
  id: string,
  input: z.infer<typeof testimonialSchema>
) {
  const user = await getCurrentUser();
  if (!user) throw new Error("You're not authenticated.");

  await prisma.testimonial.update({
    where: {
      id,
      userId: user.id,
    },
    data: {
      ...input,
    },
  });
  revalidatePath(`/dashboard/testimonials`);
}

export async function deleteTestimonial(id: string) {
  const user = await getCurrentUser();
  if (!user) throw new Error("You're not authenticated.");

  await prisma.testimonial.delete({
    where: {
      id,
      userId: user.id,
    },
  });
  revalidatePath(`/dashboard/testimonials`);
}
