import React from "react";
import { TouchableOpacity } from "react-native";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import { Text } from "@/src/components/shared/react-native-reusables";

export default function Layout() {
  const { transactionId } = useLocalSearchParams<{ transactionId: string }>();

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
          title: "Details",
          headerShown: true,
          headerRight: ({ tintColor }) => (
            <Link href={`/(private)/cash-flow/${transactionId}/edit`} asChild>
              <TouchableOpacity
                hitSlop={{ left: 10, right: 100, top: 100, bottom: 100 }}
              >
                <Text className={`text-[${tintColor}]`}>Edit</Text>
              </TouchableOpacity>
            </Link>
          ),
        }}
      />
      <Stack.Screen name="edit" />
    </Stack>
  );
}
