import {
  ActivityIndicator,
  ActivityIndicatorProps,
  View,
  ViewProps,
} from "react-native";
import React from "react";
import { cn } from "@/src/utils/utils/utils";

type LoadingIndicatorProps = {
  fullscreen?: boolean;
  viewProps?: ViewProps;
  activityIndicatorProps?: ActivityIndicatorProps;
};

/**
 * LoadingIndicator is a component that wraps an ActivityIndicator and View
 * to easily show a loading indicator.
 */
export default function LoadingIndicator({
  fullscreen,
  viewProps,
  activityIndicatorProps,
}: LoadingIndicatorProps) {
  return (
    <View
      {...viewProps}
      className={cn(
        fullscreen ? "flex-1" : undefined,
        "items-center justify-center",
        viewProps?.className
      )}
    >
      <ActivityIndicator
        size={fullscreen ? "large" : undefined}
        {...activityIndicatorProps}
        className={cn("text-foreground", activityIndicatorProps?.className)}
      />
    </View>
  );
}
