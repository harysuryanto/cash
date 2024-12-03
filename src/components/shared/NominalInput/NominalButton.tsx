import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import React from "react";
import { Text } from "@/src/components/shared/react-native-reusables/Text";
import * as Haptics from "expo-haptics";
import { cn } from "@/src/utils/utils/utils";

type NominalButtonProps = {
  digit: string;
  variant?: "default" | "primary" | "destructive";
} & TouchableOpacityProps;

export default function NominalButton({
  digit,
  variant = "default",
  className,
  ...rest
}: NominalButtonProps) {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <TouchableOpacity
      className={cn(
        "flex-1 aspect-square items-center justify-center m-1 rounded-2xl bg-secondary/50 active:bg-secondary/80",
        variant === "primary" && "bg-primary active:bg-primary/80",
        variant === "destructive" && "bg-destructive active:bg-destructive/80",
        className
      )}
      onPress={handlePress}
      {...rest}
    >
      {rest.children || (
        <Text
          className={cn(
            "text-2xl font-medium",
            variant === "primary" && "text-primary-foreground",
            variant === "destructive" && "text-destructive-foreground"
          )}
        >
          {digit}
        </Text>
      )}
    </TouchableOpacity>
  );
}
