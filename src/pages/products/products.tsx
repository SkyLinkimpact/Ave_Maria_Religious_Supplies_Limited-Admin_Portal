import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { GlobalContext, GlobalContextType } from "@/contexts/global.context";
import { Plus } from "lucide-react";
import { useContext, useEffect } from "react";

type Product = {
  id: string;
  name: string;
  quatity: number;
  category: string;
  created_at: string;
};

const products: Product[] = [
  {
    id: "product-1",
    name: "Red Candle",
    quatity: 20,
    category: "Candle",
    created_at: Date.now().toString(),
  },
  {
    id: "product-2",
    name: "Happy Easter Card",
    quatity: 800,
    category: "Card",
    created_at: Date.now().toString(),
  },
  {
    id: "product-3",
    name: "Silver Candle",
    quatity: 20,
    category: "Candle Holder",
    created_at: Date.now().toString(),
  },
];

function ProductsPage() {
  const { header, setHeader } = useContext(GlobalContext) as GlobalContextType;

  useEffect(() => {
    if (header !== "Dashboard") return;

    setHeader("Products");
  }, [header, setHeader]);

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-full py-4 flex">
        <div className="flex-1" />
        <Button>
          Add New <Plus className="pl-2 size-8" />
        </Button>
      </div>
      <div className="w-full overflow-x-scroll">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead />
              <TableHead>Name</TableHead>
              <TableHead>Quantity in Stock</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Created At</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {products.map((itm, idx) => (
              <TableRow key={itm.id}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell className="font-medium">{itm.name}</TableCell>
                <TableCell>{itm.quatity}</TableCell>
                <TableCell>{itm.category}</TableCell>
                <TableCell>{itm.created_at}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default ProductsPage;
