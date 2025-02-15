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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { experienceSchema } from '@/lib/schemas';
import { catchError, cn, manualDialogClose } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { deleteExperience, updateExperience } from '@/app/_actions/experience';
import { Calendar } from '@/components/ui/calendar';
import { add, format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

type Inputs = z.infer<typeof experienceSchema>;
type InputsOverride = Omit<Inputs, 'endDate'> & { endDate: Date | null };

export const UpdateExperience = ({
  experience,
}: {
  experience: InputsOverride & { id: string };
}) => {
  const [isPending, startTransition] = useTransition();
  const [isDeleting, startDeleting] = useTransition();

  const [startDatePickerOpen, setStartDatePickerOpen] = useState(false);
  const [endDatePickerOpen, setEndDatePickerOpen] = useState(false);

  const form = useForm<Inputs>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      orgName: experience.orgName,
      orgUrl: experience.orgUrl,
      description: experience.description,
      position: experience.position,
      startDate: experience.startDate,
      endDate: experience.endDate === null ? undefined : experience.endDate,
    },
    mode: 'onChange',
  });

  function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        toast.promise(
          new Promise<void>(async (resolve, reject) => {
            try {
              await updateExperience(experience.id, data);
              resolve();
            } catch (error) {
              reject(error);
            }
          }),
          {
            loading: 'Saving details...',
            success: 'Experience saved successfully!',
            error: 'Failed to save experience.',
          }
        );
        manualDialogClose();
      } catch (err) {
        catchError(err);
      }
    });
  }

  function onDelete(expId: string) {
    startDeleting(async () => {
      try {
        toast.promise(
          new Promise<void>(async (resolve, reject) => {
            try {
              await deleteExperience(expId);
              resolve();
            } catch (error) {
              reject(error);
            }
          }),
          {
            loading: 'Deleting experience...',
            success: 'Experience deleted successfully!',
            error: 'Failed to delete experience.',
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
        className="space-y-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position</FormLabel>
              <FormControl>
                <Input placeholder="Developer Relations Engineer" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between gap-4">
          <FormField
            control={form.control}
            name="orgName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input placeholder="Cal.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="orgUrl"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input placeholder="https://cal.com/" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea rows={4} className="scrollbar-hide" {...field} />
              </FormControl>
              <FormDescription>Highlight your work here.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between gap-4">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Joined</FormLabel>
                <Popover
                  modal
                  open={startDatePickerOpen}
                  onOpenChange={setStartDatePickerOpen}
                >
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-[240px] pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <Icons.Calendar className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="fixed w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => {
                        field.onChange(date);
                        setStartDatePickerOpen(false);
                      }}
                      disabled={(date) => date > new Date()}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Left</FormLabel>
                <Popover
                  open={endDatePickerOpen}
                  onOpenChange={setEndDatePickerOpen}
                >
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-[240px] pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="fixed w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value === null ? undefined : field.value}
                      onSelect={(date) => {
                        field.onChange(date);
                        setEndDatePickerOpen(false);
                      }}
                      disabled={(date) =>
                        // future dates up to 6 months, in case employee knows he'll be leaving in advance
                        date > add(new Date(), { months: 6 })
                      }
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Leave untouched if you&apos;re still working.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center gap-2 justify-end">
          <Button
            onClick={() => onDelete(experience.id)}
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
            <span className="sr-only">Delete Experience</span>
          </Button>
          <Button
            type="submit"
            disabled={
              isPending || !form.formState.isDirty || !form.formState.isValid
            }
          >
            Save
            <span className="sr-only">Edit Experience</span>
          </Button>
        </div>
      </form>
    </Form>
  );
};
