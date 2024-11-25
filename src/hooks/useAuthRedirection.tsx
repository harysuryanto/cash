import { useEffect } from "react";
import { useRouter, useSegments } from "expo-router";
import { useAuth } from "@/src/contexts/AuthContext";

export default function useAuthRedirection() {
  const router = useRouter();
  const segments = useSegments();

  const { isLoadingAuth, user } = useAuth();

  useEffect(() => {
    const isOutsidePublicAndPrivateArea = segments[0] === undefined;
    const isInPrivateArea = segments[0] === "(private)";
    const isSignedIn = !!user;

    if (isLoadingAuth) return;

    if (isSignedIn && !isInPrivateArea) {
      router.replace("/(private)");
    } else if (
      !isSignedIn &&
      (isInPrivateArea || isOutsidePublicAndPrivateArea)
    ) {
      router.replace("/(public)/sign-in");
    }
  }, [isLoadingAuth, user, segments]);
}
