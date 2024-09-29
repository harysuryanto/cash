import { ScrollView, View } from "react-native";
import React from "react";
import AddTransactionForm from "./AddTransactionForm";
import usePageFocusAnalytic from "@/src/hooks/usePageFocusAnalytic";

export default function AddTransactionPage() {
  usePageFocusAnalytic("Add Transaction Page");

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-3">
        <AddTransactionForm />
      </View>
    </ScrollView>
  );
}
