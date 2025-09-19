import { z } from "zod";
import {
  editProductRequestSchema,
  loginRequestSchema,
  storeCategoryRequestSchema,
  storeProductRequestSchema,
  updateCategoryRequestSchema,
} from "./schemas";

export type ServerMessageResponse = {
  message: string;
};

export type ServerErrorResponse = {
  response: {
    data: {
      message: string;
    };
  };
};

export type Category = {
  id: string;
  title: string;
  slug: string;
  image?: string;
  createdAt: string;
};

export type StoreCategoryRequest = z.infer<typeof storeCategoryRequestSchema>;

export type UpdateCategoryRequest = z.infer<typeof updateCategoryRequestSchema>;

export type StoreProductRequest = z.infer<typeof storeProductRequestSchema>;

export type EditProductRequest = z.infer<typeof editProductRequestSchema>;

type PaginatedResponse<T> = {
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    total: number;
  };
};

export type Product = {
  id: string;
  title: string;
  slug: string;
  price: number;
  description: string;
  inventory: number;
  category: Category;
  createdAt: string;
  images: string[];
  awsLink?: string;
};

export type Products = PaginatedResponse<Product>;

export type InventorySummary = {
  inventoryCount: number;
  inventoryPrice: number;
};

export type CategoryWithProductCount = {
  id: string;
  title: string;
  productCount: number;
};

export type LoginRequest = z.infer<typeof loginRequestSchema>;

export type LoginResponse = {
  token: string;
};

export type User = {
  id: number;
  name: string;
  isAdmin: boolean;
};
