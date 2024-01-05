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
import { Input } from '@/components/ui/input';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import * as Icons from '@/components/ui/icons';
import { toast } from 'sonner';
import { profileFormSchema } from '@/lib/schemas';
import { Textarea } from '@/components/ui/textarea';
import { useTransition } from 'react';
import { catchError } from '@/lib/utils';
import { updateProfile } from '@/app/_actions/profile';

type ProfileFormValues = z.infer<typeof profileFormSchema>;

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
  };
}) {
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
    },
    mode: 'onChange',
  });

  const [isPending, startTransition] = useTransition();

  function onSubmit(data: ProfileFormValues) {
    startTransition(async () => {
      try {
        if (
          data.displayName === user.name &&
          data.username === user.username &&
          data.email === user.email &&
          data.bio === user.bio &&
          data.oneLiner === user.oneLiner &&
          data.twitterUrl === user.twitterUrl &&
          data.githubUrl === user.githubUrl &&
          data.linkedinUrl === user.linkedinUrl
        ) {
          return;
        }
        await updateProfile(data);
        toast.success('Profile updated successfully!');
      } catch (error) {
        catchError(error);
      }
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col w-full lg:flex-row gap-2">
          <FormField
            control={form.control}
            name="displayName"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Display Name</FormLabel>
                <FormControl>
                  <Input autoComplete="off" placeholder="Yash" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name. It can be your real name or
                  a pseudonym.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="flex gap-2 items-end">
                  Email
                  <Icons.Mail className="h-4 w-4 text-gray-500" />
                </FormLabel>
                <FormControl>
                  <Input
                    autoComplete="off"
                    placeholder="user@test.com"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is your primary contact method.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col lg:flex-row gap-2 lg:items-center">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input autoComplete="off" placeholder="ygkr" {...field} />
                </FormControl>
                <FormDescription className="flex gap-2 items-center text-yellow-600">
                  <Icons.Warning className="h-4 w-4" />
                  Existing links wont redirect you to a new page on changing the
                  username.
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
                  Keep this really short.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid gap-2 grid-cols-3">
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
        </div>
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  rows={4}
                  placeholder="Hi, my name is Yash. I'm a full-stack developer building apps with TRPC and the new NextJS router."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
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
