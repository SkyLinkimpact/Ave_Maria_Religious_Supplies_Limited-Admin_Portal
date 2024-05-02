import {
  Category,
  CategoryWithProductCount,
  ServerMessageResponse,
  StoreCategoryRequest,
  UpdateCategoryRequest,
} from "@/lib/types";
import axiosInstance from ".";

/**
 * Get all available categories
 *
 * @returns All categories
 */
export async function getCategories() {
  const res = await axiosInstance.get<Category[]>("categories");

  return res.data;
}

/**
 * Store new category
 *
 * @param payload Request payload
 * @returns Server response
 */
export async function storeCategory(payload: StoreCategoryRequest) {
  const res = await axiosInstance.post<ServerMessageResponse>(
    "categories",
    payload
  );

  return res.data;
}

/**
 * Delete category by id
 *
 * @param categoryId Category Id
 * @returns
 */
export async function deleteCategory(categoryId: string) {
  const res = await axiosInstance.delete(`categories/${categoryId}`);

  return res.data;
}

/**
 * Edit category
 *
 * @param categoryId Category id
 * @param payload Request payload
 * @returns Server response
 */
export async function editCategory(
  categoryId: string,
  payload: UpdateCategoryRequest
) {
  const res = await axiosInstance.patch<ServerMessageResponse>(
    `categories/${categoryId}`,
    payload
  );

  return res.data;
}

/**
 * Get categories with high product count
 *
 * @returns Categories with high product count
 */
export async function getCategoriesWithHighProductCount() {
  const res = await axiosInstance.get<CategoryWithProductCount[]>(
    "categories/product_count"
  );

  return res.data;
}
