import { Metadata } from "next";
import { ProfileForm } from "./_components/profile-form";
import { getCurrentUser } from "@/lib/authOpts";

export async function generateMetadata(): Promise<Metadata> {
  const user = await getCurrentUser();
  const realFirstName = user?.name?.split(" ")[0];
  return {
    title: `${realFirstName}'s Fork`,
  };
}

export default async function Page() {
  const user = await getCurrentUser();
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
