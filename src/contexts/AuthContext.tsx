import { onAuthStateChanged, User, type UserCredential } from "firebase/auth";
import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import * as AuthService from "@/src/services/auth";
import { FIREBASE_AUTH } from "@/firebaseConfig";

interface AuthContextValue {
  user?: User | null;
  isLoadingAuth: boolean;
  signUpWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<UserCredential>;
  signInAnonymously: () => Promise<UserCredential>;
  signInWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<UserCredential>;
  signOut: () => Promise<void>;
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
  const [user, setUser] = useState<AuthContextValue["user"]>(undefined);
  const isLoadingAuth = user === undefined;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  const signUpWithEmailAndPassword: AuthContextValue["signUpWithEmailAndPassword"] =
    async (email, password) => {
      const result = await AuthService.signUpWithEmailAndPassword(
        email,
        password
      );
      setUser(result.user);
      return result;
    };
  const signInAnonymously: AuthContextValue["signInAnonymously"] = async () => {
    const result = await AuthService.signInAnonymously();
    setUser(result.user);
    return result;
  };
  const signInWithEmailAndPassword: AuthContextValue["signInWithEmailAndPassword"] =
    async (email, password) => {
      const result = await AuthService.signInWithEmailAndPassword(
        email,
        password
      );
      setUser(result.user);
      return result;
    };
  const signOut: AuthContextValue["signOut"] = async () => {
    return await AuthService.signOut();
  };

  const value: AuthContextValue = {
    user,
    isLoadingAuth,
    signUpWithEmailAndPassword,
    signInAnonymously,
    signInWithEmailAndPassword,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
