"use server";

import { getCurrentUser } from "@/lib/auth-opts";
import { prisma } from "@/lib/db";
import { profileFormSchema } from "@/lib/schemas";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function updateProfile({bio,displayName,linkedinUrl,oneLiner,email,githubUrl,twitterUrl,username}: z.infer<typeof profileFormSchema>) {
  const user = await getCurrentUser();
  if (!user) throw new Error("You're not authenticated.");

  const dbUser = await prisma.user.findUnique({
    where: {
      id: user?.id,
    },
  });

  if (!dbUser) throw new Error("User not found");

  await prisma.user.update({
    data: {
      name: displayName,
      username,
      email,
      oneLiner,
      linkedinUrl,
      twitterUrl,
      githubUrl,
      bio
    },
    where:{
      id:user.id
    }
  });
  revalidatePath(`/dashboard`);
}
