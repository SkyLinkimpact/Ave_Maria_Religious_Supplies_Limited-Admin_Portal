import { getInventorySummary } from "@/services/inventory.service";
import { useQuery } from "@tanstack/react-query";

function useInventory() {
  const { data, isLoading } = useQuery({
    queryKey: ["inventorySummary"],
    queryFn: getInventorySummary,
  });

  return {
    inventorySummary: data,
    isInventorySummaryLoading: isLoading,
  };
}

export default useInventory;
