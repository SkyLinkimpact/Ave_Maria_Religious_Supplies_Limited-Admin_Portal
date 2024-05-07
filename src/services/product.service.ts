import {
  EditProductRequest,
  Products,
  ServerMessageResponse,
  StoreProductRequest,
} from "@/lib/types";
import axiosInstance from ".";

/**
 * Get all products
 *
 * @param [page=1] Current page
 * @returns All products
 */
export async function getProducts(page = 1) {
  const res = await axiosInstance.get<Products>(`products?page=${page}`);

  return res.data;
}

/**
 * Store new product
 *
 * @param payload Request payloadd
 * @returns Server response
 */
export async function storeProduct(payload: StoreProductRequest) {
  const data = new FormData();
  data.append("images", payload.images);
  data.append("price", payload.price.toString());
  data.append("inventory", payload.inventory.toString());
  data.append("aws_link", payload.aws_link ?? "");
  data.append("category_id", payload.category_id);
  data.append("title", payload.title);
  data.append("description", payload.description);

  const res = await axiosInstance.post<ServerMessageResponse>("product", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
}

/**
 * Edit product with it's ID
 *
 * @param productId Product id
 * @param payload Request payload
 * @returns Server response
 */
export async function editProduct(
  productId: string,
  payload: EditProductRequest
) {
  const res = await axiosInstance.patch<ServerMessageResponse>(
    `product/${productId}`,
    payload
  );

  return res.data;
}

/**
 * Delete product by it's id
 *
 * @param productId Product Id
 * @returns Server response
 */
export async function deleteProduct(productId: string) {
  const res = await axiosInstance.delete(`product/${productId}`);

  return res.data;
}
