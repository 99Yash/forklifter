import { getCurrentUser } from "@/lib/authOpts";
import { type Metadata } from "next";
import { redirect } from "next/navigation";
import Balancer from "react-wrap-balancer";
import AddOSS from "../_components/forms/add-oss";
import { ProjectCard } from "../_components/project-card";

export const metadata: Metadata = {
  title: "Open Source",
  description: `Add or edit OSS Contributions by you.`,
};

const page = async () => {
  const user = await getCurrentUser();
  if (!user) return redirect("/");
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h2 className="text-xl font-bold">Contributions</h2>
          <p className="text-muted-foreground">
            Enlist your most important Open Source Contributions here.
          </p>
        </div>
        <AddOSS />
      </div>

      <div className="relative">
        <ul className="grid select-none grid-cols-1 gap-4 opacity-40 md:grid-cols-3">
          <ProjectCard.Skeleton pulse={false} />
          <ProjectCard.Skeleton pulse={false} />
          <ProjectCard.Skeleton pulse={false} />
        </ul>
        <div className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center">
          <h2 className="text-2xl font-bold">
            <Balancer>You&apos;ve Zero open source contributions.</Balancer>
          </h2>
          <p className="text-md text-muted-foreground">
            <Balancer>Put all your Open Source contributions here.</Balancer>
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
