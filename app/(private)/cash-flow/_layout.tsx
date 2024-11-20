import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Stack } from "expo-router";
import AddTransactionButton from "@/src/components/cashflow/AddTransactionButton";
import { Text } from "@/src/components/shared/react-native-reusables";
import { useAuth } from "@/src/contexts/AuthContext";

export default function Layout() {
  const { signOut } = useAuth();

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
          headerRight: () => (
            <View className="flex flex-row gap-8">
              <TouchableOpacity onPress={signOut} hitSlop={16}>
                <Text className={`text-muted-foreground`}>Sign Out</Text>
              </TouchableOpacity>
              <AddTransactionButton />
            </View>
          ),
          headerShown: true,
        }}
      />
      <Stack.Screen name="add" />
      <Stack.Screen name="[transactionId]" />
    </Stack>
  );
}
