import "expo-dev-client";
import "@/src/global.css";
import { checkOtaUpdate } from "@/src/utils/utils/ota-update";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import Providers from "@/src/components/Providers";
import useAuthRedirection from "@/src/hooks/useAuthRedirection";
import { useAuth } from "@/src/contexts/AuthContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function Layout() {
  const { isLoadingAuth } = useAuth();

  // Load all stuff here that needs to run only once at the beginning.
  useEffect(() => {
    checkOtaUpdate();
  }, []);

  useEffect(() => {
    if (!isLoadingAuth) SplashScreen.hideAsync();
  }, [isLoadingAuth]);

  useAuthRedirection();

  if (isLoadingAuth) return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(public)" />
      <Stack.Screen name="(private)" />
    </Stack>
  );
}

export default function Root() {
  return (
    <Providers>
      <Layout />
    </Providers>
  );
}
