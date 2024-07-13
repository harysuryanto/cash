import { CashListProvider } from "@/src/contexts/CashContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { PaperProvider } from "react-native-paper";

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: { throwOnError: false },
    queries: { throwOnError: false },
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
  }, []);

  return <Nav />;
}

export default function RootLayoutNav() {
  return (
    <PaperProvider>
      <QueryClientProvider client={queryClient}>
        <CashListProvider>
          <RootLayout />
        </CashListProvider>
      </QueryClientProvider>
    </PaperProvider>
  );
}
