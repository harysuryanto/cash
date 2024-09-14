import { View } from "react-native";
import React from "react";
import AddTransactionForm from "./AddTransactionForm";

export default function AddTransactionPage() {
  return (
    <View className="flex-1 p-3 bg-white">
      <AddTransactionForm />
    </View>
  );
}
