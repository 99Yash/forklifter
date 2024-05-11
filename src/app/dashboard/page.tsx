import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import * as Icons from '@/components/ui/icons';
import { getCurrentUser } from '@/lib/auth-opts';
import { prisma } from '@/lib/db';
import { cn } from '@/lib/utils';
import { type Metadata } from 'next';
import Link from 'next/link';
import { ProfileForm } from './_components/forms/update-profile';

export async function generateMetadata(): Promise<Metadata> {
  const user = await getCurrentUser();
  const realFirstName = user?.name?.split(' ')[0];
  return {
    title: `${realFirstName}'s Workspace`,
  };
}

export default async function Page() {
  const user = await getCurrentUser();
  if (!user) return null;

  const prismaUser = await prisma.user.findUnique({
    where: { id: user.id },
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
    },
  });

  if (!prismaUser)
    return (
      <Card className="flex flex-col gap-4">
        <CardHeader className="flex flex-col">
          <CardTitle className="text-xl font-bold font-title">
            {user.name?.split(' ')[0]}&apos;s Workspace
          </CardTitle>
          <CardDescription className="text-muted-foreground font-title">
            Could not fetch data for your workspace
          </CardDescription>
        </CardHeader>
      </Card>
    );

  return (
    <Card className="flex flex-col gap-4">
      <CardHeader className="flex flex-col">
        <CardTitle className="text-xl font-bold font-title flex items-center gap-2">
          {user.name?.split(' ')[0]}&apos;s Workspace
          <Link
            href={`/${user.username}`}
            target="_blank"
            className={cn(
              buttonVariants({ variant: 'outline' }),
              'flex items-center gap-2 text-yellow-600 hover:bg-inherit hover:text-yellow-400 transition-colors duration-300'
            )}
          >
            See your site
            <Icons.ExternalLink className="h-4 w-4" />
          </Link>
        </CardTitle>
        <CardDescription className="text-muted-foreground font-title">
          Edit your profile data to be reflected on your site
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ProfileForm user={prismaUser} />
      </CardContent>
    </Card>
  );
}
