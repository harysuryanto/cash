import { useEffect } from "react";
import { useRouter, useSegments } from "expo-router";
import { useAuth } from "@/src/contexts/AuthContext";

export default function useAuthRedirection() {
  const router = useRouter();
  const segments = useSegments();

  const { isLoadingAuth, user } = useAuth();

  useEffect(() => {
    // const isInSplashScreen = segments[0] === "splash-screen";
    const isInPrivateArea = segments[0] === "(private)";
    const isSignedIn = !!user;

    if (isLoadingAuth) return;

    // if (isInSplashScreen) {
    //   router.replace(isSignedIn ? "/(private)" : "/(public)/sign-in");
    //   return;
    // }

    if (isSignedIn && !isInPrivateArea) {
      router.replace("/(private)/cash-flow");
    } else if (!isSignedIn && isInPrivateArea) {
      router.replace("/(public)/sign-in");
    }
  }, [isLoadingAuth, user, segments]);
}
