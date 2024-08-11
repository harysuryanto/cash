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
import { List } from "react-native-paper";

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
      renderItem={({ item }) => (
        <List.Item
          key={item.id}
          title={`${formatCurrency(item.nominal)}${
            item.category ? " - " + item.category : ""
          }`}
          description={`${formatDateRelatively(item.date.toDate())}${
            item.description ? " • " + item.description : ""
          }`}
          left={(props) => (
            <View
              {...props}
              style={{
                width: 16,
                height: 16,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor:
                  item.type === "expense" ? "pink" : "lightgreen",
                borderRadius: 16,
                alignSelf: "center",
              }}
            ></View>
          )}
          style={{ paddingHorizontal: 16 }}
        />
      )}
      keyExtractor={({ id }) => id}
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
