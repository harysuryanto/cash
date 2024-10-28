import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { Input } from "@/src/components/shared/nativecn/Input";
import { Select } from "@/src/components/shared/nativecn/Select";
import StyledDateTimePickerButton from "@/src/components/shared/StyledDateTimePickerButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Transaction } from "@/src/types/Transaction";
import { Timestamp } from "firebase/firestore";
import { addTransaction } from "@/src/services/transaction";
import { useRouter } from "expo-router";
import { createTransactionsListQueryKey } from "@/src/hooks/useTransactionsList";
import { Button } from "@/src/components/shared/react-native-reusables/Button";
import { Text } from "@/src/components/shared/react-native-reusables/Text";

export default function AddTransactionForm() {
  const router = useRouter();

  // TODO: Add form validation and form submission

  const categories: Record<
    "expense" | "income",
    { id: number; name: string }[]
  > = {
    expense: [
      { id: 1, name: "Basic Need" },
      { id: 2, name: "Desire" },
      { id: 3, name: "Investment" },
      { id: 4, name: "Uncategorized" },
    ],
    income: [
      { id: 1, name: "Salary" },
      { id: 2, name: "Bonus" },
      { id: 3, name: "Investment Return" },
      { id: 4, name: "Uncategorized" },
    ],
  };

  const funds: { id: number; name: string }[] = [{ id: 1, name: "Cash" }];

  const [type, setType] = useState<"expense" | "income" | undefined>();
  const [nominal, setNominal] = useState<string>();
  const [categoryId, setCategoryId] = useState<number | undefined>();
  const [fundId, setFundId] = useState<number | undefined>(1);
  const [date, setDate] = useState<Date>(new Date());
  const [description, setDescription] = useState<string>();

  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: async (data: Omit<Transaction, "id">) => {
      return await addTransaction(data);
    },
    onSuccess: async () => {
      router.back();
      await queryClient.invalidateQueries({
        queryKey: createTransactionsListQueryKey(),
      });
    },
  });

  useEffect(() => {
    setCategoryId(undefined);
  }, [type]);

  useEffect(() => {
    if (error) console.log(error);
  }, [error]);

  const onSubmit = async () => {
    if (!type || !nominal || !categoryId || !fundId || !date) {
      return;
    }

    mutate({
      type: type,
      category: categories[type].find(({ id }) => id === Number(categoryId))!
        .name,
      date: Timestamp.fromDate(date),
      description: description ?? "",
      fund: funds.find(({ id }) => id === Number(fundId))!.name,
      nominal: Number(nominal),
    });
  };

  return (
    <View className="gap-1">
      <Select
        label="Type"
        placeholder="Select type"
        options={[
          { id: "expense", name: "Expense" },
          { id: "income", name: "Income" },
        ]}
        labelKey="name"
        valueKey="id"
        selectedValue={type}
        onSelect={(value) => setType(value as Transaction["type"])}
      />
      <Input
        label="Nominal"
        placeholder="Nominal"
        value={nominal}
        onChangeText={setNominal}
        keyboardType="numeric"
      />
      {Boolean(type) ? (
        <Select
          label="Category"
          placeholder="Select category"
          options={type === "income" ? categories.income : categories.expense}
          labelKey="name"
          valueKey="id"
          selectedValue={categoryId}
          onSelect={(value) => setCategoryId(value as number)}
        />
      ) : (
        <></>
      )}
      <Select
        label="Fund"
        placeholder="Select fund"
        options={[{ id: 1, name: "Cash" }]}
        labelKey="name"
        valueKey="id"
        selectedValue={fundId}
        onSelect={(value) => setFundId(value as number)}
      />
      <StyledDateTimePickerButton
        label="Date"
        placeholder="Select date"
        date={date}
        onChange={({ date }) => setDate(new Date(date!.toString()))}
      />
      <Input
        label="Notes"
        placeholder="Add notes"
        value={description}
        onChangeText={setDescription}
        keyboardType="default"
        multiline
        numberOfLines={3}
        textAlignVertical="top"
      />
      <Button onPress={onSubmit} disabled={isPending}>
        <Text>Submit</Text>
      </Button>
    </View>
  );
}
