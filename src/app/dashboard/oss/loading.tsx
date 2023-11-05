import { type Metadata } from "next";
import { ProjectCard } from "../_components/project-card";
import React from "react";

export const metadata: Metadata = {
  title: "Open Source Contributions",
  description: `Add or edit OSS Contributions by you.`,
};

const loading = () => {
  return (
    <div className="space-y-4 lg:container">
      <div className="flex flex-col">
        <h2 className="text-xl font-bold">Open Source Contributions</h2>
        <p className="text-muted-foreground">
          Add or Edit OSS Contributions by you.
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
          <ProjectCard.Skeleton />
          <ProjectCard.Skeleton />
          <ProjectCard.Skeleton />
        </ul>
      </div>
      {/* )} */}
    </div>
  );
};

export default loading;
