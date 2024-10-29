import { Text } from "@/src/components/shared/react-native-reusables/Text";
import React from "react";

type FormErrorTextProps = {
  children: string | undefined;
};

export default function FormErrorText({ children }: FormErrorTextProps) {
  return (
    <Text className="text-sm font-medium text-destructive">{children}</Text>
  );
}
