import { GlobalContext, GlobalContextType } from "@/contexts/global.context";
import { useContext } from "react";

function Header() {
  const { header } = useContext(GlobalContext) as GlobalContextType;
  return (
    <div className="px-4 lg:pl-8 py-4 heading">
      <h1 className="text-4xl text-primary/75 border-b uppercase">{header}</h1>
    </div>
  );
}

export default Header;
