import { Stack } from "expo-router";
import React from "react";
import AddTransactionButton from "@/src/components/cashflow/AddTransactionButton";

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
          title: "Cash Flow",
          headerRight: ({ tintColor }) => (
            <AddTransactionButton color={tintColor} />
          ),
          headerShown: true,
        }}
      />
      <Stack.Screen name="add" />
    </Stack>
  );
}
