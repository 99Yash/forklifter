"use server";

import { getCurrentUser } from "@/lib/authOpts";
import { prisma } from "@/lib/db";
import { projectSchema } from "@/lib/schemas";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function addProject(input: z.infer<typeof projectSchema>) {
  const user = await getCurrentUser();
  if (!user) throw new Error("You're not authenticated.");
  const dbUser = await prisma.user.findUnique({
    where: {
      id: user?.id,
    },
  });
  if (!dbUser) throw new Error("User not found");

  await prisma.project.create({
    data: {
      ...input,
      userId: user.id,
    },
  });
  revalidatePath(`/dashboard/projects`);
}
