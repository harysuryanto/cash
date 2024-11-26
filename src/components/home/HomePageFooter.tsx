import React from "react";
import { Text } from "@/src/components/shared/react-native-reusables";
import Constants from "expo-constants";
import { env } from "@/src/utils/utils/env";

export default function HomePageFooter() {
  const appEnv =
    env.EXPO_PUBLIC_APP_ENV !== "production"
      ? ` - ${env.EXPO_PUBLIC_APP_ENV}`
      : "";

  return (
    <Text className="text-sm text-center text-muted-foreground">
      v{Constants.expoConfig?.version}
      {appEnv}
    </Text>
  );
}
