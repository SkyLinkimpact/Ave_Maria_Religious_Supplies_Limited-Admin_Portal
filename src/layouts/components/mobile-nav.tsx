import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DASHBOARD_ROUTE } from "@/routes";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { SIDEBAR_MENU_LINKS, SideBarNavLinkItem } from "./sidebar";

function MobileNav() {
  return (
    <div className="md:hidden flex justify-between items-center p-4 border-b">
      <Link
        to={DASHBOARD_ROUTE}
        className="flex items-center justify-center gap-2"
      >
        <img
          src="/logo.PNG"
          alt="Ave Maria Religious Supplies Logo"
          className="h-12"
        />
        <h1 className="text-5xl font-bold logo text-primary">ADMIN</h1>
      </Link>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <Menu className="size-4" />
          </Button>
        </SheetTrigger>

        <SheetContent>
          <div className="flex flex-col gap-2">
            {SIDEBAR_MENU_LINKS.map((menu) => (
              <SideBarNavLinkItem
                key={menu.title}
                icon={menu.icon}
                path={menu.path}
                title={menu.title}
              />
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default MobileNav;
