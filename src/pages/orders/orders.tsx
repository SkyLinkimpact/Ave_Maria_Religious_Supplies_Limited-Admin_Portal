import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { GlobalContext, GlobalContextType } from "@/contexts/global.context";
import { useContext, useEffect } from "react";
import OrderStats from "./components/order-stats";

type OrderItem = {
  id: string;
  user: string;
  status: "pending" | "processed" | "sent";
  created_at: string;
};

export const orderItems: OrderItem[] = [
  {
    id: "j2jee9ww",
    user: "John Done",
    status: "pending",
    created_at: Date.now().toString(),
  },
  {
    id: "j2jee9ww",
    user: "Mary Anonymous",
    status: "processed",
    created_at: Date.now().toString(),
  },
  {
    id: "j2jee9ww",
    user: "Peter Stranger",
    status: "sent",
    created_at: Date.now().toString(),
  },
];

function OrdersPage() {
  const { header, setHeader } = useContext(GlobalContext) as GlobalContextType;

  useEffect(() => {
    if (header !== "Dashboard") return;

    setHeader("Orders");
  }, [header, setHeader]);

  return (
    <div className="w-full flex flex-col gap-6">
      <OrderStats />
      <div className="w-full overflow-x-scroll">
        <Table>
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
    </div>
  );
}

export default OrdersPage;
