import { getCurrentUser } from '@/lib/auth-opts';
import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function deleteUser() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error('User not found');
  }

  await prisma.user.delete({
    where: {
      id: user.id,
    },
  });
  revalidatePath(`/${user.username}`);
}
