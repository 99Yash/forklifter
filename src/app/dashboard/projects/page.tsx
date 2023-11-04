import { getCurrentUser } from "@/lib/authOpts";
import React from "react";
import { ProjectCard } from "../_components/project-card";
import Balancer from "react-wrap-balancer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: `List of projects.`,
};

const page = async () => {
  const user = await getCurrentUser();
  if (!user) return null;
  //TODO fetch projects
  return (
    <div className="space-y-4 lg:container">
      <div className="flex flex-col">
        <h2 className="text-xl font-bold">Projects</h2>
        <p className="text-muted-foreground">
          All your projects will show up here.
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
          <Balancer>
            <h2 className="text-2xl font-bold">You have no projects yet.</h2>
            <p className="text-lg text-muted-foreground">
              Create your first project to get started.
            </p>
          </Balancer>
        </div>
      </div>
      {/* //TODO Add a create project button */}
      {/* )} */}
    </div>
  );
};

export default page;
