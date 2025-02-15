import { prisma } from '@/lib/db';
import type { Metadata } from 'next';

import { getFullUserDetails } from '@/app/_actions/user';
import { siteConfig } from '@/config/site';
import { env } from '@/env.mjs';
import { absoluteUrl } from '@/lib/utils';
import { notFound, redirect } from 'next/navigation';
import { AboutMe } from './_components/about-me';
import { Contributions } from './_components/contributions';
import { Experiences } from './_components/experiences';
import { Footer } from './_components/footer';
import { Header } from './_components/header';
import { Hero } from './_components/hero';
import { FeaturedProjects } from './_components/projects';
import { Testimonials } from './_components/testimonials';

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
  const user = await getFullUserDetails(params.username);
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
        {user.bio && user.twitterUrl && user.githubUrl && user.linkedinUrl && (
          <AboutMe
            bio={user.bio}
            techStack={user.techStack}
            twitter={user.twitterUrl}
            linkedin={user.linkedinUrl}
            github={user.githubUrl}
          />
        )}
        {user.projects && user.projects.length > 0 && (
          <FeaturedProjects projects={user.projects} />
        )}
        {user.experiences && user.experiences.length > 0 && (
          <Experiences experiences={user.experiences} />
        )}
        {user.contributions && user.contributions.length > 0 && (
          <Contributions contributions={user.contributions} />
        )}
        {user.testimonials && user.testimonials.length > 0 && (
          <Testimonials testimonials={user.testimonials} />
        )}
        <Footer />
      </section>
    </>
  );
}
