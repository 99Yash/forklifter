import { z } from "zod";
import { OSSTAGS } from "./constants";

export const profileFormSchema = z.object({
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

export const projectSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().min(1).max(500),
  githubUrl: z.string().url(),
  webUrl: z.string().url(),
  techStack: z
    .array(z.string())
    .refine((items) => new Set(items).size === items.length, {
      message: "All Tech must be unique",
    }),
});

export const extendedProjectSchema = projectSchema.extend({
  userId: z.string(),
});

export const experienceSchema = z.object({
  position: z.string().min(1).max(255),
  description: z.string().min(1).max(500),
  orgName: z.string().min(1).max(25),
  orgUrl: z
    .string()
    .min(1, {
      message: "Please enter a valid URL.",
    })
    .url({
      message: "Please enter a valid URL.",
    }),
  startDate: z.date({
    required_error: "A starting date is missing.",
  }),
  endDate: z.date().optional(),
});

export const extendedExperienceSchema = experienceSchema.extend({
  userId: z.string(),
});

export const ossSchema = z.object({
  orgName: z.string().min(1).max(200),
  description: z.string().min(1).max(500),
  tags: z.array(
    z.enum([
      "Feature",
      "Bug",
      "Enhancement",
      "Documentation",
      "Chore",
      "Test",
      "Fix",
      "Other",
    ]),
  ),
  url: z.string().url({
    message: "Please enter a valid URL",
  }),
});

export const extendedOssSchema = ossSchema.extend({
  userId: z.string(),
});

export const testimonialSchema = z.object({
  author: z
    .string()
    .min(1, {
      message: "Author must be between 1 and 20 characters",
    })
    .max(20, {
      message: "Author must be between 1 and 20 characters",
    }),
  designation: z
    .string()
    .min(1, {
      message: "Designation must be between 1 and 20 characters",
    })
    .max(40, {
      message: "Designation must be between 1 and 40 characters",
    }),
  authorUrl: z
    .string()
    .min(1, {
      message: "Please enter a valid URL for the author",
    })
    .url({
      message: "Please enter a valid URL for the author",
    }),
  message: z
    .string()
    .min(1, {
      message: "Message must be between 1 and 200 characters",
    })
    .max(200, {
      message: "Message must be between 1 and 200 characters",
    }),
});

export const extendedTestimonialSchema = testimonialSchema.extend({
  userId: z.string(),
});
