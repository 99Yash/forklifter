'use client';

import { deleteProject, updateProject } from '@/app/_actions/project';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Form,
  FormControl,
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
import { tech } from '@/lib/constants';
import { projectSchema } from '@/lib/schemas';
import { catchError, cn, manualDialogClose } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

type Inputs = z.infer<typeof projectSchema>;

const UpdateProject = ({ project }: { project: Inputs & { id: string } }) => {
  const [isPending, startTransition] = useTransition();
  const [isDeleting, startDeleting] = useTransition();

  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      description: project.description,
      githubUrl: project.githubUrl,
      webUrl: project.webUrl,
      name: project.name,
      techStack: project.techStack,
    },
  });

  function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        toast.promise(
          new Promise<void>(async (resolve, reject) => {
            try {
              await updateProject(project.id, data);
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
        manualDialogClose();
      } catch (err) {
        catchError(err);
      }
    });
  }

  function onDelete(projectId: string) {
    startDeleting(async () => {
      try {
        toast.promise(
          new Promise<void>(async (resolve, reject) => {
            try {
              await deleteProject(projectId);
              resolve();
            } catch (error) {
              reject(error);
            }
          }),
          {
            loading: 'Deleting your project...',
            success: 'Project deleted successfully!',
            error: 'Failed to delete project.',
          }
        );
        manualDialogClose();
      } catch (err) {
        catchError(err);
      }
    });
  }

  return (
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
                  className="scrollbar-hide"
                  rows={6}
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
          )}
        />
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
                      {tech.map((t) => (
                        <CommandItem
                          value={t.value}
                          key={t.value}
                          onSelect={() => {
                            form.setValue(
                              'techStack',
                              field.value.includes(t.value)
                                ? field.value.filter((v) => v !== t.value)
                                : [...field.value, t.value],
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
                              field.value.includes(t.value)
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
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end items-center gap-2">
          <Button
            onClick={() => onDelete(project.id)}
            type="button"
            className="justify-self-end w-fit"
            variant={'destructive'}
            disabled={isDeleting}
          >
            {isDeleting && (
              <Icons.Spinner
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Delete
            <span className="sr-only">Delete Project</span>
          </Button>
          <Button
            type="submit"
            className="justify-self-end w-fit"
            disabled={isPending || !form.formState.isDirty}
          >
            {isPending && (
              <Icons.Spinner
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Save
            <span className="sr-only">Update Project</span>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UpdateProject;
