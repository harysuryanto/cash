import { RefreshControl, ScrollView, View } from "react-native";
import React from "react";
import EditTransactionForm from "./EditTransactionForm";
import useTransactionDetails from "@/src/hooks/useTransactionDetails";
import { useLocalSearchParams } from "expo-router";
import LoadingIndicator from "@/src/components/shared/LoadingIndicator";
import ErrorMessage from "@/src/components/shared/ErrorMessage";

export default function EditTransactionPage() {
  const { transactionId } = useLocalSearchParams<{ transactionId: string }>();
  const { status, error, data, refetch, isRefetching } =
    useTransactionDetails(transactionId);

  if (status === "pending") {
    return <LoadingIndicator fullscreen />;
  }

  if (status === "error") {
    return (
      <ErrorMessage
        error={error}
        fullscreen
        refreshing={isRefetching}
        onRefresh={refetch}
      />
    );
  }

  if (!data) {
    return (
      <ErrorMessage
        error="no-data"
        fullscreen
        refreshing={isRefetching}
        onRefresh={refetch}
      />
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-background"
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
      }
    >
      <View className="p-4">
        <EditTransactionForm transaction={data} />
      </View>
    </ScrollView>
  );
}
