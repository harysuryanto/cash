import { CashListProvider } from "@/src/contexts/CashContext";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { PaperProvider } from "react-native-paper";

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
      <CashListProvider>
        <RootLayout />
      </CashListProvider>
    </PaperProvider>
  );
}
