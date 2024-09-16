import { ScrollView, View } from "react-native";
import React from "react";
import AddTransactionForm from "./AddTransactionForm";

export default function AddTransactionPage() {
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-3">
        <AddTransactionForm />
      </View>
    </ScrollView>
  );
}
