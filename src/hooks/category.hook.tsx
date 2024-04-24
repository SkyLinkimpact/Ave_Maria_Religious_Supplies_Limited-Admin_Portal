import { getCategories } from "@/services/category.service";
import { useQuery } from "@tanstack/react-query";

function useCategory() {
  const { data: categories, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    refetchInterval: false,
  });

  return { categories, isCategoriesLoading };
}

export default useCategory;
