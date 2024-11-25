import { Platform, View, ViewProps } from "react-native";
import React from "react";
import { Text } from "@/src/components/shared/react-native-reusables/Text";
import { cn } from "@/src/utils/utils/utils";
import { env } from "@/src/utils/utils/env";

type DevInfoProps = ViewProps & {
  enabled?: boolean;
};

export default function DevInfo({
  enabled = process.env.EXPO_PUBLIC_APP_ENV !== "production" &&
    Platform.OS !== "web",
  ...rest
}: DevInfoProps) {
  if (!enabled) return null;

  return (
    <View {...rest} className={cn("gap-2 p-4", rest.className)}>
      <View className="justify-between p-2 rounded-lg bg-primary-foreground">
        <Text className="font-semibold">env.EXPO_PUBLIC_APP_ENV</Text>
        <Text>{env.EXPO_PUBLIC_APP_ENV || "not found"}</Text>
      </View>
      <View className="justify-between p-2 rounded-lg bg-primary-foreground">
        <Text className="font-semibold">process.env.EXPO_PUBLIC_APP_ENV</Text>
        <Text>{process.env.EXPO_PUBLIC_APP_ENV || "not found"}</Text>
      </View>
    </View>
  );
}
