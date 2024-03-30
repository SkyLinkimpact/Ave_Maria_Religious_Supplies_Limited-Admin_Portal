import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import { orderItems } from "@/pages/orders/orders";

function PendingOrders() {
  return (
    <div className="w-full flex flex-col overflow-x-scroll shadow-md rounded-md py-6 gap-6">
      <h1 className="heading text-3xl pl-6 text-primary/75">PENDING ORDERS</h1>
      <Table className="rounded-md border">
        <TableCaption className="header uppercase">Pending Orders</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {orderItems.map((itm) => (
            <TableRow key={itm.id}>
              <TableCell>{itm.id}</TableCell>
              <TableCell className="font-medium uppercase">
                {itm.status}
              </TableCell>
              <TableCell className="font-medium">{itm.user}</TableCell>
              <TableCell>{itm.created_at}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default PendingOrders;
