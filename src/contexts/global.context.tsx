import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

export type GlobalContextType = {
  header: string;
  setHeader: Dispatch<SetStateAction<string>>;
};

export const GlobalContext = createContext<GlobalContextType | null>(null);

export const GlobalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [header, setHeader] = useState("Dashboard");

  return (
    <GlobalContext.Provider value={{ header, setHeader }}>
      {children}
    </GlobalContext.Provider>
  );
};
