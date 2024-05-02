import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product } from "@/lib/types";
import AddNewProductFormDialog from "./add-product-form-dialog";
import { formatCurrency, formatDate, formatNumber } from "@/lib/utils";
import EditProductFormDialog from "./edit-product-form-dialog";
import DeleteProductDialog from "./delete-product-dialog";

type Props = {
  products?: Product[];
};

function ProductTable({ products }: Props) {
  if (!products || products.length === 0)
    return (
      <div className="flex-1 flex flex-col gap-y-4 justify-center items-center">
        <p className="text-center italic">Nothing to see here.</p>
        <AddNewProductFormDialog />
      </div>
    );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead />
          <TableHead />
          <TableHead>Title</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Quantity in Stock</TableHead>
          <TableHead>Category</TableHead>
          <TableHead />
          <TableHead>Created At</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {products.map((product, idx) => (
          <TableRow key={product.id}>
            <TableCell>{idx + 1}</TableCell>
            <TableCell>
              <img
                src={product.images[0]}
                alt={product.title}
                className="max-w-48 object-contain"
              />
            </TableCell>
            <TableCell className="font-medium">{product.title}</TableCell>
            <TableCell>{formatCurrency(product.price)}</TableCell>
            <TableCell>{formatNumber(product.inventory)}</TableCell>
            <TableCell>{product.category.title}</TableCell>
            <TableCell>
              <div className="flex gap-4">
                <EditProductFormDialog product={product} />
                <DeleteProductDialog product={product} />
              </div>
            </TableCell>
            <TableCell>{formatDate(product.createdAt)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default ProductTable;
