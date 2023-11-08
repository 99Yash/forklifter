import { getCurrentUser } from "@/lib/authOpts";
import React from "react";
import { ProjectCard } from "../_components/project-card";
import Balancer from "react-wrap-balancer";
import { type Metadata } from "next";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const metadata: Metadata = {
  title: "Open Source Contributions",
  description: `Add or edit OSS Contributions by you.`,
};

const page = async () => {
  const user = await getCurrentUser();
  if (!user) return redirect("/");
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h2 className="text-xl font-bold">Contributions</h2>
          <p className="text-muted-foreground">
            Enlist your most important Open Source Contributions here.
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mt-4">Add a Contribution</Button>
          </DialogTrigger>
          <DialogContent className="max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add a Contribution</DialogTitle>
              <DialogDescription>
                You can add upto 3 contributions in the FREE tier.
              </DialogDescription>
            </DialogHeader>
            <form action=""></form>
          </DialogContent>
        </Dialog>
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
            <Balancer>You&apos;ve Zero open source contributions.</Balancer>
          </h2>
          <p className="text-md text-muted-foreground">
            <Balancer>Put all your Open Source contributions here.</Balancer>
          </p>
        </div>
      </div>
      {/* )} */}
    </div>
  );
};

export default page;
