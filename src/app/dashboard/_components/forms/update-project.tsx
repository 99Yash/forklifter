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

const UpdateProject = () => {
  return (
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
  );
};

export default UpdateProject;
