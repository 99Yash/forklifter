import { prisma } from '@/lib/db';
import type { Metadata, ResolvingMetadata } from 'next';
import Link from 'next/link';

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
      title: 'User not found',
      description: 'User not found',
    };
  }

  return {
    title: `${user.name}'s Website`,
    description: `${user.bio}`,
  };
}

function getInitials(name: string) {
  const words = name.split(' ');
  const firstNameInitial = words[0] ? words[0][0] : '';
  const lastNameInitial = words.length > 1 ? words[words.length - 1][0] : '';

  return `${firstNameInitial}${lastNameInitial}`;
}

export default async function Website({
  params,
}: {
  params: { username: string };
}) {
  const details = await prisma.user.findUnique({
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

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-gradient-to-r from-black to-[#320d45]">
      <section className="flex w-full justify-between px-12 py-6">
        <span className="text-3xl text-white font-bold">
          {/* initials of the user */}
          {getInitials(details?.name!)}
        </span>
        <nav className="flex gap-6 text-md">
          <Link
            className="font-bold hover:bg-slate-300/10 rounded-lg py-2 px-4 transition-colors duration-200"
            href="#about"
          >
            About
          </Link>
          <Link
            className="font-bold hover:bg-slate-300/10 rounded-lg py-2 px-4 transition-colors duration-200"
            href="#experience"
          >
            Experience
          </Link>
          <Link
            className="font-bold hover:bg-slate-300/10 rounded-lg py-2 px-4 transition-colors duration-200"
            href="#oss"
          >
            Open Source
          </Link>
          <Link
            className="font-bold hover:bg-slate-300/10 rounded-lg py-2 px-4 transition-colors duration-200"
            href="#testimonials"
          >
            Testimonials
          </Link>
          <Link
            className="font-bold hover:bg-slate-300/10 rounded-lg py-2 px-4 transition-colors duration-200"
            href="#projects"
          >
            Projects
          </Link>
          <Link
            className="font-bold hover:bg-slate-300/10 rounded-lg py-2 px-4 transition-colors duration-200"
            href="#contact"
          >
            Contact
          </Link>
        </nav>
      </section>
    </div>
  );
}
