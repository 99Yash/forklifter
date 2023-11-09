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

const UpdateOSS = () => {
  return (
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
  );
};

export default UpdateOSS;
