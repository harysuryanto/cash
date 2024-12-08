import {
  GoogleAuthProvider,
  onAuthStateChanged,
  type User,
  type UserCredential,
} from "firebase/auth";
import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useQueryClient } from "@tanstack/react-query";
import * as AuthService from "@/src/services/auth";
import { FIREBASE_AUTH } from "@/firebaseConfig";
import * as Google from "expo-auth-session/providers/google";
import { signInWithCredential } from "@/src/services/auth";
import { env } from "@/src/utils/utils/env";
import { Platform } from "react-native";

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
  signInWithGoogle: () => Promise<UserCredential | null>;
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
  const queryClient = useQueryClient();

  const [user, setUser] = useState<AuthContextValue["user"]>(undefined);
  const isLoadingAuth = user === undefined;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (latestUser) => {
      if (latestUser === user) return;
      setUser(latestUser);
    });
    return unsubscribe;
  }, []);

  const [request, response, promptAsync] = Google.useAuthRequest(
    env.EXPO_PUBLIC_APP_ENV === "development"
      ? {
          iosClientId:
            "598165881469-6n51m0e246l9uj91ug2bpgt989ktk6rr.apps.googleusercontent.com",
          androidClientId:
            "598165881469-cnd0jpn5dm1qrpcto7gsik045b7ro8nn.apps.googleusercontent.com",
          webClientId:
            // "59214547434392-knejs1im3t07pl48abjb0rqstks6hka1.apps.googleusercontent.com",
            "214547434392-knejs1im3t07pl48abjb0rqstks6hka1.apps.googleusercontent.com",
          redirectUri: Platform.select({
            native: "cash-development://sign-in",
            web: "https://harycash.netlify.app/sign-in",
          }),
        }
      : env.EXPO_PUBLIC_APP_ENV === "staging"
      ? // TODO: create clientIds for staging, this one here is from production
        {
          iosClientId:
            "598165881469-vbsbk0m7chan4nlhk4abcq9dbk0aoal6.apps.googleusercontent.com",
          androidClientId:
            "598165881469-gc0pede2bai8lkn88ulh295a4t3cvh2f.apps.googleusercontent.com",
          webClientId:
            // "59214547434392-knejs1im3t07pl48abjb0rqstks6hka1.apps.googleusercontent.com",
            "214547434392-knejs1im3t07pl48abjb0rqstks6hka1.apps.googleusercontent.com",
          redirectUri: Platform.select({
            native: "cash-staging://sign-in",
            web: "https://harycash.netlify.app/sign-in",
          }),
        }
      : // production
        {
          iosClientId:
            "598165881469-vbsbk0m7chan4nlhk4abcq9dbk0aoal6.apps.googleusercontent.com",
          androidClientId:
            "598165881469-gc0pede2bai8lkn88ulh295a4t3cvh2f.apps.googleusercontent.com",
          webClientId:
            // "59214547434392-knejs1im3t07pl48abjb0rqstks6hka1.apps.googleusercontent.com",
            "214547434392-knejs1im3t07pl48abjb0rqstks6hka1.apps.googleusercontent.com",
          redirectUri: Platform.select({
            native: "cash://sign-in",
            web: "https://harycash.netlify.app/sign-in",
          }),
        }
  );

  // useEffect(() => {
  //   if (response?.type === "success") {
  //     const { id_token } = response.params;
  //     const credential = GoogleAuthProvider.credential(id_token);
  //     const result = signInWithCredential(credential);
  //     console.log("signInWithCredential", result);
  //   }
  // }, [response]);

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
  const signInWithGoogle: AuthContextValue["signInWithGoogle"] = async () => {
    const result = await promptAsync();
    console.log("signInWithGoogle", JSON.stringify(result, null, 2));
    alert(JSON.stringify(result, null, 2));
    if (result?.type === "success") {
      const { id_token } = result.params;
      const credential = GoogleAuthProvider.credential(id_token);
      const userCredential = await signInWithCredential(credential);
      setUser(userCredential.user);
      return userCredential;
    } else {
      return null;
    }
  };

  const signOut: AuthContextValue["signOut"] = async () => {
    await AuthService.signOut();
    await queryClient.resetQueries();
  };

  const value: AuthContextValue = {
    user,
    isLoadingAuth,
    signUpWithEmailAndPassword,
    signInAnonymously,
    signInWithEmailAndPassword,
    signInWithGoogle,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
