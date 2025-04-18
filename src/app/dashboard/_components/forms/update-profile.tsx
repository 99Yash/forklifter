'use client';

import { Button } from '@/components/ui/button';
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
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { updateProfile } from '@/app/_actions/profile';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { stackl } from '@/lib/constants';
import { profileFormSchema } from '@/lib/schemas';

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const timezones = Intl.supportedValuesOf('timeZone');

export function ProfileForm({
  user,
}: {
  user: {
    name: string;
    username: string;
    email: string;
    oneLiner: string | null;
    bio: string | null;
    twitterUrl: string | null;
    githubUrl: string | null;
    linkedinUrl: string | null;
    techStack: Array<(typeof stackl)[number]>;
  };
}) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      displayName: user.name,
      username: user.username,
      email: user.email,
      bio: user.bio ?? '',
      oneLiner: user.oneLiner ?? '',
      twitterUrl: user.twitterUrl ?? '',
      githubUrl: user.githubUrl ?? '',
      linkedinUrl: user.linkedinUrl ?? '',
      techStack: user.techStack,
    },
    mode: 'onChange',
  });

  function onSubmit(data: ProfileFormValues) {
    startTransition(async () => {
      toast.promise(
        new Promise<void>(async (resolve, reject) => {
          try {
            await updateProfile(data);
            setTimeout(() => {
              window.location.reload();
            }, 100);
            resolve();
          } catch (error) {
            reject(error);
          }
        }),
        {
          loading: 'Saving profile...',
          success: 'Profile saved successfully!',
          error: 'Failed to save profile.',
        }
      );
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 items-center w-full gap-2">
          <FormField
            control={form.control}
            name="displayName"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Display Name</FormLabel>
                <FormControl>
                  <Input autoComplete="off" placeholder="Yash" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="flex items-center gap-2">
                  Email
                  <Icons.MailSearch className="h-4 w-4 text-gray-500" />
                </FormLabel>
                <FormControl>
                  <Input
                    autoComplete="off"
                    placeholder="user@test.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-2 lg:items-center">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="flex-1 shrink">
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input autoComplete="off" placeholder="ygkr" {...field} />
                </FormControl>
                <FormDescription className="flex gap-2 items-center text-yellow-600">
                  <Icons.Warning className="h-4 w-4" />
                  Existing links wont redirect you to the new page on changing
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="oneLiner"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>One Liner</FormLabel>
                <FormControl>
                  <Input
                    placeholder="The best Jr. 'Founding' Fullstack Engineer you're going to find."
                    {...field}
                  />
                </FormControl>
                <FormDescription className="flex gap-2 items-center">
                  <Icons.Info className="h-4 w-4" />
                  Keep this short.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          <FormField
            control={form.control}
            name="linkedinUrl"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="flex gap-2 items-end">
                  LinkedIn
                  <Icons.LinkedIn className="h-4 w-4 text-gray-500" />
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://linkedin.com/in/ygkr"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="flex gap-2 items-center">
                  Your Linkedin profile URL.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="twitterUrl"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="flex gap-2 items-end">
                  Twitter
                  <Icons.Twitter className="h-4 w-4 text-gray-500" />
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://twitter.com/YashGouravKar1"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="flex gap-2 items-center">
                  Link to your Twitter profile.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="githubUrl"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="flex gap-2 items-end ">
                  Github
                  <Icons.GitHub className="h-4 w-4 text-gray-500" />
                </FormLabel>
                <FormControl>
                  <Input placeholder="https://github.com/99yash" {...field} />
                </FormControl>
                <FormDescription className="flex gap-2 items-center">
                  Link to your Github profile.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="techStack"
            render={({ field }) => (
              <FormItem className="flex-1 flex flex-col">
                <FormLabel>Tech Stack</FormLabel>
                <Popover modal>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          ' justify-between',
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
                  <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[300px] scrollbar-hide overflow-auto z-[400] p-0">
                    <Command>
                      <CommandInput
                        placeholder={`Search ${stackl.length} stacks`}
                      />
                      <CommandEmpty>Nothing found.</CommandEmpty>
                      <CommandGroup>
                        {stackl.map((t) => (
                          <CommandItem
                            value={t}
                            key={Math.random()}
                            onSelect={() => {
                              form.setValue(
                                'techStack',
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
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  className="scrollbar-hide"
                  rows={5}
                  placeholder="Hi, my name is Yash. I'm a full-stack developer building apps with TRPC and the new NextJS router."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending || !form.formState.isDirty}>
          {isPending && (
            <Icons.Spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Update profile
        </Button>
      </form>
    </Form>
  );
}
