import { View } from "react-native";
import React, { useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import StyledDateTimePickerButton from "@/src/components/shared/StyledDateTimePickerButton";
import { Input } from "@/src/components/shared/react-native-reusables/Input";
import { Label } from "@/src/components/shared/react-native-reusables/Label";
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
import FormErrorText from "@/src/components/shared/FormErrorText";
import { useAddTransactionForm } from "@/src/contexts/AddTransactionFormContext";
import { Controller } from "react-hook-form";
import {
  EXPENSE_CATEGORY_OPTIONS,
  FUND_OPTIONS,
  INCOME_CATEGORY_OPTIONS,
  TYPE_OPTIONS,
} from "@/src/constants";

export default function AddTransactionForm() {
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  const {
    formMethods: { control, getValues },
    reset,
  } = useAddTransactionForm();
  const type = getValues("type");

  useEffect(() => {
    return reset;
  }, []);

  return (
    <View className="gap-1">
      <Controller
        control={control}
        name="type"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <View>
            <Label nativeID="type">Type</Label>
            <Select
              aria-labelledby="type"
              value={value}
              onValueChange={onChange}
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
        render={({
          field: { value, onChange, onBlur },
          fieldState: { error },
        }) => (
          <View>
            <Label nativeID="nominal">Nominal</Label>
            <Input
              aria-labelledby="nominal"
              placeholder="Nominal"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType="numeric"
            />
            {error && <FormErrorText>{error.message}</FormErrorText>}
          </View>
        )}
      />
      {!!type ? (
        <Controller
          control={control}
          name="category"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <View>
              <Label nativeID="category">Category</Label>
              <Select
                aria-labelledby="category"
                key={type.value}
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
                    <SelectLabel>Select category</SelectLabel>
                    {(type.value === "expense"
                      ? EXPENSE_CATEGORY_OPTIONS
                      : INCOME_CATEGORY_OPTIONS
                    ).map(({ label, value }) => (
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
      ) : (
        <></>
      )}
      <Controller
        control={control}
        name="fund"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <View>
            <Label nativeID="fund">Fund</Label>
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
            <Label nativeID="date">Date</Label>
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
            <Label nativeID="description">Notes</Label>
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
