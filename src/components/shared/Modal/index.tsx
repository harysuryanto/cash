import React from "react";
import { Modal as RNModal, ScrollView, View } from "react-native";

import ModalBarrier from "./ModalBarrier";
import { cn } from "@/src/utils/utils/utils";

interface ModalProps {
  visible: boolean;
  onClose?: () => void;
  children?: JSX.Element | JSX.Element[];
  className?: string | undefined;
}

export default function Modal({
  visible,
  onClose = () => {},
  children,
  className,
}: ModalProps) {
  return (
    <RNModal
      visible={visible}
      onRequestClose={onClose}
      animationType="fade"
      statusBarTranslucent
      transparent
    >
      <ModalBarrier onPress={onClose}>
        <View
          className={cn(
            "gap-4 border border-border web:cursor-default bg-background p-6 shadow-lg web:duration-200 rounded-lg",
            visible
              ? "web:animate-in web:fade-in-0 web:zoom-in-95"
              : "web:animate-out web:fade-out-0 web:zoom-out-95",
            className
          )}
        >
          <ScrollView>{children}</ScrollView>
        </View>
      </ModalBarrier>
    </RNModal>
  );
}
