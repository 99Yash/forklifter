import { PrismaClient as PrismaClientWithoutExtension } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';
import { env } from '@/env.mjs';

const createAcceleratedPrismaClient = () => {
  return new PrismaClientWithoutExtension().$extends(withAccelerate());
};

// Define a type for the accelerated client.
export type PrismaClientAccelerated = ReturnType<
  typeof createAcceleratedPrismaClient
>;

const globalForPrisma = globalThis as unknown as {
  acceleratedPrisma: PrismaClientAccelerated | undefined;
};

export const prisma =
  globalForPrisma.acceleratedPrisma ?? createAcceleratedPrismaClient();

if (env.NODE_ENV !== 'production') {
  globalForPrisma.acceleratedPrisma = prisma;
}
