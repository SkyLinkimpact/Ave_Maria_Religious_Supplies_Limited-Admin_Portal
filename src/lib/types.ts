import { z } from "zod";
import {
  storeCategoryRequestSchema,
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
