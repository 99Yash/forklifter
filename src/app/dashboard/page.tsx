import { type Metadata } from "next";
import { ProfileForm } from "./_components/profile-form";
import { getCurrentUser } from "@/lib/authOpts";
import { prisma } from "@/lib/db";

export async function generateMetadata(): Promise<Metadata> {
  const user = await getCurrentUser();
  const realFirstName = user?.name?.split(" ")[0];
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
      twitterUrl: true,
      githubUrl: true,
      linkedinUrl: true,
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col">
        <h2 className="text-xl font-bold">
          {user.name?.split(" ")[0]}&apos;s Workspace
        </h2>
        <p className="text-muted-foreground">
          Edit your profile data to be reflected on your site
        </p>
      </div>
      <ProfileForm user={prismaUser!} />
    </div>
  );
}
