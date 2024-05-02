import { InventorySummary } from "@/lib/types";
import axiosInstance from ".";

/**
 * Get inventory summary
 *
 * @returns Inventory summary
 */
export async function getInventorySummary() {
  const res = await axiosInstance.get<InventorySummary>("inventory");

  return res.data;
}
