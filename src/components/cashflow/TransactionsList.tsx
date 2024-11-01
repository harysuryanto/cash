import { ActivityIndicator, FlatList, Text, View } from "react-native";
import React from "react";
import useTransactionsList from "@/src/hooks/useTransactionsList";
import { formatCurrency } from "@/src/utils/utils/formatter";
import TransactionCard from "@/src/components/cashflow/TransactionCard";

export default function TransactionsList() {
  const { status, data, refetch, isRefetching } = useTransactionsList();

  if (status === "pending") {
    return <ActivityIndicator />;
  }

  if (status === "error") {
    return <Text>Error</Text>;
  }

  if (data.length === 0) {
    return (
      <Text className="flex-1 text-center align-middle">No transactions.</Text>
    );
  }

  return (
    <FlatList
      className="flex-1"
      refreshing={isRefetching}
      onRefresh={refetch}
      data={data}
      renderItem={({ item }) => (
        <View className="p-4 pt-0">
          <TransactionCard
            {...item}
            nominal={formatCurrency(item.nominal)}
            date={
              item.date.toDate().getDate() === new Date().getDate()
                ? "Today"
                : `${new Intl.DateTimeFormat("id", {
                    day: "numeric",
                    month: "short",
                    year:
                      new Date().getFullYear() ===
                      item.date.toDate().getFullYear()
                        ? undefined
                        : "2-digit",
                  }).format(item.date.toDate())}`
            }
          />
        </View>
      )}
    />
  );
}
