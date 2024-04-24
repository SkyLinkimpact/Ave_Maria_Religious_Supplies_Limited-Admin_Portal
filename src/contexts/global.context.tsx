import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useMemo,
  useState,
} from "react";

export type GlobalContextType = {
  header: string;
  setHeader: Dispatch<SetStateAction<string>>;
};

export const GlobalContext = createContext<GlobalContextType | null>(null);

export const GlobalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [header, setHeader] = useState("Dashboard");

  const value = useMemo(() => ({ header, setHeader }), [header, setHeader]);

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
