import React from "react";
import { useLocalSearchParams } from "expo-router";
import TransactionDetails from "@/src/components/transaction-details/TransactionDetails";
import { View } from "react-native";

export default function TransactionDetailsPage() {
  const { transactionId } = useLocalSearchParams<{ transactionId: string }>();

  return (
    <View className="flex-1 bg-background">
      <TransactionDetails transactionId={transactionId} />
    </View>
  );
}
