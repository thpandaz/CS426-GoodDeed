import { z } from 'zod';

const locationSchema = z.object({
  city: z.string().min(1, "City is required").trim(),
  country: z.string().min(1, "Country is required").trim(),
  state: z.string().min(1, "State is required").trim(),
  cordinates: z.object({
    lat: z.number().min(-90).max(90, "Latitude must be between -90 and 90"),
    long: z.number().min(-180).max(180, "Longitude must be between -180 and 180"),
  }),
});

const reputationSchema = z.object({
  score: z.number().min(0).max(5, "Score must be between 0 and 5"),
  amount_of_reviews: z.number().int().nonnegative("Number of reviews cannot be negative"),
});

export const createOrganizationSchema = z.object({
  body: z.object({
    clerkId: z.string().min(1, "ClerkId is required").trim(),
    name: z.string().min(1, "Name is required").trim(),
    email: z.string().email("Invalid email address").toLowerCase().trim(),
    location: locationSchema,
    phone: z.string().min(1, "Phone is required")
      .regex(/^\+?[\d\s-()]+$/, "Invalid phone number format"),
    industry: z.string().min(1, "Industry is required").trim(),
    reputation: reputationSchema.default({ score: 0, amount_of_reviews: 0 }),
    events: z.array(z.string().min(1, "Event ID cannot be empty")).default([]),
  }),
});

export const updateOrganizationSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid organization ID"),
  }),
  body: z.object({
    name: z.string().min(1).trim().optional(),
    email: z.string().email().toLowerCase().trim().optional(),
    location: locationSchema.optional(),
    phone: z.string()
      .regex(/^\+?[\d\s-()]+$/, "Invalid phone number format")
      .optional(),
    industry: z.string().min(1).trim().optional(),
    reputation: reputationSchema.optional(),
    events: z.array(z.string().min(1, "Event ID cannot be empty")).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, "At least one field must be updated"),
});

export const getOrganizationParamsSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid organization ID"),
});

export const addEventSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid organization ID"),
  }),
  body: z.object({
    eventId: z.string().min(1, "Event ID is required").trim(),
  }),
});

export const removeEventSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid organization ID"),
    eventId: z.string().min(1, "Event ID is required").trim(),
  }),
});

export const updateReputationSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid organization ID"),
  }),
  body: z.object({
    score: z.number()
      .min(0, "Score cannot be negative")
      .max(5, "Score must be between 0 and 5")
      .multipleOf(0.1, "Score must be a multiple of 0.1"),
  }),
});

export type CreateOrganizationInput = z.infer<typeof createOrganizationSchema>["body"];
export type UpdateOrganizationInput = z.infer<typeof updateOrganizationSchema>; 