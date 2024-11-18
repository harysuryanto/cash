import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  View,
} from "react-native";
import { Text } from "@/src/components/shared/react-native-reusables/Text";
import React from "react";
import EditTransactionForm from "./EditTransactionForm";
import useTransactionDetails from "@/src/hooks/useTransactionDetails";
import { useLocalSearchParams } from "expo-router";

export default function EditTransactionPage() {
  const { transactionId } = useLocalSearchParams<{ transactionId: string }>();
  const { status, error, data, refetch, isRefetching } =
    useTransactionDetails(transactionId);

  if (status === "pending") {
    return <ActivityIndicator />;
  }

  if (status === "error") {
    return (
      <Text className="flex-1 text-center align-middle">{error.message}</Text>
    );
  }

  if (!data) {
    return (
      <Text className="flex-1 text-center align-middle">
        Transaction not found.
      </Text>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-background"
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
      }
    >
      <View className="px-4">
        <EditTransactionForm transaction={data} />
      </View>
    </ScrollView>
  );
}
