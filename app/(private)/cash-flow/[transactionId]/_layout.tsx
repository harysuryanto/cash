import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import { Text } from "@/src/components/shared/react-native-reusables";
import DeleteTransactionButton from "@/src/components/transaction-details/DeleteTransactionButton";

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
            <View className="flex flex-row gap-8">
              <DeleteTransactionButton transactionId={transactionId} />
              <Link href={`/(private)/cash-flow/${transactionId}/edit`} asChild>
                <TouchableOpacity hitSlop={16}>
                  <Text className={`text-[${tintColor}]`}>Edit</Text>
                </TouchableOpacity>
              </Link>
            </View>
          ),
        }}
      />
      <Stack.Screen name="edit" />
    </Stack>
  );
}
