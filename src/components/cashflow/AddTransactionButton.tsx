import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

interface AddTransactionButtonProps extends TouchableOpacityProps {
  color?: string | undefined;
}

export default function AddTransactionButton({
  color,
  ...rest
}: AddTransactionButtonProps) {
  return (
    <Link href="/(private)/cash-flow/add" asChild>
      <TouchableOpacity
        hitSlop={{ left: 16, right: 100, top: 100, bottom: 100 }}
        {...rest}
      >
        <Ionicons name="add" size={24} color={color} />
      </TouchableOpacity>
    </Link>
  );
}
