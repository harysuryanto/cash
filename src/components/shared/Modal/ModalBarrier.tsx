import React, { useMemo } from "react";
import {
  Platform,
  Pressable,
  StyleSheet,
  useWindowDimensions,
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
  const screenWidth = useWindowDimensions().width;
  const contentWidth = useMemo(() => {
    const screenPadding = 16;
    const isSm = screenWidth > 640 + screenPadding * 2;
    return isSm ? 640 : screenWidth - screenPadding * 2;
  }, [screenWidth]);

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
        <Pressable className="flex flex-1" onPress={onPress} />
        <View style={{ width: contentWidth }}>{children}</View>
        <Pressable className="flex flex-1" onPress={onPress} />
      </View>
      <Pressable className="flex flex-1" onPress={onPress} />
    </View>
  );
}
