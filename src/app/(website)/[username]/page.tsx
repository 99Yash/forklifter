import { prisma } from '@/lib/db';
import type { Metadata } from 'next';

import { siteConfig } from '@/config/site';
import { env } from '@/env.mjs';
import { notFound, redirect } from 'next/navigation';
import AboutMe from './about-me';
import Contributions from './contributions';

import { absoluteUrl } from '@/lib/utils';
import Experiences from './experiences';
import Footer from './footer';
import Header from './header';
import Hero from './hero';
import FeaturedProjects from './projects';
import Testimonials from './testimonials';

type Props = {
  params: { username: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const username = params.username;

  const url = absoluteUrl('/');
  const ogUrl = new URL(`${url}/api/og`);
  ogUrl.searchParams.set('username', username);

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
    openGraph: {
      title: `${user.name} • ${siteConfig.name}`,
      description: `${user.bio}`,
      type: 'website',
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: `${user.name} • ${siteConfig.name}`,
        },
      ],
    },
    twitter: {
      title: `${user.name} • ${siteConfig.name}`,
      description: `${user.bio}`,
      card: 'summary_large_image',
      images: [ogUrl.toString()],
    },
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
        orderBy: {
          startDate: 'desc',
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
        {user.experiences && user.experiences.length > 0 && (
          <Experiences experiences={user.experiences} />
        )}
        {user.bio && user.twitterUrl && user.githubUrl && user.linkedinUrl && (
          <AboutMe
            bio={user.bio}
            techStack={user.techStack}
            twitter={user.twitterUrl}
            linkedin={user.linkedinUrl}
            github={user.githubUrl}
          />
        )}
        <Footer />
      </section>
      {/* <footer className="relative flex flex-col justify-center items-center">
        <Separator className="w-1/5 bg-cyan-900" />
        <div className="flex justify-center items-center py-8 text-sm text-gray-400 font-title">
          <p>
            &copy; {siteConfig.name}, {new Date().getFullYear()}. Built in the
            open by
          </p>
          <Link
            target="_blank"
            href={siteConfig.links.twitter}
            className="text-blue-500 hover:underline"
          >
            <p className="ml-1">Yash</p>
          </Link>
        </div>
      </footer> */}
    </>
  );
}
