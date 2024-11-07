import React from "react";
import { useLocalSearchParams } from "expo-router";
import TransactionDetails from "@/src/components/transaction-details/TransactionDetails";

export default function TransactionDetailsPage() {
  const { transactionId } = useLocalSearchParams<{ transactionId: string }>();

  return <TransactionDetails transactionId={transactionId} />;
}
