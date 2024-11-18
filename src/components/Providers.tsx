import React, { type PropsWithChildren, useEffect, useState } from "react";
import { Platform } from "react-native";
import { Theme, ThemeProvider } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NAV_THEME } from "@/src/constants";
import { useColorScheme } from "@/src/hooks/useColorScheme";
import { PortalHost } from "@/src/components/shared/react-native-reusables/primitives/portal";
import { AuthProvider } from "@/src/contexts/AuthContext";
import { AddTransactionFormProvider } from "@/src/contexts/AddTransactionFormContext";
import { EditTransactionFormProvider } from "@/src/contexts/EditTransactionFormContext";

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

export default function Providers({ children }: PropsWithChildren) {
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
    })();
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
        <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <AddTransactionFormProvider>
              <EditTransactionFormProvider>
                {children}
              </EditTransactionFormProvider>
            </AddTransactionFormProvider>
          </AuthProvider>
        </QueryClientProvider>
      </ThemeProvider>
      {/* Default Portal Host (one per app) */}
      <PortalHost />
    </>
  );
}
