import { Stack } from "expo-router";
import React from "react";

export default function Layout() {
  return (
    <Stack
      screenOptions={{ animation: "slide_from_right", headerShown: false }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="cash-flow" />
    </Stack>
  );
}
