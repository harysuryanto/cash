import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import React from "react";

interface AddTransactionButtonProps extends TouchableOpacityProps {
  color?: string | undefined;
}

export default function AddTransactionButton({
  color,
  ...rest
}: AddTransactionButtonProps) {
  return (
    <TouchableOpacity
      hitSlop={{ left: 10, right: 100, top: 100, bottom: 100 }}
      {...rest}
    >
      <Text className={`text-[${color}]`}>Save</Text>
    </TouchableOpacity>
  );
}
