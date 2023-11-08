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
  title: "Testimonials",
  description: `Add or edit testimonials here.`,
};

const page = async () => {
  const user = await getCurrentUser();
  if (!user) return redirect("/");
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h2 className="text-xl font-bold">Testimonials</h2>
          <p className="text-muted-foreground">
            Add testimonials from your previous employer or any other authority.
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mt-4">Plug a Testimonial</Button>
          </DialogTrigger>
          <DialogContent className="max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add a Testimonial</DialogTitle>
              <DialogDescription>
                You can add upto 3 testimonials in the FREE tier.
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
            <Balancer>You&apos;ve zero testimonials.</Balancer>
          </h2>
          <p className="text-md text-muted-foreground">
            <Balancer>
              If you have prior experience or collaborations, do consider asking
              for one.
            </Balancer>
          </p>
        </div>
      </div>
      {/* )} */}
    </div>
  );
};

export default page;
