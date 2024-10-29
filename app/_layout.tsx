import "expo-dev-client";
import "@/src/global.css";
import { checkOtaUpdate } from "@/src/utils/utils/ota-update";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SplashScreen, Stack } from "expo-router";
import { Theme, ThemeProvider } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NAV_THEME } from "@/src/constants";
import { useColorScheme } from "@/src/hooks/useColorScheme";
import { PortalHost } from "@/src/components/shared/react-native-reusables/primitives/portal";
import { AddTransactionFormProvider } from "@/src/contexts/AddTransactionFormContext";

const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
};

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
  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const theme = await AsyncStorage.getItem("theme");
      if (Platform.OS === "web") {
        // Adds the background color to the html element to prevent white background on overscroll.
        document.documentElement.classList.add("bg-background");
      }
      if (!theme) {
        AsyncStorage.setItem("theme", colorScheme);
        setIsColorSchemeLoaded(true);
        return;
      }
      const colorTheme = theme === "dark" ? "dark" : "light";
      if (colorTheme !== colorScheme) {
        setColorScheme(colorTheme);

        setIsColorSchemeLoaded(true);
        return;
      }
      setIsColorSchemeLoaded(true);
    })().finally(() => {
      SplashScreen.hideAsync();
    });
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
        <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
        <QueryClientProvider client={queryClient}>
          <AddTransactionFormProvider>
            <RootLayout />
          </AddTransactionFormProvider>
        </QueryClientProvider>
      </ThemeProvider>
      {/* Default Portal Host (one per app) */}
      <PortalHost />
    </>
  );
}
