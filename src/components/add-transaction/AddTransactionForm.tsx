import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Transaction } from "@/src/types/Transaction";
import { Timestamp } from "firebase/firestore";
import { addTransaction } from "@/src/services/transaction";
import { useRouter } from "expo-router";
import { createTransactionsListQueryKey } from "@/src/hooks/useTransactionsList";
import StyledDateTimePickerButton from "@/src/components/shared/StyledDateTimePickerButton";
import { Input } from "@/src/components/shared/react-native-reusables/Input";
import { Button } from "@/src/components/shared/react-native-reusables/Button";
import { Label } from "@/src/components/shared/react-native-reusables/Label";
import { Text } from "@/src/components/shared/react-native-reusables/Text";
import { Textarea } from "@/src/components/shared/react-native-reusables/Textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/src/components/shared/react-native-reusables/Select";
import * as SelectPrimitive from "@/src/components/shared/react-native-reusables/primitives/select";

export default function AddTransactionForm() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  // TODO: Add form validation and form submission

  const typeOptions: SelectPrimitive.Option[] = [
    { value: "expense", label: "Expense" },
    { value: "income", label: "Income" },
  ];
  const expenseCategories: SelectPrimitive.Option[] = [
    { value: "Basic Need", label: "Basic Need" },
    { value: "Desire", label: "Desire" },
    { value: "Investment", label: "Investment" },
    { value: "Uncategorized", label: "Uncategorized" },
  ];
  const incomeCategories: SelectPrimitive.Option[] = [
    { value: "Salary", label: "Salary" },
    { value: "Bonus", label: "Bonus" },
    { value: "Investment Return", label: "Investment Return" },
    { value: "Uncategorized", label: "Uncategorized" },
  ];
  const fundOptions: SelectPrimitive.Option[] = [
    { value: "Cash", label: "Cash" },
  ];

  const [type, setType] = useState<SelectPrimitive.Option | undefined>();
  const [nominal, setNominal] = useState<string>();
  const [category, setCategory] = useState<
    SelectPrimitive.Option | undefined
  >();
  const [fund, setFund] = useState<SelectPrimitive.Option | undefined>();
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
    setCategory(undefined);
  }, [type]);

  useEffect(() => {
    if (error) console.log(error);
  }, [error]);

  const onSubmit = () => {
    if (!type || !nominal || !category || !fund || !date) {
      return;
    }

    mutate({
      type: type.value as Transaction["type"],
      category: category.value as Transaction["category"],
      date: Timestamp.fromDate(date),
      description: description ?? "",
      fund: fund.value as Transaction["fund"],
      nominal: Number(nominal),
    });
  };

  return (
    <View className="gap-1">
      <View>
        <Label nativeID="type">Type</Label>
        <Select aria-labelledby="type" value={type} onValueChange={setType}>
          <SelectTrigger>
            <SelectValue
              className="text-foreground text-sm native:text-lg"
              placeholder="Select type"
            />
          </SelectTrigger>
          <SelectContent insets={contentInsets}>
            <SelectGroup>
              <SelectLabel>Select type</SelectLabel>
              {typeOptions
                .filter((option) => option !== undefined)
                .map(({ label, value }) => (
                  <SelectItem key={value} label={label} value={value}>
                    {label}
                  </SelectItem>
                ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </View>
      <View>
        <Label nativeID="nominal">Nominal</Label>
        <Input
          aria-labelledby="nominal"
          placeholder="Nominal"
          value={nominal}
          onChangeText={setNominal}
          keyboardType="numeric"
        />
      </View>
      {type !== undefined ? (
        <View>
          <Label nativeID="category">Category</Label>
          <Select
            aria-labelledby="category"
            key={type?.value}
            value={category}
            onValueChange={setCategory}
          >
            <SelectTrigger>
              <SelectValue
                className="text-foreground text-sm native:text-lg"
                placeholder="Select category"
              />
            </SelectTrigger>
            <SelectContent insets={contentInsets}>
              <SelectGroup>
                <SelectLabel>Select category</SelectLabel>
                {(type.value === "expense"
                  ? expenseCategories
                  : incomeCategories
                )
                  .filter((option) => option !== undefined)
                  .map(({ label, value }) => (
                    <SelectItem key={value} label={label} value={value}>
                      {label}
                    </SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </View>
      ) : (
        <></>
      )}
      <View>
        <Label nativeID="fund">Fund</Label>
        <Select
          key={type?.value}
          aria-labelledby="fund"
          value={fund}
          onValueChange={setFund}
        >
          <SelectTrigger>
            <SelectValue
              className="text-foreground text-sm native:text-lg"
              placeholder="Select fund"
            />
          </SelectTrigger>
          <SelectContent insets={contentInsets}>
            <SelectGroup>
              <SelectLabel>Select fund</SelectLabel>
              {fundOptions
                .filter((option) => option !== undefined)
                .map(({ label, value }) => (
                  <SelectItem key={value} label={label} value={value}>
                    {label}
                  </SelectItem>
                ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </View>
      <View>
        <Label nativeID="date">Date</Label>
        <StyledDateTimePickerButton
          aria-labelledby="date"
          placeholder="Select date"
          date={date}
          onChange={({ date }) => setDate(new Date(date!.toString()))}
        />
      </View>
      <View>
        <Label nativeID="description">Notes</Label>
        <Textarea
          aria-labelledby="description"
          placeholder="Add notes"
          value={description}
          onChangeText={setDescription}
          keyboardType="default"
          multiline
          numberOfLines={3}
        />
      </View>
      <Button onPress={onSubmit} disabled={isPending}>
        <Text>Submit</Text>
      </Button>
    </View>
  );
}
