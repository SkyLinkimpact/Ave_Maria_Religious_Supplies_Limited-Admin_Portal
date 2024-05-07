import { Navigate, Outlet } from "react-router-dom";
import SideBar from "./components/sidebar";
import MobileNav from "./components/mobile-nav";
import Header from "./components/header";
import { GlobalProvider } from "@/contexts/global.context";
import useUser from "@/hooks/user.hook";
import { LOGIN_ROUTE } from "@/routes";
import { Loader } from "lucide-react";

function ProtectedLayout() {
  const { isUserError, isUserLoading, user } = useUser();

  if (isUserError) return <Navigate to={LOGIN_ROUTE} />;
  return (
    <GlobalProvider>
      <div className="h-full container mx-auto shadow-lg grid md:grid-cols-[250px_1fr] lg:grid-cols-[300px_1fr] p-0">
        {/* Side Navigation */}
        <div className="hidden md:block border-x">
          <SideBar />
        </div>

        {/* Page render port */}
        <div className="grid grid-rows-[auto_auto_1fr] md:grid-rows-[auto_1fr] h-full overflow-y-auto">
          <MobileNav />
          <Header />
          <div className="px-4 lg:pl-8 overflow-y-auto">
            {isUserLoading && (
              <div className="h-full w-full flex items-center justify-center">
                <Loader className="animate-spin size-8 text-primary" />
              </div>
            )}
            {user && <Outlet />}
          </div>
        </div>
      </div>
    </GlobalProvider>
  );
}

export default ProtectedLayout;
