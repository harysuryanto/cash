import DateTimePicker from "react-native-ui-datepicker";

import { DatePickerSingleProps } from "react-native-ui-datepicker/src/DateTimePicker";

import { forwardRef, useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

import { cn } from "@/src/utils/utils/utils";

export interface StyledDateTimePickerButtonProps
  extends Omit<DatePickerSingleProps, "mode"> {
  className?: string | undefined;
  label?: string;
  labelClasses?: string;
  placeholder?: string;
  placeholderClasses?: string;
}

const StyledDateTimePickerButton = forwardRef<
  React.ElementRef<typeof DateTimePicker>,
  StyledDateTimePickerButtonProps
>(
  (
    {
      className,
      label,
      labelClasses,
      placeholder = "Select date",
      placeholderClasses,
      ...props
    },
    ref
  ) => {
    const [visible, setVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(
      undefined
    );

    return (
      <>
        <View className={cn("flex flex-col gap-1.5", className)}>
          {label && (
            <Text className={cn("text-base", labelClasses)}>{label}</Text>
          )}
          <TouchableOpacity
            className={
              "border border-input py-2.5 px-4 rounded-lg bg-white dark:bg-black"
              // TODO: Use dark mode again
              // "border border-input py-2.5 px-4 rounded-lg bg-white dark:bg-black"
            }
            onPress={() => setVisible(true)}
          >
            <Text
              className={cn(
                "text-base",
                selectedDate ? "text-black" : "text-gray-500",
                placeholderClasses
              )}
            >
              {selectedDate
                ? `${selectedDate.getDate()} ${selectedDate.toLocaleString(
                    "default",
                    { month: "long" }
                  )} ${selectedDate.getFullYear()}`
                : placeholder}
            </Text>
          </TouchableOpacity>
        </View>
        <Modal visible={visible} animationType="fade">
          <DateTimePicker
            {...props}
            date={selectedDate}
            onChange={(param) => {
              if (!param.date) return;

              setVisible(false);
              setSelectedDate(new Date(param.date.toString()));
              props.onChange?.(param);
            }}
            mode="single"
          />
        </Modal>
      </>
    );
  }
);

export default StyledDateTimePickerButton;
