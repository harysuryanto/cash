import React from "react";
import { env } from "@/src/utils/utils/env";
import Constants from "expo-constants";
import { Text } from "@/src/components/shared/react-native-reusables";

export default function HomePageFooter() {
  return (
    <Text style={{ width: "100%", textAlign: "center" }}>
      v{Constants.expoConfig?.version} - {env.EXPO_PUBLIC_APP_ENV}
    </Text>
  );
}
