"use client";
import { Button } from "@/components/ui/button";
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
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import * as Icons from "@/components/ui/icons";

const profileFormSchema = z.object({
  displayName: z
    .string()
    .min(2, {
      message: "displayName must be at least 2 characters.",
    })
    .max(30, {
      message: "displayName must not be longer than 30 characters.",
    }),
  username: z
    .string()
    .min(1, {
      message: "username must be at least 1 characters.",
    })
    .max(25, {
      message: "username must not be longer than 25 characters.",
    }),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: "Please enter a valid URL." }),
      }),
    )
    .optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileForm({
  user,
}: {
  user: {
    name: string;
    username: string;
    email: string;
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
    },
    mode: "onChange",
  });

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display Name</FormLabel>
              <FormControl>
                <Input autoComplete="off" placeholder="Yash" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name. It can be your real name or a
                pseudonym.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
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
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input autoComplete="off" placeholder="ygkonline" {...field} />
              </FormControl>
              <FormDescription className="flex gap-2 text-yellow-600">
                <Icons.Warning className="h-4 w-4" />
                This is your username. Existing links wont redirect you to the
                new page on changing the username.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update profile</Button>
      </form>
    </Form>
  );
}
