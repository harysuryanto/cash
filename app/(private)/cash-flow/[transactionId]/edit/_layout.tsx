import EditTransactionButton from "@/src/components/edit-transaction/EditTransactionButton";
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
      <Stack.Screen
        name="index"
        options={{
          title: "Edit Transaction",
          headerShown: true,
          headerRight: ({ tintColor }) => (
            <EditTransactionButton color={tintColor} />
          ),
        }}
      />
    </Stack>
  );
}
