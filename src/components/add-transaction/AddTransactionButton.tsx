import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import React from "react";
import useAnalytics from "@/src/hooks/useAnalytics";

interface AddTransactionButtonProps extends TouchableOpacityProps {
  color?: string | undefined;
}

export default function AddTransactionButton({
  color,
  ...rest
}: AddTransactionButtonProps) {
  const { capture } = useAnalytics();

  return (
    <TouchableOpacity
      hitSlop={{ left: 10, right: 100, top: 100, bottom: 100 }}
      onPress={() =>
        capture({ eventType: "do", eventDetails: "add_transaction" })
      }
      {...rest}
    >
      <Text className={`text-[${color}]`}>Save</Text>
    </TouchableOpacity>
  );
}
