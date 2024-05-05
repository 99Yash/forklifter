import { prisma } from '@/lib/db';
import type { Metadata } from 'next';

import Link from 'next/link';
import Nav from './nav';
import Hero from './hero';
import About from './about';
import { notFound, redirect } from 'next/navigation';
import Experience from './experiences';
import Testimonials from './testimonials';
import { getInitials } from '@/lib/utils';
import OSS from './oss';
import Projects from './projects';
import SocialLinks from '../utils/social-links';
import Contact from './contact';

type Props = {
  params: { username: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
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
    title: {
      absolute: `
      ${user.name}'s Website
      `,
    },
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

  return (
    <div className="bg-gradient-to-r from-black to-gradient overflow-hidden">
      <section className="min-h-[10vh] flex w-full justify-between items-baseline sm:px-6 md:px-8 lg:px-10 xl:px-12 py-8">
        <Link
          href={`/${user?.username}}`}
          className="text-3xl cursor-pointer text-[#bd66fffc] font-semibold font-serif"
        >
          {getInitials(user?.name ?? '')}
        </Link>
        <Nav
          experiences={!!(user.experiences && user.experiences.length > 0)}
          contributions={
            !!(user.contributions && user.contributions.length > 0)
          }
          testimonials={!!(user.testimonials && user.testimonials.length > 0)}
          projects={!!(user.projects && user.projects.length > 0)}
        />
      </section>
      <Hero
        name={user.name ?? ''}
        oneLiner={user.oneLiner ?? ''}
        mail={user.email ?? ''}
      />
      {user.bio && user.bio.length !== 0 && <About about={user?.bio ?? ''} />}
      {user.experiences && user.experiences.length > 0 && (
        <Experience experiences={user.experiences} />
      )}
      {user.testimonials && user.testimonials.length > 0 && (
        <Testimonials testimonials={user.testimonials} />
      )}
      {user.contributions && user.contributions.length > 0 && (
        <OSS contributions={user.contributions} />
      )}
      {user.projects && user.projects.length > 0 && (
        <Projects projects={user.projects} />
      )}
      <Contact mail={user.email} />
      <SocialLinks
        github={user.githubUrl}
        linkedIn={user.linkedinUrl}
        twitter={user.twitterUrl}
      />
    </div>
  );
}
