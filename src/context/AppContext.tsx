import { useContext, createContext } from "react";
import type { User } from "../utils/Types";

interface AppContextProps {
    currUser: User | null;
    setCurrUser: Function;
  }
  
export const AppContext = createContext<AppContextProps | undefined>({
    currUser: null,
    setCurrUser: () => {},
});

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within a ContextProvider");
    }
    return context;
};