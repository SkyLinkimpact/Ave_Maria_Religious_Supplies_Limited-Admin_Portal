import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import { formatNumber } from "@/lib/utils";
import { getCategoriesWithHighProductCount } from "@/services/category.service";
import { useQuery } from "@tanstack/react-query";

function CategoriesWithHighProductCount() {
  const { data: categories } = useQuery({
    queryKey: ["top-product-categories"],
    queryFn: getCategoriesWithHighProductCount,
  });

  if (!categories) return null;

  return (
    <div className="w-full flex flex-col overflow-x-scroll shadow-md rounded-md py-6 gap-6">
      <h1 className="heading text-3xl pl-6 text-primary/75">
        Top 5 Product Categories by count
      </h1>
      <Table className="rounded-md border">
        <TableCaption className="header uppercase">
          Top 5 Product Categories
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Product Count</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {categories.map((category, idx) => (
            <TableRow key={category.id}>
              <TableCell>{idx + 1}</TableCell>
              <TableCell className="font-medium uppercase">
                {category.title}
              </TableCell>
              <TableCell className="font-medium">
                {formatNumber(category.productCount)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default CategoriesWithHighProductCount;
