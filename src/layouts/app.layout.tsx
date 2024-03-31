import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

function AppLayout() {
  return (
    <main className="w-screen h-screen antialiased bg-background flex items-center justify-center">
      <Outlet />
      <Toaster />
    </main>
  );
}

export default AppLayout;
