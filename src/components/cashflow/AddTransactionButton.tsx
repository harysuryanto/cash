import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useColorScheme } from "@/src/hooks/useColorScheme";

interface AddTransactionButtonProps extends TouchableOpacityProps {}

export default function AddTransactionButton({
  ...rest
}: AddTransactionButtonProps) {
  const { isDarkColorScheme } = useColorScheme();

  return (
    <Link href="/(private)/cash-flow/add" asChild>
      <TouchableOpacity hitSlop={16} {...rest}>
        <Ionicons
          name="add"
          size={24}
          color={isDarkColorScheme ? "#fafafa" : "#0a0a0b"}
        />
      </TouchableOpacity>
    </Link>
  );
}
