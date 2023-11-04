import { getCurrentUser } from "@/lib/authOpts";
import React from "react";
import { ProjectCard } from "../_components/project-card";
import Balancer from "react-wrap-balancer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account",
  description: `Manage your account details here.`,
};

const page = async () => {
  const user = await getCurrentUser();
  if (!user) return null;
  return (
    <div className="space-y-4 lg:container">
      <div className="flex flex-col">
        <h2 className="text-xl font-bold">Account</h2>
        <p className="text-muted-foreground">
          Manage your account details here.
        </p>
      </div>
      {/* <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {projects.map((project) => (
          <li key={project.id}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul> */}

      {/* {projects.length === 0 && ( */}
      <div className="relative">
        <ul className="grid select-none grid-cols-1 gap-4 opacity-40 md:grid-cols-3">
          <ProjectCard.Skeleton pulse={false} />
          <ProjectCard.Skeleton pulse={false} />
          <ProjectCard.Skeleton pulse={false} />
        </ul>
        <div className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center">
          <h2 className="text-2xl font-bold">
            <Balancer>You can edit your account settings here.</Balancer>
          </h2>
        </div>
      </div>
      {/* )} */}
    </div>
  );
};

export default page;
