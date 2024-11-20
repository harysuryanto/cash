import React from "react";
import { TouchableOpacity } from "react-native";
import { Link, Stack } from "expo-router";
import { Text } from "@/src/components/shared/react-native-reusables";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        animation: "ios",
        headerShown: false,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Sign In",
          headerRight: () => (
            <Link href={"/(public)/sign-up"} replace asChild>
              <TouchableOpacity hitSlop={16}>
                <Text className="text-muted-foreground">Sign Up</Text>
              </TouchableOpacity>
            </Link>
          ),
          headerShown: true,
        }}
      />
    </Stack>
  );
}
