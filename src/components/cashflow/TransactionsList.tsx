import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import useTransactionsList from "@/src/hooks/useTransactionsList";
import {
  formatCurrency,
  formatDateRelatively,
} from "@/src/utils/utils/formatter";

export default function TransactionsList() {
  const { status, data } = useTransactionsList();

  if (status === "pending") {
    return <ActivityIndicator />;
  }

  if (status === "error") {
    return <Text>Error</Text>;
  }

  if (data.length === 0) {
    return <Text style={styles.noDataText}>No transactions.</Text>;
  }

  return (
    <FlatList
      style={{ flex: 1 }}
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

const styles = StyleSheet.create({
  noDataText: {
    flex: 1,
    textAlign: "center",
    textAlignVertical: "center",
  },
});
