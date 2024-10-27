import { ActivityIndicator, FlatList, Text, View } from "react-native";
import React from "react";
import useTransactionsList from "@/src/hooks/useTransactionsList";
import {
  formatCurrency,
  formatDateRelatively,
} from "@/src/utils/utils/formatter";

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
      onRefresh={refetch}
      refreshing={isRefetching}
      data={data}
      renderItem={({ item: { id, category, date, description, nominal } }) => (
        <View key={id} style={{ paddingHorizontal: 16 }}>
          <Text>{`${formatCurrency(nominal)}${
            category ? " - " + category : ""
          }`}</Text>
          <Text>{`${formatDateRelatively(date.toDate())}${
            description ? " • " + description : ""
          }`}</Text>
        </View>
      )}
    />
  );
}
