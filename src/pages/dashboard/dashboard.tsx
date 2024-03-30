import { useContext, useEffect } from "react";
import { GlobalContext, GlobalContextType } from "@/contexts/global.context";
import Stats from "./components/stats";
import PendingOrders from "./components/pending-orders";
function DashboardPage() {
  const { header, setHeader } = useContext(GlobalContext) as GlobalContextType;

  useEffect(() => {
    setHeader("Dashboard");
  }, [header, setHeader]);

  return (
    <div className="flex flex-col gap-4 w-full">
      <Stats />
      <PendingOrders />
    </div>
  );
}

export default DashboardPage;
