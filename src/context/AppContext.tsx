import { useContext, createContext, useState, useEffect } from "react";
import type { User } from "@supabase/supabase-js"
import supabase from "../supabaseClient";

interface AppContextProps {
    currUser: User | null;
    setCurrUser: React.Dispatch<React.SetStateAction<User | null>>;
  }
  
export const AppContext = createContext<AppContextProps | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
    const [currUser, setCurrUser] = useState<User | null>(null);

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
            setCurrUser(data.user ?? null);
        });

         // listen to changes
        const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
            console.log(session?.user ?? null);
            setCurrUser(session?.user ?? null);
        });

        return () => sub.subscription.unsubscribe();
    }, []);

    return (
        <AppContext.Provider value={{ currUser, setCurrUser }}>
            {children}
        </AppContext.Provider>
    )
}

export function useAppContext() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within a ContextProvider");
    }
    return context;
};