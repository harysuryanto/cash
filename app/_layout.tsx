import "expo-dev-client";
import "@/src/global.css";
import { doOtaUpdateAndRestartApp } from "@/src/utils/utils/ota-update";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import Providers from "@/src/components/Providers";
import useAuthRedirection from "@/src/hooks/useAuthRedirection";
import { useAuth } from "@/src/contexts/AuthContext";
import { updateLastActiveTime } from "@/src/services/user";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function Layout() {
  const { isLoadingAuth, user } = useAuth();

  // Load all stuff here that needs to run only once at the beginning.
  useEffect(() => {
    doOtaUpdateAndRestartApp();
  }, []);

  useEffect(() => {
    if (!isLoadingAuth) SplashScreen.hideAsync();
  }, [isLoadingAuth]);

  useEffect(() => {
    if (!isLoadingAuth && !!user) updateLastActiveTime(user.uid);
  }, [isLoadingAuth, user]);

  useAuthRedirection();

  if (isLoadingAuth) return null;

  return (
    <Stack screenOptions={{ animation: "fade", headerShown: false }}>
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
