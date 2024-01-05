import { getCurrentUser } from "@/lib/auth-opts";
import { type Metadata } from "next";
import { redirect } from "next/navigation";
import Balancer from "react-wrap-balancer";
import AddOSS from "../_components/forms/add-oss";
import { ProjectCard } from "../_components/project-card";
import { prisma } from "@/lib/db";

export const metadata: Metadata = {
  title: "Open Source",
  description: `Add or edit OSS Contributions by you.`,
};

const page = async () => {
  const user = await getCurrentUser();
  if (!user) return redirect("/");

    const contributions = await prisma.contribution.findMany({
      where:{
        userId:user.id
      }
    })

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

      {contributions.length===0 ? <div className="relative">
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
      </div>:(
         <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
         {contributions.map((oss) => (
           <li key={oss.id}>
             <ProjectCard
               id={oss.id}
               primaryText={oss.orgName}
               secondaryText={oss.tags.join(" ")}
             />
           </li>
          )
          )}</ul>)}
    </div>
  );
};

export default page;
