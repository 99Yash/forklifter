import { prisma } from '@/lib/db';
import type { Metadata, ResolvingMetadata } from 'next';

import Link from 'next/link';
import Nav from './nav';
import Hero from './hero';
import About from './about';
import { notFound, redirect } from 'next/navigation';

type Props = {
  params: { username: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const username = params.username;

  const user = await prisma.user.findUnique({
    where: { username },
    select: {
      name: true,
      bio: true,
    },
  });

  if (!user) {
    return {
      title: 'Error',
      description: 'User not found',
    };
  }

  return {
    title: `${user.name}`,
    description: `${user.bio}`,
  };
}

export default async function Website({
  params,
}: {
  params: { username: string };
}) {
  const user = await prisma.user.findUnique({
    where: { username: params.username },
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
      },
    },
  });

  if (!user) redirect(notFound());

  function getInitials(name: string) {
    const words = name.split(' ');
    const firstNameInitial = words[0] ? words[0][0] : '';
    const lastNameInitial = words.length > 1 ? words[words.length - 1][0] : '';

    return `${firstNameInitial}${lastNameInitial}`;
  }

  return (
    <div className="min-h-screen w-full flex flex-col gap-8 items-center bg-gradient-to-r from-black to-gradient">
      <section className="flex w-full justify-between items-baseline sm:px-6 md:px-8 lg:px-10 xl:px-12 py-8">
        <Link
          href={`/${user?.username}}`}
          className="text-3xl cursor-pointer text-[#bd66fffc] font-semibold font-serif"
        >
          {getInitials(user?.name ?? '')}
        </Link>
        <Nav
          experiences={!!(user?.experiences && user?.experiences.length > 0)}
          contributions={
            !!(user?.contributions && user?.contributions.length > 0)
          }
          testimonials={!!(user?.testimonials && user?.testimonials.length > 0)}
          projects={!!(user?.projects && user?.projects.length > 0)}
        />
      </section>
      <Hero />
      <About about={user?.bio ?? ''} />
    </div>
  );
}
