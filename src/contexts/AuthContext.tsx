import type { User } from "@/src/types/User";
import { createContext, PropsWithChildren, useContext } from "react";

interface AuthContextValue {
  user: User | null;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const value: AuthContextValue = { user: { id: "userId-here" } };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
