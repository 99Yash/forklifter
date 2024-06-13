'use client';

import { addProject } from '@/app/_actions/project';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import * as Icons from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { stacks, tech } from '@/lib/constants';
import { projectSchema } from '@/lib/schemas';
import { catchError, cn, manualDialogClose } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

type Inputs = z.infer<typeof projectSchema>;

const AddProject = () => {
  const [isPending, startTransition] = useTransition();

  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      description: '',
      githubUrl: '',
      webUrl: '',
      name: '',
      techStack: [],
    },
    mode: 'onChange',
  });

  function onSubmit(data: Inputs) {
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
            loading: 'Saving your project...',
            success: 'Project saved successfully!',
            error: 'Failed to save project.',
          }
        );
        form.reset();
        manualDialogClose();
      } catch (err) {
        catchError(err);
      }
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-4">Add a new Project</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add a new Project</DialogTitle>
          <DialogDescription>
            Get started with the basics of your project .
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
                    <Input placeholder="Name of the project" {...field} />
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
                      className="scrollbar-hide"
                      placeholder="Project description."
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
                    <Input placeholder="Source code URL." {...field} />
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
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Project URL." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="techStack"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Tech Stack</FormLabel>
                  <Popover modal>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            'w-[200px] justify-between',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value.length
                            ? field.value[0] +
                              (field.value.length > 1
                                ? ' +' + (field.value.length - 1) + ' more'
                                : '')
                            : 'Select Tech Stack'}
                          <Icons.ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] max-h-[300px] scrollbar-hide overflow-auto z-[400] p-0">
                      <Command>
                        <CommandInput
                          placeholder={`Search ${tech.length} stacks`}
                        />
                        <CommandEmpty>Nothing found.</CommandEmpty>
                        <CommandGroup>
                          {stacks.map((t) => (
                            <CommandItem
                              value={t.label}
                              key={t.label}
                              onSelect={() => {
                                form.setValue(
                                  'techStack',
                                  field.value.includes(t.label)
                                    ? field.value.filter((v) => v !== t.label)
                                    : [...field.value, t.label],
                                  {
                                    shouldValidate: true,
                                    shouldDirty: true,
                                    shouldTouch: true,
                                  }
                                );
                              }}
                            >
                              <Icons.Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  field.value.includes(t.label)
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                )}
                              />
                              {t.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    This is the tech stack that will be shown next to this
                    project.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="justify-self-end w-fit"
              disabled={
                isPending ||
                form.formState.isSubmitting ||
                !form.formState.isValid
              }
            >
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
