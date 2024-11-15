import DateTimePicker from "react-native-ui-datepicker";

import { DatePickerSingleProps } from "react-native-ui-datepicker/src/DateTimePicker";

import { forwardRef, useState } from "react";
import { Modal, Text, TouchableOpacity } from "react-native";

import { cn } from "@/src/utils/utils/utils";

export interface StyledDateTimePickerButtonProps
  extends Omit<DatePickerSingleProps, "mode"> {
  placeholder?: string;
  valueClassName?: string | undefined;
  placeholderClassName?: string;
}

const StyledDateTimePickerButton = forwardRef<
  React.ElementRef<typeof DateTimePicker>,
  StyledDateTimePickerButtonProps
>(
  (
    {
      placeholder = "Select date",
      valueClassName,
      placeholderClassName,
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
        <TouchableOpacity
          className={
            "web:flex h-10 native:h-12 web:w-full rounded-md border border-input bg-background px-3 web:py-2 web:ring-offset-background web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2"
          }
          onPress={() => setVisible(true)}
        >
          <Text
            className={cn(
              "text-base lg:text-sm native:text-lg native:leading-[1.25]",
              selectedDate ? "text-foreground" : "text-muted-foreground",
              selectedDate ? valueClassName : placeholderClassName
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
