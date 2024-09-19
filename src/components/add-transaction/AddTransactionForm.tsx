import { View } from "react-native";
import React, { useState } from "react";
import { Input } from "@/src/components/shared/nativecn/Input";
import { Select } from "@/src/components/shared/nativecn/Select";
import StyledDateTimePickerButton from "../shared/StyledDateTimePickerButton";

export default function AddTransactionForm() {
  // TODO: Add form validation and form submission

  const [type, setSelectedOption] = useState<string | number | undefined>();
  const [nominal, setNominal] = useState<string>();
  const [category, setCategory] = useState<string | number | undefined>();
  const [fund, setFund] = useState<string | number | undefined>();
  const [date, setDate] = useState<Date>(new Date());
  const [description, setDescription] = useState<string>();

  return (
    <View className="gap-1">
      <Select
        label="Type"
        placeholder=""
        options={[
          { id: 1, name: "Expense" },
          { id: 2, name: "Income" },
        ]}
        labelKey="name"
        valueKey="id"
        selectedValue={type}
        onSelect={(value) => setSelectedOption(value)}
      />
      <Input
        label="Amount"
        value={nominal}
        onChangeText={setNominal}
        keyboardType="numeric"
      />
      <Select
        label="Category"
        placeholder=""
        options={[
          { id: 1, name: "Basic Need" },
          { id: 2, name: "Desire" },
          { id: 3, name: "Investment" },
        ]}
        labelKey="name"
        valueKey="id"
        selectedValue={category}
        onSelect={(value) => setCategory(value)}
      />
      <Select
        label="Fund"
        placeholder=""
        options={[{ id: 1, name: "Cash" }]}
        labelKey="name"
        valueKey="id"
        selectedValue={fund}
        onSelect={(value) => setFund(value)}
      />
      <StyledDateTimePickerButton
        label="Date"
        placeholder=""
        date={date}
        onChange={({ date }) => setDate(new Date(date!.toString()))}
      />
      <Input
        label="Notes"
        value={description}
        onChangeText={setDescription}
        keyboardType="default"
        multiline
        numberOfLines={3}
        textAlignVertical="top"
      />
    </View>
  );
}
