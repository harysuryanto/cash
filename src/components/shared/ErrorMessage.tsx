import React from "react";
import { RefreshControl, ScrollView, View, type TextProps } from "react-native";
import { Text } from "@/src/components/shared/react-native-reusables/Text";

type ErrorMessageWithRefreshProps = TextProps & {
  error?: Error | "no-data" | string;
  fullscreen?: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
};

/**
 * Renders an error message that can also be used as a full screen.
 *
 * @param {object} props
 * @prop {Error | "no-data" | string} error The error message to display.
 * @prop {boolean} [fullscreen=false] If true, the error message will be displayed
 *   full screen. If false, the error message will be rendered as a simple Text
 *   component.
 * @prop {boolean} [fullscreen=false] If true, the error message will be displayed
 *   full screen. If false, the error message will be rendered as a simple Text
 *   component.
 * @prop {boolean} [refreshing=false] Whether the component is currently refreshing.
 *   Available only when fullscreen is true.
 * @prop {function} [onRefresh] The function to call when the user pulls to
 *   refresh. Available only when fullscreen is true.
 * @prop {object} [rest] Any other props you want to pass to the inner Text
 *   component.
 */
export default function ErrorMessageWithRefresh({
  error,
  fullscreen = false,
  refreshing = false,
  onRefresh,
  ...rest
}: ErrorMessageWithRefreshProps) {
  const ErrorMessage = () => (
    <Text {...rest} className={rest.className}>
      {!error
        ? "Unknown error."
        : error instanceof Error
        ? error.message
        : error === "no-data"
        ? "Data unavailable."
        : error}
    </Text>
  );

  if (fullscreen) {
    return (
      <ScrollView
        className="flex-1"
        contentContainerClassName="grow justify-center"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="flex-1 justify-center items-center">
          <ErrorMessage />
        </View>
      </ScrollView>
    );
  }

  return <ErrorMessage />;
}
