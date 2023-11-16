"use client";

import { addOSS } from "@/app/_actions/oss";
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
import * as Icons from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ossSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { catchError, manualDialogClose } from '../../../../lib/utils';

type Inputs = z.infer<typeof ossSchema>;

const AddOSS = () => {
  const form = useForm<Inputs>({
    resolver: zodResolver(ossSchema),
    defaultValues:{
      tags:[]
    }
  });

  const [isPending, startTransition] = useTransition();

  function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        toast.promise(
          new Promise<void>(async (resolve, reject) => {
            try {
              await addOSS(data);
              resolve();
            } catch (error) {
              reject(error);
            }
          }),
          {
            loading: "Saving contribution...",
            success: "Contribution added successfully!",
            error: "Failed to add contribution.",
          },
          );
          form.reset();
          manualDialogClose()
        } catch (err) {
          catchError(err)
        }
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-4">Add a new Contribution</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add a Contribution</DialogTitle>
          <DialogDescription>
            You can add upto 3 contributions in the FREE tier.
          </DialogDescription>
        </DialogHeader>
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
                      rows={4}
                      placeholder="Infisical opened an issue to have the ability to create multiple organizations under the same account and switch between them seamlessly without logging in to different accounts, So shot a PR adding that feature within day and got it merged!"
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
                  <FormLabel>Contribution URLs</FormLabel>
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
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending && (
                <Icons.Spinner
                  className="mr-2 h-4 w-4 animate-spin"
                  aria-hidden="true"
                />
              )}
              Add Contribution
              <span className="sr-only">Add Contribution</span>
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddOSS;
