"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function AddBlog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-4">Add Media</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Link a new Blog</DialogTitle>
          <DialogDescription>You can change this later.</DialogDescription>
        </DialogHeader>
        {/* <Form {...form}>
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
									<Input
										placeholder="Developer Relations Engineer"
										{...field}
									/>
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
									<Textarea {...field} />
								</FormControl>
								<FormDescription>
									Highlight your work here.
								</FormDescription>
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
									<Popover modal open={startDatePickerOpen} onOpenChange={setStartDatePickerOpen}>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant={"outline"}
													className={cn(
														"w-[240px] pl-3 text-left font-normal",
														!field.value && "text-muted-foreground",
													)}
												>
													{field.value ? (
														format(field.value, "PPP")
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
												selected={field.value}
												onSelect={
													(date) => {
														field.onChange(date);
														setStartDatePickerOpen(false);
													}
												}
												disabled={(date) =>
													date > new Date()
												}
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
									<Popover open={endDatePickerOpen} onOpenChange={setEndDatePickerOpen}>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant={"outline"}
													className={cn(
														"w-[240px] pl-3 text-left font-normal",
														!field.value && "text-muted-foreground",
													)}
												>
													{field.value ? (
														format(field.value, "PPP")
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
												selected={field.value}
												onSelect={
													(date) => {
														field.onChange(date);
														setEndDatePickerOpen(false);
													}
												}
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
					<Button type="submit" className="w-full" disabled={isPending}>
						{isPending && (
							<Icons.Spinner
								className="mr-2 h-4 w-4 animate-spin"
								aria-hidden="true"
							/>
						)}
						Add Experience
						<span className="sr-only">Add Experience</span>
					</Button>
				</form>
			</Form> */}
        ksdmksmd
      </DialogContent>
    </Dialog>
  );
}
