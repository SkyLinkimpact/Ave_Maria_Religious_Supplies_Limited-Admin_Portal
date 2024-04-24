import { Stat, StatProp } from "@/components/ui/stat";
import useCategory from "@/hooks/category.hook";

const stats: StatProp[] = [
  {
    stat: 200,
    title: "Products",
  },
  {
    stat: 12,
    title: "Pending Orders",
  },
  {
    stat: 250,
    title: "inventory items",
  },
];

function Stats() {
  const { categories } = useCategory();

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <Stat stat={categories?.length ?? "N/A"} title={"Product Categories"} />
      {stats.map((stat) => (
        <Stat
          stat={stat.stat}
          title={stat.title}
          key={stat.title.replace("", "_")}
        />
      ))}
    </div>
  );
}

export default Stats;
