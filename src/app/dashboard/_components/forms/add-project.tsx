"use client";

import { addProject } from "@/app/_actions/project";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from "@/components/ui/command";
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
import * as Icons from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { projectSchema } from "@/lib/schemas";
import { catchError, cn, manualDialogClose } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type Inputs = z.infer<typeof projectSchema>;

const languages = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
] as const

const AddProject = () => {
  const [isPending, startTransition] = useTransition()

  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(projectSchema),
    defaultValues:{
      description:"",
      githubUrl:"",
      webUrl:"",
      name:"",
      techStack:[]
    },
  });

  function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        await addProject(data)
        form.reset()
        toast.success("Project added successfully.")
        manualDialogClose()
      } catch (err) {
        catchError(err)
      }
    })
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
            You can add upto 3 projects in the FREE tier.
          </DialogDescription>
        </DialogHeader>
    <Form {...form}>
      <form
        className="grid w-full max-w-xl gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Type Project name here." {...field} />
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
                  placeholder="Type Project description here."
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
              <FormLabel>Code</FormLabel>
              <FormControl>
                <Input placeholder="Type github URL here." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}/>
        <FormField
          control={form.control}
          name="webUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input placeholder="Type Project URL here." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}/>
          <FormField
          control={form.control}
          name="techStack"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Language</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? languages.find(
                            (language) => field.value.includes(language.value)
                          )?.label
                        : "Select language"}
                      <Icons.ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] z-[400] p-0">
                  <Command>
                    <CommandInput placeholder="Search language..." />
                    <CommandEmpty>No language found.</CommandEmpty>
                    <CommandGroup>
                      {languages.map((language) => (
                        <CommandItem
                          value={language.label}
                          key={language.value}
                          onSelect={() => {
                            form.setValue("techStack", [language.value])
                          }}
                        >
                          <Icons.Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              field.value.includes(language.value)
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {language.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription> 
                This is the tech stack that will be shown next to this project.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="justify-self-end w-fit" disabled={isPending}>
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
  )
};

export default AddProject;
