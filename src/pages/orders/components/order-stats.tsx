import { Stat, StatProp } from "@/components/ui/stat";

const orderStats: StatProp[] = [
  {
    stat: 10,
    title: "pending",
  },
  {
    stat: 5,
    title: "processing",
  },
  {
    stat: 50,
    title: "fulfilled",
  },
];

function OrderStats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {orderStats.map((stat) => (
        <Stat
          stat={stat.stat}
          title={stat.title}
          key={stat.title.replace("", "_")}
        />
      ))}
    </div>
  );
}

export default OrderStats;
