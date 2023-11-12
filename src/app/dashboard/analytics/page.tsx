import { getCurrentUser } from "@/lib/authOpts";
import { prisma } from "@/lib/db";
import { type Metadata } from "next";
import { redirect } from "next/navigation";
import Balancer from "react-wrap-balancer";
import { ProjectCard } from "../_components/project-card";

export const metadata: Metadata = {
  title: "Analytics",
  description: `View activity on your site.`,
};

const page = async () => {
  const user = await getCurrentUser();
  if (!user) return redirect("/");

  const experiences = await prisma.experience.findMany({
    where: {
      userId: user.id,
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h2 className="text-xl font-bold">Web Analytics</h2>
          <p className="text-muted-foreground">
            Analytics for the visits to your site.
          </p>
        </div>
      </div>

      {experiences.length === 0 ? (
        <div className="relative">
          <ul className="grid select-none grid-cols-1 gap-4 opacity-40 md:grid-cols-3">
            <ProjectCard.Skeleton pulse={false} />
            <ProjectCard.Skeleton pulse={false} />
            <ProjectCard.Skeleton pulse={false} />
          </ul>
          <div className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center">
            <h2 className="text-2xl font-bold"> 
              <Balancer>Analytics is currently in Private Beta</Balancer>
            </h2>
            <p className="text-md text-muted-foreground">
              <Balancer>Subscribe to our newsletter to be notified for the latest updates.</Balancer>
            </p>
          </div>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {experiences.map((experience) => (
            <li key={experience.id}>
              <ProjectCard
                id={experience.id}
                primaryText={experience.orgName}
                secondaryText={experience.position}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default page;
