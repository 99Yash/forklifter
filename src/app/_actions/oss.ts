"use server";

import { getCurrentUser } from "@/lib/authOpts";
import { prisma } from "@/lib/db";
import { ossSchema } from "@/lib/schemas";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function addOSS(input: z.infer<typeof ossSchema>) {
  const user = await getCurrentUser();
  if (!user) throw new Error("You're not authenticated.");
  const dbUser = await prisma.user.findUnique({
    where: {
      id: user?.id,
    },
  });
  if (!dbUser) throw new Error("User not found");

  await prisma.contribution.create({
    data: {
      orgName: input.orgName,
      url: input.url,
      description: input.description,
      tags: input.tags,
      userId: user.id,
    },
  });
  revalidatePath(`/dashboard/oss`);
}
