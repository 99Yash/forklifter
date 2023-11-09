"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const AddProject = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-4">Create a new Project</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add a new Project</DialogTitle>
          <DialogDescription>
            You can add upto 3 projects in the FREE tier.
          </DialogDescription>
        </DialogHeader>
        <form action=""></form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProject;
