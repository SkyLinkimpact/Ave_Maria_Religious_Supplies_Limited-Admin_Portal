import { useContext, useEffect } from "react";
import { GlobalContext, GlobalContextType } from "@/contexts/global.context";
import Stats from "./components/stats";
import CategoriesWithHighProductCount from "./components/categories-with-product-count";
function DashboardPage() {
  const { header, setHeader } = useContext(GlobalContext) as GlobalContextType;

  useEffect(() => {
    setHeader("Dashboard");
  }, [header, setHeader]);

  return (
    <div className="flex flex-col gap-4 w-full">
      <Stats />
      <CategoriesWithHighProductCount />
      {/* <PendingOrders /> */}
    </div>
  );
}

export default DashboardPage;
