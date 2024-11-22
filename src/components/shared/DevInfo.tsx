import { Platform, View, ViewProps } from "react-native";
import React from "react";
import Constants from "expo-constants";
import { Text } from "@/src/components/shared/react-native-reusables/Text";
import { cn } from "@/src/utils/utils/utils";
import { env } from "@/src/utils/utils/env";

type DevInfoProps = ViewProps & {
  enabled?: boolean;
};

export default function DevInfo({
  enabled = env.EXPO_PUBLIC_APP_ENV !== "production" && Platform.OS !== "web",
  ...rest
}: DevInfoProps) {
  if (!enabled) return null;

  const expoConfigExtra = JSON.stringify(Constants.expoConfig?.extra);
  // @ts-expect-error
  const easConfigExtra = JSON.stringify(Constants.easConfig?.extra);

  return (
    <View {...rest} className={cn("gap-2 p-4", rest.className)}>
      <View className="justify-between p-2 rounded-lg bg-primary-foreground">
        <Text className="font-semibold">Constants.expoConfig.extra</Text>
        <Text>{expoConfigExtra}</Text>
      </View>
      <View className="justify-between p-2 rounded-lg bg-primary-foreground">
        <Text className="font-semibold">Constants.easConfig.extra</Text>
        <Text>{easConfigExtra}</Text>
      </View>
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
