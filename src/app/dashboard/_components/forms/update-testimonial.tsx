'use client';

import {
  deleteTestimonial,
  updateTestimonial,
} from '@/app/_actions/testimonial';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import * as Icons from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { testimonialSchema } from '@/lib/schemas';
import { catchError } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

type Inputs = z.infer<typeof testimonialSchema>;

const UpdateTestimonial = ({
  testimonial,
}: {
  testimonial: Inputs & { id: string };
}) => {
  const [isPending, startTransition] = useTransition();
  const [isDeleting, startDeletion] = useTransition();

  const form = useForm<Inputs>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      author: testimonial.author,
      authorUrl: testimonial.authorUrl,
      designation: testimonial.designation,
      message: testimonial.message,
    },
    mode: 'onChange',
  });

  function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        toast.promise(
          new Promise<void>(async (resolve, reject) => {
            try {
              await updateTestimonial(testimonial.id, data);
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
              await deleteTestimonial(id);
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
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Robert Crawford" />
              </FormControl>
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
                  placeholder="Sr. Computer Scientist at Adobe, California"
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
                <Input {...field} placeholder="https://linkedin.com/in/..." />
              </FormControl>
              <FormDescription>
                A link that points to the author&apos;s page.
              </FormDescription>
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
                  className="scrollbar-hide"
                  rows={7}
                  {...field}
                  placeholder="One of the best engineers I've worked with. I've never seen someone deliver multiple long-term features for our product at such an astonishing speed. He estimates tasks in hours, not days, which is a testament to his work ethic. He also has a keen eye for design and prioritizes the user's perspective before releasing anything to production. Despite the time zone difference, he consistently ensures that our working hours overlap..."
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex justify-end items-center gap-2">
          <Button
            type="button"
            variant={'destructive'}
            onClick={() => onDelete(testimonial.id)}
            disabled={isDeleting}
          >
            {isDeleting && (
              <Icons.Spinner
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Delete
          </Button>
          <span className="sr-only">Delete Testimonial</span>
          <Button type="submit" disabled={isPending || !form.formState.isDirty}>
            Save
            <span className="sr-only">Update Testimonial</span>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UpdateTestimonial;
