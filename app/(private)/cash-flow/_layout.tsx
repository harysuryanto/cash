import React from "react";
import { Stack } from "expo-router";
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
          headerRight: () => <AddTransactionButton />,
          headerShown: true,
        }}
      />
      <Stack.Screen name="add" />
      <Stack.Screen name="[transactionId]" />
    </Stack>
  );
}
