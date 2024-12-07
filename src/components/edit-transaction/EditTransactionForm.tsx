import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  EXPENSE_CATEGORY_OPTIONS,
  FUND_OPTIONS,
  INCOME_CATEGORY_OPTIONS,
  TYPE_OPTIONS,
} from "@/src/constants";
import StyledDateTimePickerButton from "@/src/components/shared/StyledDateTimePickerButton";
import {
  Option,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/src/components/shared/react-native-reusables/Select";
import {
  Label,
  Textarea,
} from "@/src/components/shared/react-native-reusables";
import FormErrorText from "@/src/components/shared/FormErrorText";
import { Controller } from "react-hook-form";
import { useEditTransactionForm } from "@/src/contexts/EditTransactionFormContext";
import { Transaction } from "@/src/types/Transaction";
import { WithId } from "@/src/types/utlis";
import NominalInputButton from "@/src/components/shared/NominalInputButton";

type EditTransactionFormProps = {
  transaction: WithId<Transaction>;
};

export default function EditTransactionForm({
  transaction,
}: EditTransactionFormProps) {
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  const {
    setTransactionId,
    formMethods: { control, setValue, resetField },
    reset,
  } = useEditTransactionForm();

  const [type, setType] = useState<Option>(undefined);

  useEffect(() => {
    setTransactionId(transaction.id);
    const type =
      TYPE_OPTIONS.find(({ value }) => value === transaction.type) ??
      TYPE_OPTIONS[0];
    setValue("type", type);
    setType(type);
    setValue("nominal", `${transaction.nominal}`);
    const category_options =
      transaction.type === "income"
        ? INCOME_CATEGORY_OPTIONS
        : EXPENSE_CATEGORY_OPTIONS;
    setValue(
      "category",
      category_options.find(({ label }) => label === transaction.category) ??
        category_options[0]
    );
    setValue(
      "fund",
      FUND_OPTIONS.find(({ label }) => label === transaction.fund) ??
        FUND_OPTIONS[0]
    );
    setValue("date", transaction.date.toDate());
    setValue("description", transaction.description);
    return reset;
  }, [transaction]);

  const handleOnChangeType = (option: Option) => {
    if (option?.value !== type?.value) {
      setType(option);
      resetField("category");
    }
  };

  return (
    <View className="gap-4">
      <Controller
        control={control}
        name="type"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <View>
            <Label nativeID="type" className="mb-2">
              Type
            </Label>
            <Select
              aria-labelledby="type"
              value={value}
              onValueChange={(option) => {
                onChange(option);
                handleOnChangeType(option);
              }}
            >
              <SelectTrigger>
                <SelectValue
                  className="text-foreground text-sm native:text-lg"
                  placeholder="Select type"
                />
              </SelectTrigger>
              <SelectContent insets={contentInsets}>
                <SelectGroup>
                  <SelectLabel>Select type</SelectLabel>
                  {TYPE_OPTIONS.map(({ label, value }) => (
                    <SelectItem key={value} label={label} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {error && <FormErrorText>{error.message}</FormErrorText>}
          </View>
        )}
      />
      <Controller
        control={control}
        name="nominal"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <View>
            <Label nativeID="nominal" className="mb-2">
              Nominal
            </Label>
            <NominalInputButton
              placeholder="Nominal"
              value={value}
              onValueChange={onChange}
            />
            {error && <FormErrorText>{error.message}</FormErrorText>}
          </View>
        )}
      />
      <Controller
        control={control}
        name="category"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <View>
            <Label nativeID="category" className="mb-2">
              Category
            </Label>
            <Select
              aria-labelledby="category"
              key={type?.value ?? "category-pending"}
              value={value}
              onValueChange={onChange}
            >
              <SelectTrigger>
                <SelectValue
                  className="text-foreground text-sm native:text-lg"
                  placeholder="Select category"
                />
              </SelectTrigger>
              <SelectContent insets={contentInsets}>
                <SelectGroup>
                  {!type ? (
                    <SelectLabel>Please select type first</SelectLabel>
                  ) : (
                    <>
                      <SelectLabel>Select category</SelectLabel>
                      {(type.value === "expense"
                        ? EXPENSE_CATEGORY_OPTIONS
                        : INCOME_CATEGORY_OPTIONS
                      ).map(({ label, value }) => (
                        <SelectItem key={value} label={label} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </>
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
            {error && <FormErrorText>{error.message}</FormErrorText>}
          </View>
        )}
      />
      <Controller
        control={control}
        name="fund"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <View>
            <Label nativeID="fund" className="mb-2">
              Fund
            </Label>
            <Select
              aria-labelledby="fund"
              value={value}
              onValueChange={onChange}
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
                  {FUND_OPTIONS.map(({ label, value }) => (
                    <SelectItem key={value} label={label} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {error && <FormErrorText>{error.message}</FormErrorText>}
          </View>
        )}
      />
      <Controller
        control={control}
        name="date"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <View>
            <Label nativeID="date" className="mb-2">
              Date
            </Label>
            <StyledDateTimePickerButton
              aria-labelledby="date"
              placeholder="Select date"
              date={value}
              onChange={({ date }) => onChange(new Date(date!.toString()))}
            />
            {error && <FormErrorText>{error.message}</FormErrorText>}
          </View>
        )}
      />
      <Controller
        control={control}
        name="description"
        render={({
          field: { value, onChange, onBlur },
          fieldState: { error },
        }) => (
          <View>
            <Label nativeID="description" className="mb-2">
              Notes
            </Label>
            <Textarea
              aria-labelledby="description"
              placeholder="Add notes"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType="default"
              multiline
              numberOfLines={3}
            />
            {error && <FormErrorText>{error.message}</FormErrorText>}
          </View>
        )}
      />
    </View>
  );
}
