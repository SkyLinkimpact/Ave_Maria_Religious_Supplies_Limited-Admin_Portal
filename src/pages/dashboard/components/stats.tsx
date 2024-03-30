import { Card, CardContent, CardHeader } from "@/components/ui/card";

type StatProp = {
  title: string;
  stat: string | number;
};

function Stat({ title, stat }: StatProp) {
  return (
    <Card className="w-full hover:shadow-lg cursor-pointer">
      <CardHeader className="uppercase text-primary/55 text-md heading">
        {title}
      </CardHeader>
      <CardContent className="text-right">
        <p className="text-2xl font-bold heading">{stat}</p>
      </CardContent>
    </Card>
  );
}

const stats: StatProp[] = [
  {
    stat: 200,
    title: "Products",
  },
  {
    stat: 3,
    title: "Product Categories",
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
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-4">
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
