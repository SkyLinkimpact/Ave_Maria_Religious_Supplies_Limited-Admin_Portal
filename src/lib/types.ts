import { z } from "zod";
import {
  editProductRequestSchema,
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
  inventory: number;
  category: Category;
  createdAt: string;
  images: string[];
  awsLink?: string;
};

export type Products = PaginatedResponse<Product>;
