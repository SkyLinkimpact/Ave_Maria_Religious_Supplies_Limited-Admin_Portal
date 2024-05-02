import { getProducts } from "@/services/product.service";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

function useProduct() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data: products, isLoading: isProductsLoading } = useQuery({
    queryKey: ["products", currentPage],
    queryFn: () => getProducts(currentPage),
    refetchInterval: false,
  });

  /**
   * Go to next page
   */
  const nextPage = () => {
    if (products !== undefined) {
      setCurrentPage((prev) => {
        const next = prev + 1;

        if (next <= products.meta.last_page) return next;

        return prev;
      });
    }
  };

  /**
   * Go to previous page
   */
  const prevPage = () => {
    if (products !== undefined) {
      setCurrentPage((prev) => {
        const curr = prev - 1;
        if (curr > 0) return curr;

        return prev;
      });
    }
  };

  return {
    products: products?.data,
    total: products?.meta.total,
    lastPage: products?.meta.last_page,
    isProductsLoading,
    currentPage,
    nextPage,
    prevPage,
  };
}

export default useProduct;
