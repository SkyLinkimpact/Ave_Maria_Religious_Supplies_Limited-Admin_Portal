import { Stat } from "@/components/ui/stat";
import useCategory from "@/hooks/category.hook";
import useInventory from "@/hooks/inventory.hook";
import useProduct from "@/hooks/product.hook";
import { formatCurrency, formatNumber } from "@/lib/utils";

function Stats() {
  const { categories } = useCategory();
  const { productCount } = useProduct();
  const { inventorySummary } = useInventory();

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <Stat stat={categories?.length ?? "N/A"} title={"Product Categories"} />
      <Stat stat={productCount ?? "N/A"} title={"Products"} />
      <Stat
        stat={
          inventorySummary?.inventoryCount
            ? formatNumber(inventorySummary.inventoryCount)
            : "N/A"
        }
        title={"Inventory Items"}
      />
      <Stat
        stat={
          inventorySummary?.inventoryPrice
            ? formatCurrency(inventorySummary.inventoryPrice)
            : "N/A"
        }
        title={"Sales Projection"}
      />
    </div>
  );
}

export default Stats;
