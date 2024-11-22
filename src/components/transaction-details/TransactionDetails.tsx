import { View, ScrollView, RefreshControl } from "react-native";
import React from "react";
import useTransactionDetails from "@/src/hooks/useTransactionDetails";
import { formatCurrency } from "@/src/utils/utils/formatter";
import { Text } from "@/src/components/shared/react-native-reusables/Text";
import ErrorMessage from "@/src/components/shared/ErrorMessage";
import LoadingIndicator from "@/src/components/shared/LoadingIndicator";

type TransactionDetailsProps = {
  transactionId: string;
};

export default function TransactionDetails({
  transactionId,
}: TransactionDetailsProps) {
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
        error="Transaction not found."
        fullscreen
        refreshing={isRefetching}
        onRefresh={refetch}
      />
    );
  }

  return (
    <ScrollView
      className="flex-1"
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
      }
    >
      <View className="flex-1 p-4 gap-4">
        <View className="flex-row justify-between">
          <Text className="pr-6">Nominal</Text>
          <Text
            className={`text-3xl font-medium ${
              data.type === "expense" ? "text-red-500" : "text-green-500"
            }`}
          >
            {formatCurrency(data.nominal)}
          </Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="pr-6">Type</Text>
          <Text>{data.type}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="pr-6">Category</Text>
          <Text>{data.category}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="pr-6">Fund</Text>
          <Text>{data.fund}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="pr-6">Date</Text>
          <Text>
            {data.date.toDate().getDate() === new Date().getDate()
              ? "Today"
              : `${new Intl.DateTimeFormat("id", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }).format(data.date.toDate())}`}
          </Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="pr-6">Description</Text>
          <Text>{data.description}</Text>
        </View>
      </View>
    </ScrollView>
  );
}
