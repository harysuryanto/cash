import { View, ViewProps } from "react-native";
import React from "react";
import Constants from "expo-constants";
import { Text } from "@/src/components/shared/react-native-reusables/Text";
import { cn } from "@/src/utils/utils/utils";

type DevInfoProps = ViewProps & {
  enabled?: boolean;
};

export default function DevInfo({
  enabled = process.env.NODE_ENV === "development",
  ...rest
}: DevInfoProps) {
  if (!enabled) return null;

  const processEnv = JSON.stringify(process.env);
  const expoConfigExtra = JSON.stringify(Constants.expoConfig?.extra);
  // @ts-expect-error
  const easConfigExtra = JSON.stringify(Constants.easConfig?.extra);

  return (
    <View {...rest} className={cn("gap-2 p-4", rest.className)}>
      <View className="justify-between p-2 rounded-lg bg-primary-foreground">
        <Text className="font-semibold">process.env</Text>
        <Text>{processEnv}</Text>
      </View>
      <View className="justify-between p-2 rounded-lg bg-primary-foreground">
        <Text className="font-semibold">Constants.expoConfig.extra</Text>
        <Text>{expoConfigExtra}</Text>
      </View>
      <View className="justify-between p-2 rounded-lg bg-primary-foreground">
        <Text className="font-semibold">Constants.easConfig.extra</Text>
        <Text>{easConfigExtra}</Text>
      </View>
    </View>
  );
}
