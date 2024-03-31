import { Card, CardHeader, CardContent } from "./card";

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

export { Stat };
export type { StatProp };
