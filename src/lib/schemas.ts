import { z } from "zod";

export const storeCategoryRequestSchema = z.object({
  title: z
    .string()
    .min(1, "Title field is required")
    .min(3, "Title field sshould be atleat 3 characters long"),
});

export const updateCategoryRequestSchema = z.object({
  title: z
    .string()
    .min(1, "Title field is required")
    .min(3, "Title field sshould be atleat 3 characters long"),
});
