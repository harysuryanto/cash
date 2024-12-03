import { View, ViewProps } from "react-native";
import React from "react";
import { Text } from "@/src/components/shared/react-native-reusables/Text";
import { useNominalTyper } from "./NominalTyperContext";
import { formatCurrency } from "@/src/utils/utils/formatter";
import { cn } from "@/src/utils/utils/utils";

type NominalTextProps = ViewProps;

export default function NominalText({ className, ...rest }: NominalTextProps) {
  const { nominal, storedValue, currentOperation } = useNominalTyper();

  const formatOperation = () => {
    if (storedValue === null || currentOperation === null) return "";
    return `${storedValue} ${currentOperation} ${nominal}`;
  };

  return (
    <View className={cn("p-8 justify-end", className)} {...rest}>
      {storedValue !== null && currentOperation !== null && (
        <Text className="text-2xl text-right text-muted-foreground mb-2">
          {formatOperation()}
        </Text>
      )}
      <Text className="text-4xl text-right font-medium">
        {formatCurrency(nominal)}
      </Text>
    </View>
  );
}
