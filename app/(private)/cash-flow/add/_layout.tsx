import AddTransactionButton from "@/src/components/add-transaction/AddTransactionButton";
import { Stack } from "expo-router";
import React from "react";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        animation: "ios",
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Add Transaction",
          headerRight: () => <AddTransactionButton />,
        }}
      />
    </Stack>
  );
}
