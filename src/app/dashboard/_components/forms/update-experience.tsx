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

const UpdateExperience = () => {
  return (
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
  );
};

export default UpdateExperience;
