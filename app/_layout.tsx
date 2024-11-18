import "expo-dev-client";
import "@/src/global.css";
import { checkOtaUpdate } from "@/src/utils/utils/ota-update";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import Providers from "@/src/components/Providers";
import useAuthRedirection from "@/src/hooks/useAuthRedirection";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function Layout() {
  // Load all stuff here that needs to run only once at the beginning.
  useEffect(() => {
    SplashScreen.hideAsync();
    checkOtaUpdate();
  }, []);

  useAuthRedirection();

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
