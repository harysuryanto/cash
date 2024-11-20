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
          title: "Sign Up",
          headerRight: () => (
            <Link href={"/(public)/sign-in"} replace asChild>
              <TouchableOpacity hitSlop={16}>
                <Text className="text-gray-500">Sign In</Text>
              </TouchableOpacity>
            </Link>
          ),
          headerShown: true,
        }}
      />
    </Stack>
  );
}
