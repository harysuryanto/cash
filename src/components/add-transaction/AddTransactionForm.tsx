import { View } from "react-native";
import React, { useState } from "react";
import { Input } from "@/src/components/shared/nativecn/Input";
import { Select } from "@/src/components/shared/nativecn/Select";
import StyledDateTimePickerButton from "../shared/StyledDateTimePickerButton";

export default function AddTransactionForm() {
  // TODO: Add form validation and form submission

  const [selectedOption, setSelectedOption] = useState<
    string | number | undefined
  >();

  return (
    <View className="gap-1">
      <Select
        label="Type"
        options={[
          { id: 1, name: "Expense" },
          { id: 2, name: "Income" },
        ]}
        labelKey="name"
        valueKey="id"
        selectedValue={selectedOption}
        onSelect={(value) => setSelectedOption(value)}
      />
      <Input label="Amount" keyboardType="numeric" />
      <Select
        label="Category"
        options={[
          { id: 1, name: "Basic Need" },
          { id: 2, name: "Desire" },
          { id: 3, name: "Investment" },
        ]}
        labelKey="name"
        valueKey="id"
        selectedValue={selectedOption}
        onSelect={(value) => setSelectedOption(value)}
      />
      <Select
        label="Fund"
        options={[{ id: 1, name: "Cash" }]}
        labelKey="name"
        valueKey="id"
        selectedValue={selectedOption}
        onSelect={(value) => setSelectedOption(value)}
      />
      <StyledDateTimePickerButton label="Date" onChange={console.log} />
      <Input
        label="Notes"
        keyboardType="default"
        multiline
        numberOfLines={3}
        textAlignVertical="top"
      />
    </View>
  );
}
