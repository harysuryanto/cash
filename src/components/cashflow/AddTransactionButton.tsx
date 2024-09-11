import {
  TouchableOpacity,
  TouchableOpacityProps,
  ViewProps,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";

interface AddTransactionButtonProps extends TouchableOpacityProps {
  color?: string | undefined;
}

export default function AddTransactionButton({
  color,
  ...rest
}: AddTransactionButtonProps) {
  return (
    <Link href="(private)/cash-flow/add" asChild>
      <TouchableOpacity {...rest}>
        <Ionicons name="add" size={24} color={color} />
      </TouchableOpacity>
    </Link>
  );
}
