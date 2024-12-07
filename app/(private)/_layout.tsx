import { Stack } from "expo-router";
import React from "react";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        animation: "ios",
        headerShown: false,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="cash-flow" />
      <Stack.Screen
        name="nominal"
        options={{
          title: "Nominal",
          presentation: "modal",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
