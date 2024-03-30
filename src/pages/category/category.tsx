import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus } from "lucide-react";

type CategoryItem = {
  id: string;
  title: string;
  created_at: string;
};

const categoryItems: CategoryItem[] = [
  {
    id: "demo-1",
    title: "Card",
    created_at: Date.now().toString(),
  },
  {
    id: "demo-2",
    title: "Candle",
    created_at: Date.now().toString(),
  },
  {
    id: "demo-1",
    title: "Candle Holders",
    created_at: Date.now().toString(),
  },
];

function CategoryPage() {
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-full py-4 flex">
        <div className="flex-1"/>
        <Button>Add New <Plus className="pl-2 size-8" /></Button>
      </div>
      <div className="w-full overflow-x-scroll">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead />
              <TableHead>Title</TableHead>
              <TableHead>Created At</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
        {categoryItems.map((itm, idx) => (
          <TableRow key={itm.id}>
            <TableCell>{idx + 1}</TableCell>
            <TableCell className="font-medium">{itm.title}</TableCell>
            <TableCell>{itm.created_at}</TableCell>
          </TableRow>
        ))}
      </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default CategoryPage;
