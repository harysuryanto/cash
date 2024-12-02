import { FlatList, TouchableOpacity } from "react-native";
import React from "react";
import useTransactionsList from "@/src/hooks/useTransactionsList";
import { formatCurrency } from "@/src/utils/utils/formatter";
import TransactionCard from "@/src/components/cashflow/TransactionCard";
import { Link } from "expo-router";
import { useAuth } from "@/src/contexts/AuthContext";
import ErrorMessage from "@/src/components/shared/ErrorMessage";
import LoadingIndicator from "@/src/components/shared/LoadingIndicator";

export default function TransactionsList() {
  const { user } = useAuth();
  const { status, error, data, refetch, isRefetching } = useTransactionsList({
    uid: user?.uid,
  });

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

  if (data.length === 0) {
    return (
      <ErrorMessage
        error="No transactions."
        fullscreen
        refreshing={isRefetching}
        onRefresh={refetch}
      />
    );
  }

  return (
    <FlatList
      className="flex-1"
      refreshing={isRefetching}
      onRefresh={refetch}
      data={data}
      contentContainerClassName="p-2"
      renderItem={({ item }) => (
        <Link href={`/(private)/cash-flow/${item.id}`} asChild>
          <TouchableOpacity className="m-2">
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
