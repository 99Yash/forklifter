import { getCurrentUser } from "@/lib/authOpts";
import React from "react";
import { ProjectCard } from "../_components/project-card";
import Balancer from "react-wrap-balancer";
import { type Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Projects",
  description: `List of projects.`,
};

const page = async () => {
  const user = await getCurrentUser();
  if (!user) return null;
  //TODO fetch projects
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <div className="flex flex-col">
          <h2 className="text-xl font-bold">Projects</h2>
          <p className="text-muted-foreground">
            All your personal projects will show up here.
          </p>
        </div>
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
            <Balancer>You have no projects yet.</Balancer>
          </h2>
          <p className="text-md text-muted-foreground">
            <Balancer>Create your first project to get started.</Balancer>
          </p>
          <Button className="mt-4">Add a new Project</Button>
        </div>
      </div>
      {/* //TODO Add a create project button */}
      {/* )} */}
    </div>
  );
};

export default page;
