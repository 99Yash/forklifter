import { getCurrentUser } from "@/lib/authOpts";
import { Metadata } from "next";
import { ProjectCard } from "../_components/project-card";

export const metadata: Metadata = {
  title: "Experiences",
  description: `Add experiences here.`,
};

const page = async () => {
  const user = await getCurrentUser();
  if (!user) return null;
  return (
    <div className="space-y-4 lg:container">
      <div className="flex flex-col">
        <h2 className="text-xl font-bold">Experiences</h2>
        <p className="text-muted-foreground">
          Highlight previous work experiences here.
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

export default page;
