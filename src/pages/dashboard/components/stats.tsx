import { Stat } from "@/components/ui/stat";
import useCategory from "@/hooks/category.hook";
import useProduct from "@/hooks/product.hook";

function Stats() {
  const { categories } = useCategory();
  const { products, total } = useProduct();

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <Stat stat={categories?.length ?? "N/A"} title={"Product Categories"} />
      <Stat stat={total ?? "N/A"} title={"Products"} />
      <Stat
        stat={products?.reduce((pv, cv) => pv + cv.inventory, 0) ?? "N/A"}
        title={"Inventory Items"}
      />
    </div>
  );
}

export default Stats;
