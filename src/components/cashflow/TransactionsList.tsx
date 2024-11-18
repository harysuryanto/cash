import { ActivityIndicator, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import useTransactionsList from "@/src/hooks/useTransactionsList";
import { formatCurrency } from "@/src/utils/utils/formatter";
import TransactionCard from "@/src/components/cashflow/TransactionCard";
import { Text } from "@/src/components/shared/react-native-reusables/Text";
import { Link } from "expo-router";
import { useAuth } from "@/src/contexts/AuthContext";

export default function TransactionsList() {
  const { user } = useAuth();
  const { status, error, data, refetch, isRefetching } = useTransactionsList({
    userId: user?.uid,
  });

  if (status === "pending") {
    return <ActivityIndicator />;
  }

  if (status === "error") {
    return (
      <Text className="flex-1 text-center align-middle">{error.message}</Text>
    );
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
        <Link href={`/(private)/cash-flow/${item.id}`} asChild>
          <TouchableOpacity className="p-4 pt-0">
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
          </TouchableOpacity>
        </Link>
      )}
    />
  );
}
