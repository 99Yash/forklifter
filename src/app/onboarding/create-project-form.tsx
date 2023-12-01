import { addTestimonial } from "@/app/_actions/testimonial";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { testimonialSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import type { UseFormProps } from "react-hook-form";
import { toast } from "sonner";
import type { ZodType, z } from "zod";

export function useZodForm<TSchema extends ZodType>(
  props: Omit<UseFormProps<TSchema["_input"]>, "resolver"> & {
    schema: TSchema;
  },
) {
  const form = useForm<TSchema["_input"]>({
    ...props,
    resolver: zodResolver(props.schema, undefined),
  });

  return form;
}


export const CreateProjectForm = (props: {
  // defaults to redirecting to the project page
  onSuccess?: (project: z.infer<typeof testimonialSchema> & { id: string }) => void;
}) => {
  const router = useRouter();

  const form = useZodForm({ schema: testimonialSchema });

  async function onSubmit(data: z.infer<typeof testimonialSchema>) {
    try {
       const testimonial= await addTestimonial(data)
      if (props.onSuccess) {
        props.onSuccess({
          ...data,
          id: testimonial.id,
        });
      } else {
        router.push(`/dashboard/testimonials`);
      }
      toast.success("Testimonial added",{
        description: `Testimonial from ${data.author} added successfully.`,
      });
    } catch (error) {
      toast.error("Error saving testimonial",{
        description:
          "An issue occurred while creating your testimonial. Please try again.",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 min-w-lg">
        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author *</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Sedat Akkus" />
              </FormControl>
              <FormDescription>
                A name to identify your app in the dashboard.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
 <FormField
              control={form.control}
              name="designation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Designation</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Sr. Computer Scientist. Adobe, CA"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
        <FormField
          control={form.control}
          name="authorUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input {...field} placeholder="https://acme-corp.com" />
              </FormControl>
              <FormDescription>The URL of your app</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
<FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={7}
                      {...field}
                      placeholder="One of the best engineers I've worked with. I've never seen someone deliver multiple long-term features for our product at such an astonishing speed. He estimates tasks in hours, not days, which is a testament to his work ethic. He also has a keen eye for design and prioritizes the user's perspective before releasing anything to production. Despite the time zone difference, he consistently ensures that our working hours overlap..."
                    />
                  </FormControl>
                </FormItem>
              )}
            />
        <Button type="submit">Create Project</Button>
      </form>
    </Form>
  );
};