import { getCurrentUser } from "@/lib/authOpts";
import { type Metadata } from "next";
import Balancer from "react-wrap-balancer";
import { ProjectCard } from "../_components/project-card";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const metadata: Metadata = {
  title: "Experiences",
  description: `Add experiences here.`,
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
          <h2 className="text-xl font-bold">Experiences</h2>
          <p className="text-muted-foreground">
            Highlight previous work experiences here.
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mt-4">Add an Experience</Button>
          </DialogTrigger>
          <DialogContent className="max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add a new Experience</DialogTitle>
              <DialogDescription>
                You can add upto 3 experiences in the FREE tier.
              </DialogDescription>
            </DialogHeader>
            <form action=""></form>
          </DialogContent>
        </Dialog>
      </div>
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* {experiences.map((experience) => (
          <li key={experience.id}>
            <ProjectCard experience={experience} />
          </li>
        ))} */}
      </ul>

      {/* {experiences.length === 0 && ( */}
      <div className="relative">
        <ul className="grid select-none grid-cols-1 gap-4 opacity-40 md:grid-cols-3">
          <ProjectCard.Skeleton pulse={false} />
          <ProjectCard.Skeleton pulse={false} />
          <ProjectCard.Skeleton pulse={false} />
        </ul>
        <div className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center">
          <h2 className="text-2xl font-bold">
            <Balancer>You haven&apos;t added experiences.</Balancer>
          </h2>
          <p className="text-md text-muted-foreground">
            <Balancer>
              Don&apos;t have any? Head over to the Contributions tab to add any
              Open Source contributions.
            </Balancer>
          </p>
        </div>
      </div>
      {/* )} */}
    </div>
  );
};

export default page;
