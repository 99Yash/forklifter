import { getCurrentUser } from '@/lib/auth-opts';
import { prisma } from '@/lib/db';

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
}
