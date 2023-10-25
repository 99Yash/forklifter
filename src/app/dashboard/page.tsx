import { type Metadata } from "next";
import { ProfileForm } from "./_components/profile-form";
import { getServerAuthSession } from "@/server/auth";

export async function generateMetadata(): Promise<Metadata> {
  const session = await getServerAuthSession();
  const user = session?.user;
  const realFirstName = user?.name?.split(" ")[0];
  return {
    title: `${realFirstName}'s Fork`,
  };
}
export default async function Page() {
  const session = await getServerAuthSession();
  const user = session?.user;
  if (!user) return null;

  return (
    <div className="space-y-4 lg:container">
      <div className="flex flex-col">
        <h2 className="text-xl font-bold">
          {user.name?.split(" ")[0]}&apos;s Workspace
        </h2>
        <p className="text-muted-foreground">
          Edit your profile data to be reflected on your site
        </p>
      </div>
      <ProfileForm />
    </div>
  );
}
