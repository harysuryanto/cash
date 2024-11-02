import React from "react";
import {
  Dimensions,
  Platform,
  Pressable,
  StyleSheet,
  View,
  ViewProps,
} from "react-native";
import { cn } from "@/src/utils/utils/utils";

type ModalBarrierProps = Omit<ViewProps, "onPress" | "style" | "className"> & {
  onPress?: () => void;
};

export default function ModalBarrier({
  children,
  onPress,
  ...rest
}: ModalBarrierProps) {
  const isWeb = Platform.OS === "web";

  return (
    <View
      style={isWeb ? undefined : StyleSheet.absoluteFill}
      className={cn(
        isWeb
          ? "flex bg-black/80 absolute top-0 right-0 bottom-0 left-0"
          : "flex bg-black/80"
      )}
      {...rest}
    >
      <Pressable className="flex flex-1" onPress={onPress} />
      <View className="flex flex-row">
        <Pressable className="w-[16]" onPress={onPress} />
        <View className="flex flex-1">{children}</View>
        <Pressable className="w-[16]" onPress={onPress} />
      </View>
      <Pressable className="flex flex-1" onPress={onPress} />
    </View>
  );
}
