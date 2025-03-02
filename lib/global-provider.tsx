import React, { createContext, useContext, ReactNode } from "react";
import { getCurrentUser } from "./appwrite";
import { useAppwrite } from "./useAppwrite";
import { Redirect } from "expo-router";

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

interface User {
  $id: string;
  name: string;
  email: string;
  avatar: string;
}

interface GlobalContextType {
  isLogged: boolean;
  user: User | null;
  loading: boolean;
  refetch: (newParams?: Record<string, string|number>) => Promise<void>;
}




export const GlobalProvider = ({ children }: {children: ReactNode}) => {
  const {
    data: user,
    loading,
    refetch,
  } = useAppwrite({
    fn: getCurrentUser,
  });

  const isLogged = !!user;

  return (
    <GlobalContext.Provider value={{ isLogged, user, loading, refetch }}>
      {children}
    </GlobalContext.Provider>
  );/*ERROR */
}

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }

  return context;
};

export default GlobalProvider;
