// src/schemas/user.ts
import { z } from 'zod';

export const createUserSchema = z.object({
  body: z.object({
    name:      z.string().min(1, "Name is required"),
    email:     z.string().email("Invalid email address"),
    password:  z.string().min(8, "Password must be at least 8 chars"),
    age:       z.number().int().nonnegative().optional(),
    roles:     z.array(z.string()).optional(),
  }),
});

export const updateUserSchema = z.object({
  params: z.object({
    userId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid user ID"),
  }),
  body: z
    .object({
      name:  z.string().min(1).optional(),
      email: z.string().email().optional(),
      age:   z.number().int().nonnegative().optional(),
      roles: z.array(z.string()).optional(),
    })
    .refine((data) => Object.keys(data).length > 0, "At least one field must be updated"),
});

export const getUserParamsSchema = z.object({
    userId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid user ID"),
  });

export const deleteUserSchema = z.object({
  params: z.object({
    userId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid user ID"),
  }),
});

export type CreateUserInput = z.infer<typeof createUserSchema>["body"];
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
