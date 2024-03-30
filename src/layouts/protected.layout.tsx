import { Outlet } from "react-router-dom";
import SideBar from "./components/sidebar";
import MobileNav from "./components/mobile-nav";
import Header from "./components/header";

function ProtectedLayout() {
  return (
    <div className="h-full container mx-auto shadow-lg grid md:grid-cols-[250px_1fr] lg:grid-cols-[300px_1fr] p-0">
      {/* Side Navigation */}
      <div className="hidden md:block border-x">
        <SideBar />
      </div>

      {/* Page render port */}
      <div className="grid grid-rows-[auto_auto_1fr] md:grid-rows-[auto_1fr]">
        <MobileNav />
        <Header />
        <div className="px-4 lg:pl-8 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default ProtectedLayout;
