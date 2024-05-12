'use client';

import { deleteOSS, updateOSS } from '@/app/_actions/oss';
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
import { OSSTAGS } from '@/lib/constants';
import { ossSchema } from '@/lib/schemas';
import { catchError, cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

type Inputs = z.infer<typeof ossSchema>;

const UpdateOSS = ({ oss }: { oss: Inputs & { id: string } }) => {
  const [isPending, startTransition] = useTransition();
  const [isDeleting, startDeletion] = useTransition();

  const form = useForm<Inputs>({
    resolver: zodResolver(ossSchema),
    defaultValues: {
      orgName: oss.orgName,
      orgUrl: oss.orgUrl,
      description: oss.description,
      url: oss.url,
      tags: oss.tags,
    },
    mode: 'onChange',
  });

  function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        toast.promise(
          new Promise<void>(async (resolve, reject) => {
            try {
              await updateOSS(oss.id, data);
              resolve();
            } catch (error) {
              reject(error);
            }
          }),
          {
            loading: 'Saving testimonial...',
            success: 'Testimonial saved successfully!',
            error: 'Failed to add testimonial.',
          }
        );
      } catch (err) {
        catchError(err);
      }
    });
  }

  function onDelete(id: string) {
    startDeletion(async () => {
      try {
        toast.promise(
          new Promise<void>(async (resolve, reject) => {
            try {
              await deleteOSS(id);
              resolve();
            } catch (error) {
              reject(error);
            }
          }),
          {
            loading: 'Deleting testimonial...',
            success: 'Testimonial deleted successfully!',
            error: 'Failed to delete testimonial.',
          }
        );
      } catch (err) {
        catchError(err);
      }
    });
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-2"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="orgName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name of the organization</FormLabel>
              <FormControl>
                <Input placeholder="Infisical.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="orgUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Org URL</FormLabel>
              <FormControl>
                <Input placeholder="https://infisical.com" {...field} />
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
                  rows={4}
                  placeholder="Infisical opened an issue to have the ability to create multiple organizations under the same account and switch between them seamlessly without logging in to different accounts, So shot a PR adding that feature within a day and got it merged!"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Describe the issue/s you fixed here.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contribution URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://github.com/org/repo/pulls/yourgithubusername"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Tags</FormLabel>
              <Popover modal>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        'w-[400px] justify-between',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value && field.value.length > 0
                        ? field.value[0] +
                          (field.value.length > 1
                            ? ' +' + (field.value.length - 1) + ' more'
                            : '')
                        : 'Pick Tags'}
                      <Icons.ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[400px] max-h-[300px] scrollbar-hide overflow-auto z-[400] p-0">
                  <Command>
                    <CommandInput placeholder="Search / scroll..." />
                    <CommandEmpty>Nothing found.</CommandEmpty>
                    <CommandGroup>
                      {OSSTAGS.map((t) => (
                        <CommandItem
                          value={t}
                          key={t}
                          onSelect={() => {
                            form.setValue(
                              'tags',
                              field.value.includes(t)
                                ? field.value.filter((v) => v !== t)
                                : [...field.value, t],
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
                              field.value.includes(t)
                                ? 'opacity-100'
                                : 'opacity-0'
                            )}
                          />
                          {t}
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
        <div className="flex justify-end items-center gap-2">
          <Button
            onClick={() => onDelete(oss.id)}
            type="button"
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
            <span className="sr-only">Delete Contribution</span>
          </Button>
          <Button type="submit" disabled={isPending || !form.formState.isDirty}>
            {isPending && (
              <Icons.Spinner
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Save
            <span className="sr-only">Edit Contribution</span>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UpdateOSS;
