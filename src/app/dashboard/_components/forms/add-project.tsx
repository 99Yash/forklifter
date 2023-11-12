"use client";

import { addProject } from "@/app/_actions/project";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { projectSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import * as Icons from "@/components/ui/icons";

type Inputs = z.infer<typeof projectSchema>;

const AddProject = () => {
  const form = useForm<Inputs>({
    resolver: zodResolver(projectSchema),
  });

  const [isPending, startTransition] = useTransition();

  function onSubmit(data: Inputs) {
    console.log("fuc");
    startTransition(async () => {
      try {
        toast.promise(
          new Promise<void>(async (resolve, reject) => {
            try {
              await addProject(data);
              resolve();
            } catch (error) {
              reject(error);
            }
          }),
          {
            loading: "Adding project...",
            success: "Project added successfully!",
            error: "Failed to save project.",
          },
        );
        form.reset();
      } catch (err) {}
    });
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-4">Create a new Project</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add a new Project</DialogTitle>
          <DialogDescription>
            Add upto 3 projects in the FREE tier.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="flex flex-col gap-2"
            onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Sonner" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="An opinionated toast component for React."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="webUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deployed Link</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://sonner.emilkowal.ski/"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="githubUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Source Code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://github.com/emilkowalski/sonner"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    For the love of God, keep your code public.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending && (
                <Icons.Spinner
                  className="mr-2 h-4 w-4 animate-spin"
                  aria-hidden="true"
                />
              )}
              Add Project
              <span className="sr-only">Add Project</span>
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProject;
