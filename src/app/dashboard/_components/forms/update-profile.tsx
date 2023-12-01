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

import { zodResolver } from "@hookform/resolvers/zod";
import {motion} from 'framer-motion'
import { useForm } from "react-hook-form";
import { z } from "zod";
import * as Icons from "@/components/ui/icons";
import { toast } from "sonner";
import { profileFormSchema } from "@/lib/schemas";
import { Textarea } from "@/components/ui/textarea";

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
      bio: user.bio ?? "",
      oneLiner: user.oneLiner ?? "",
      twitterUrl: user.twitterUrl ?? "",
      githubUrl: user.githubUrl ?? "",
      linkedinUrl: user.linkedinUrl ?? "",
    },
    mode: "onChange",
  });

  function onSubmit(data: ProfileFormValues) {
    toast.success("You've submitted the form.");
  }

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <Form {...form}>
      <motion.form initial="hidden" variants={container} animate="visible" onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <motion.div variants={item} className="flex gap-2 items-center lg:flex-row flex-col">
        <FormField
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display Name</FormLabel>
              <FormControl>
                <Input autoComplete="off" placeholder={user.name.split(' ')[0]} {...field} />
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
            <FormItem className="flex-1 mt-2">
              <FormLabel className="flex gap-2 items-end" >Email
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
          </motion.div>
          <motion.div variants={item} className="flex lg:flex-row flex-col gap-2 items-center">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="flex-1" >
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
            <FormItem className="flex-1" >
              <FormLabel>One Liner</FormLabel>
              <FormControl>
                <Input placeholder={user.oneLiner ?? "A person who loves to build the web"} {...field} />
              </FormControl>
              <FormDescription className="flex gap-2 items-center" >
                <Icons.Info className="h-4 w-4"/>
                Keep this really short.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />    
          </motion.div>
          <motion.div variants={item} className="grid gap-2 grid-cols-3">
          <FormField
          control={form.control}
          name="linkedinUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex gap-2 items-end" >LinkedIn
                <Icons.LinkedIn className="h-4 w-4 text-gray-500" />
              </FormLabel>
              <FormControl>
                <Input placeholder={user.linkedinUrl ?? "https://linkedin.com/in/ygkr"} {...field} />
              </FormControl>
              <FormDescription className="flex gap-2 items-center" >
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
            <FormItem>
              <FormLabel className="flex gap-2 items-end" >
                Twitter 
                <Icons.Twitter className="h-4 w-4 text-gray-500" />
                </FormLabel>
              <FormControl>
                <Input placeholder={user.twitterUrl ?? 
                "https://twitter.com/YashGouravKar1"} {...field} />
              </FormControl>
              <FormDescription className="flex gap-2 items-center" >
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
              <FormLabel className="flex gap-2 items-end " >Github
              <Icons.GitHub className="h-4 w-4 text-gray-500" />
              </FormLabel>
              <FormControl>
                <Input placeholder={user.githubUrl ?? 
                        "https:/github.com/99yash"} {...field} />
              </FormControl>
              <FormDescription className="flex gap-2 items-center" >
          Link to your Github profile.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
          />
          </motion.div>
          <motion.div variants={item} className="flex flex-col gap-4" >
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea rows={4} placeholder="Hi, my name is Yash. I'm a full-stack developer building apps with TRPC and the new NextJS router." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />
        <Button type="submit">Update profile</Button>
          </motion.div>
      </motion.form>
    </Form>
  );
}