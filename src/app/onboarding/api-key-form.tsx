"use client";

import React from "react";
import { add, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useZodForm } from "./create-project-form";
import { z } from "zod";
import { toast } from "sonner";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

export const createApiKeySchema = z.object({
  projectId: z.string(),
  name: z.string(),
  expiresAt: z.date().optional(),
});
export type CreateApiKey = z.infer<typeof createApiKeySchema>;
export function CreateApiKeyForm(props: {
  projectId: string;
  onSuccess?: (key: string) => void;
}) {

  const [datePickerOpen, setDatePickerOpen] = React.useState(false);

  const form = useZodForm({
    schema: createApiKeySchema,
    defaultValues: { projectId: props.projectId },
  });

  async function onSubmit(data: CreateApiKey) {
    try {
      // const apiKey = await api.project.createApiKey.mutate(data);
      const apiKey="hardcodedApiKey"
      form.reset();
      props.onSuccess?.(apiKey);
      toast.success("API Key created",{
        description: `Project ${data.name} created successfully.`,
      });
    } catch (error) {
      toast.error("Error creating API Key",{
        description:
          "An issue occurred while creating your key. Please try again.",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name *</FormLabel>
              <FormControl>
                <Input {...field} placeholder="New Token" />
              </FormControl>
              <FormDescription>
                Enter a unique name for your token to differentiate it from
                other tokens.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="expiresAt"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Expiration date</FormLabel>
              <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className="pl-3 text-left font-normal"
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span className="text-muted-foreground">
                          Pick a date
                        </span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => {
                      field.onChange(date);
                      setDatePickerOpen(false);
                    }}
                    disabled={(date) =>
                      // future dates up to 1 year only
                      date < new Date() || date > add(new Date(), { years: 1 })
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                We <b>strongly recommend</b> you setting an expiration date for
                your API key, but you can also leave it blank to create a
                permanent key.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">
          {form.formState.isSubmitting && (
            <div className="mr-1" role="status">
              <div className="h-3 w-3 animate-spin rounded-full border-2 border-background border-r-transparent" />
            </div>
          )}
          Create Key
        </Button>
      </form>
    </Form>
  );
}