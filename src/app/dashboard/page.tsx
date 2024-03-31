import { type Metadata } from 'next';
import { ProfileForm } from './_components/forms/update-profile';
import { getCurrentUser } from '@/lib/auth-opts';
import { prisma } from '@/lib/db';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

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
    },
  });

  return (
    <Card className="flex flex-col gap-4">
      <CardHeader className="flex flex-col">
        <CardTitle className="text-xl font-bold">
          {user.name?.split(' ')[0]}&apos;s Workspace
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Edit your profile data to be reflected on your site
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ProfileForm user={prismaUser!} />
      </CardContent>
    </Card>
  );
}
