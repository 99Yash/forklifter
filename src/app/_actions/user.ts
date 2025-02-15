'use server';
import 'server-only';

import { getCurrentUser } from '@/lib/auth-opts';
import { prisma } from '@/lib/db';
import { Prisma } from '@prisma/client';
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

export async function getUserByUsername(
  id: string,
  select?: Prisma.UserSelect
) {
  const prismaUser = await prisma.user.findUnique({
    where: { id },
    select: {
      name: true,
      username: true,
      email: true,
      bio: true,
      oneLiner: true,
      twitterUrl: true,
      githubUrl: true,
      linkedinUrl: true,
      techStack: true,
      ...select,
    },
  });

  return prismaUser;
}

export async function getTestimonials(userId: string) {
  const testimonials = await prisma.testimonial.findMany({
    where: {
      userId,
    },
  });

  return testimonials;
}

export async function getProjects(userId: string) {
  const projects = await prisma.project.findMany({
    where: {
      userId,
    },
  });

  return projects;
}

export async function getContributions(userId: string) {
  const contributions = await prisma.contribution.findMany({
    where: {
      userId,
    },
  });

  return contributions;
}

export async function getExperiences(userId: string) {
  const experiences = await prisma.experience.findMany({
    where: {
      userId,
    },
    orderBy: {
      startDate: 'desc',
    },
  });

  return experiences || [];
}

export async function getFullUserDetails(username: string) {
  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      projects: {
        select: {
          name: true,
          description: true,
          githubUrl: true,
          techStack: true,
          webUrl: true,
        },
      },
      contributions: {
        select: {
          description: true,
          orgName: true,
          orgUrl: true,
          tags: true,
          url: true,
        },
      },
      testimonials: {
        select: {
          author: true,
          authorUrl: true,
          designation: true,
          message: true,
        },
      },
      experiences: {
        select: {
          description: true,
          orgName: true,
          orgUrl: true,
          currentlyWorking: true,
          endDate: true,
          startDate: true,
          position: true,
        },
        orderBy: {
          startDate: 'desc',
        },
      },
    },
  });

  return user;
}
