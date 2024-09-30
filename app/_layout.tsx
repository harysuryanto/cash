import "../src/global.css";
import { checkOtaUpdate } from "@/src/utils/utils/ota-update";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: { throwOnError: false, retry: false },
    queries: { throwOnError: false, retry: false },
  },
});

function Nav() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(private)" />
    </Stack>
  );
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
    checkOtaUpdate();
  }, []);

  return <Nav />;
}

export default function RootLayoutNav() {
  return (
    <QueryClientProvider client={queryClient}>
      <RootLayout />
    </QueryClientProvider>
  );
}
