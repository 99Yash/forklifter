import { prisma } from '@/lib/db';
import type { Metadata } from 'next';

import { Separator } from '@/components/ui/separator';
import { siteConfig } from '@/config/site';
import { env } from '@/env.mjs';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import GlowBottom from '../../../../public/images/blur-indigo.png';
import AboutMe from './about-me';
import Contributions from './contributions';
import FeaturedProjects from './featured-projects';
import Header from './header';
import Hero from './hero';
import Testimonials from './testimonials';

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
      ${user.name} • ${siteConfig.name}`,
    },
    description: `${user.bio}`,
    metadataBase: new URL(
      env.NODE_ENV === 'development'
        ? `http://localhost:3000/${username}`
        : `https://${siteConfig.url}${username}`
    ),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    keywords: [
      `${user.name}`,
      `${user.bio}`,
      'Website',
      `${siteConfig.name}`,
      'Developer',
    ],
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
    <>
      <Header
        experiences={user.experiences && user.experiences.length > 0}
        contributions={user.contributions && user.contributions.length > 0}
        testimonials={user.testimonials && user.testimonials.length > 0}
        projects={user.projects && user.projects.length > 0}
        name={user.name}
        github={user.githubUrl ?? ''}
        linkedIn={user.linkedinUrl ?? ''}
        twitter={user.twitterUrl ?? ''}
      />
      <section className="mx-auto mb-16 max-w-5xl px-5 py-24 sm:px-8 space-y-36">
        <Hero
          mail={user.email}
          name={user.name}
          oneLiner={user.oneLiner ?? ''}
        />
        {user.projects && user.projects.length > 0 && (
          <FeaturedProjects projects={user.projects} />
        )}
        {user.contributions && user.contributions.length > 0 && (
          <Contributions contributions={user.contributions} />
        )}
        {user.testimonials && user.testimonials.length > 0 && (
          <Testimonials testimonials={user.testimonials} />
        )}
        {/* {user.experiences && user.experiences.length > 0 && <Work />} */}
        {user.bio && user.twitterUrl && user.githubUrl && user.linkedinUrl && (
          <AboutMe
            bio={user.bio}
            techStack={user.techStack}
            twitter={user.twitterUrl}
            linkedin={user.linkedinUrl}
            github={user.githubUrl}
          />
        )}
      </section>
      <footer className="relative flex flex-col justify-center items-center">
        <div className="absolute bottom-0 -z-10 opacity-10">
          <Image
            src={GlowBottom}
            className="max-w-[60vw]"
            width={1404}
            height={658}
            alt="Glow Bottom"
          />
        </div>
        <Separator className="w-1/5 bg-cyan-900" />
        <div className="flex justify-center items-center py-8 text-sm text-gray-400 font-title">
          <p>
            &copy; {siteConfig.name}, {new Date().getFullYear()}. Built in the
            open by
          </p>
          <Link
            href={siteConfig.links.twitter}
            className="text-blue-500 hover:underline"
          >
            <p className="ml-1">Yash</p>
          </Link>
        </div>
      </footer>
    </>
  );
}
