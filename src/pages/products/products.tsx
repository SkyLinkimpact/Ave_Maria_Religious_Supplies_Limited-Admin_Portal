import { GlobalContext, GlobalContextType } from "@/contexts/global.context";
import useProduct from "@/hooks/product.hook";
import { Loader } from "lucide-react";
import { useContext, useEffect } from "react";
import AddNewProductFormDialog from "./components/add-product-form-dialog";
import ProductTable from "./components/product-table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function ProductsPage() {
  const { header, setHeader } = useContext(GlobalContext) as GlobalContextType;

  const {
    products,
    isProductsLoading,
    total,
    currentPage,
    nextPage,
    prevPage,
    lastPage,
  } = useProduct();

  useEffect(() => {
    if (header !== "Dashboard") return;

    setHeader("Products");
  }, [header, setHeader]);

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-full py-4 flex">
        <div className="flex-1" />
        <AddNewProductFormDialog />
      </div>
      <div className="w-full flex flex-col gap-6 min-h-48 overflow-x-scroll pb-8">
        {isProductsLoading && (
          <div className="flex w-full h-full italic items-center justify-center">
            <Loader className="animate-spin size-16 text-primary" />
          </div>
        )}

        <ProductTable products={products} />

        {products && total && total > 15 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  isActive={currentPage !== 1}
                  onClick={prevPage}
                  className="cursor-pointer"
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  isActive={currentPage !== lastPage}
                  onClick={nextPage}
                  className="cursor-pointer"
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
}

export default ProductsPage;
