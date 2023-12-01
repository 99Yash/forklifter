"use server";

import { getCurrentUser } from "@/lib/authOpts";
import { prisma } from "@/lib/db";
import { testimonialSchema } from "@/lib/schemas";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function addTestimonial(input: z.infer<typeof testimonialSchema>) {
  const user = await getCurrentUser();
  if (!user) throw new Error("You're not authenticated.");
  const dbUser = await prisma.user.findUnique({
    where: {
      id: user?.id,
    },
  });
  if (!dbUser) throw new Error("User not found");

  const addedTestimonial= await prisma.testimonial.create({
    data: {
      ...input,
      userId: user.id,
    },
  });
  revalidatePath(`/dashboard/testimonials`);
  return addedTestimonial;
}
