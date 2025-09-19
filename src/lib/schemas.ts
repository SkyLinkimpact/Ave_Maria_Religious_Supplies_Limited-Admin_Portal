import { z } from "zod";

export const storeCategoryRequestSchema = z.object({
  title: z
    .string()
    .min(1, "Title field is required")
    .min(3, "Title field sshould be atleat 3 characters long"),
  image: z.instanceof(File, { message: "Category Image is required" }),
});

export const updateCategoryRequestSchema = z.object({
  title: z
    .string()
    .min(1, "Title field is required")
    .min(3, "Title field sshould be atleat 3 characters long"),
});

export const storeProductRequestSchema = z.object({
  title: z
    .string()
    .min(1, "Title field is required")
    .min(3, "Title field should be atleast 3 characeters long"),
  description: z
    .string()
    .min(1, "Description field is required")
    .min(3, "Description field should be atleast 3 characeters long"),
  price: z.number().min(0.01, "Price should be atleast 0.01"),
  inventory: z.number().min(1, "Inventory field should be atleast 1"),
  category_id: z.string().min(1, "Category is required"),
  aws_link: z.string().optional(),
  images: z.instanceof(File, { message: "Product Image is required" }),
});

export const editProductRequestSchema = z.object({
  title: z
    .string()
    .min(1, "Title field is required")
    .min(3, "Title field should be atleast 3 characeters long"),
  price: z.number().min(0.01, "Price should be atleast 0.01"),
  inventory: z.number().min(1, "Inventory field should be atleast 1"),
  category_id: z.string().min(1, "Category is required"),
  aws_link: z.string().optional(),
});

export const loginRequestSchema = z.object({
  email: z.string().email().min(1, "Email field is required"),
  password: z.string().min(1, "Password field is required"),
});
