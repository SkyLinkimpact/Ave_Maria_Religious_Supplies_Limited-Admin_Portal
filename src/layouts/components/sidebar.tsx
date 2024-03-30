import { createElement, ElementType } from "react";
import { Link, useMatch } from "react-router-dom";
import {
  LayoutDashboard,
  List,
  Package,
  ShoppingBag,
  Users,
} from "lucide-react";

import {
  CATEGORIES_ROUTE,
  DASHBOARD_ROUTE,
  ORDERS_ROUTE,
  PRODUCTS_ROUTE,
  USERS_ROUTE,
} from "@/routes";
import { cn } from "@/lib/utils";

export interface ISideBarNavLink {
  path: string;
  title: string;
  icon: ElementType;
}

export const SIDEBAR_MENU_LINKS: ISideBarNavLink[] = [
  {
    icon: LayoutDashboard,
    path: DASHBOARD_ROUTE,
    title: "Dashboard",
  },
  {
    icon: List,
    path: CATEGORIES_ROUTE,
    title: "Categories",
  },
  {
    icon: Package,
    path: PRODUCTS_ROUTE,
    title: "Products",
  },
  {
    icon: ShoppingBag,
    path: ORDERS_ROUTE,
    title: "Orders",
  },
  {
    icon: Users,
    path: USERS_ROUTE,
    title: "Users",
  },
];

export function SideBarNavLinkItem({ icon, path, title }: ISideBarNavLink) {
  const matches = useMatch(path);

  return (
    <Link
      className={cn(
        "py-4 px-2 w-full flex gap-2 items-center group hover:bg-primary hover:text-primary-foreground hover:shadow-md transition-all ease-linear rounded-md duration-75",
        matches && "text-primary-foreground bg-primary"
      )}
      to={path}
    >
      {createElement(icon, { className: "size-8 group-hover:scale-75" })}
      <span
        className={cn("group-hover:font-semibold", matches && "font-semibold")}
      >
        {title}
      </span>
    </Link>
  );
}

function SideBar() {
  return (
    <div className="w-full h-full grid grid-rows-[80px_1fr]">
      <Link
        to={DASHBOARD_ROUTE}
        className="flex items-center justify-center border-b p-3 gap-2"
      >
        <img
          src="/logo.PNG"
          alt="Ave Maria Religious Supplies Logo"
          className="h-16"
        />
        <h1 className="text-5xl font-bold logo text-primary">ADMIN</h1>
      </Link>

      <div className="px-4 py-2 flex flex-col gap-2">
        {SIDEBAR_MENU_LINKS.map((menu) => (
          <SideBarNavLinkItem
            key={menu.title}
            icon={menu.icon}
            path={menu.path}
            title={menu.title}
          />
        ))}
      </div>
    </div>
  );
}

export default SideBar;
