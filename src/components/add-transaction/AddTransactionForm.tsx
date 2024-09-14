import { View } from "react-native";
import React from "react";
import StyledTextInput from "@/src/components/shared/StyledTextInput";

export default function AddTransactionForm() {
  return (
    <View className="gap-1">
      <StyledTextInput
        label="Type (income/expense)"
        keyboardType="numeric"
        required
      />
      <StyledTextInput label="Amount" keyboardType="numeric" required />
      <StyledTextInput label="Category" keyboardType="default" required />
      <StyledTextInput
        label="Source of funds"
        keyboardType="default"
        required
      />
      <StyledTextInput label="Date" keyboardType="default" required />
      <StyledTextInput
        label="Notes"
        keyboardType="default"
        multiline
        numberOfLines={3}
        textAlignVertical="top"
      />
    </View>
  );
}
