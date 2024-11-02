import { useState, useCallback } from "react";
import { View, ActivityIndicator } from "react-native";
import ModalComponent from "@/src/components/shared/Modal";
import { Text } from "@/src/components/shared/react-native-reusables/Text";
import { Button } from "@/src/components/shared/react-native-reusables/Button";
import { cn } from "@/src/utils/utils/utils";

type UseDeleteConfirmationModalProps = {
  onDelete: () => Promise<any>;
  title?: string;
  description?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
};

type MutationResult = {
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  isSuccess: boolean;
};

export const useDeleteConfirmationModal = ({
  onDelete,
  title = "Confirm Deletion",
  description = "Are you sure you want to delete this item? This action cannot be undone.",
  confirmButtonText = "Delete",
  cancelButtonText = "Cancel",
}: UseDeleteConfirmationModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mutationResult, setMutationResult] = useState<MutationResult>({
    isLoading: false,
    isError: false,
    error: null,
    isSuccess: false,
  });

  const openModal = useCallback(() => {
    setIsModalOpen(true);
    setMutationResult({
      isLoading: false,
      isError: false,
      error: null,
      isSuccess: false,
    });
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleConfirm = useCallback(async () => {
    setMutationResult((prev) => ({ ...prev, isLoading: true }));
    try {
      await onDelete();
      setMutationResult({
        isLoading: false,
        isError: false,
        error: null,
        isSuccess: true,
      });
      closeModal();
    } catch (error) {
      setMutationResult({
        isLoading: false,
        isError: true,
        error: error as Error,
        isSuccess: false,
      });
    }
  }, [onDelete, closeModal]);

  const Modal = useCallback(() => {
    return (
      <ModalComponent visible={isModalOpen} onClose={closeModal}>
        {mutationResult.isLoading ? (
          <ActivityIndicator className="accent" size="large" />
        ) : (
          <View
            className={cn(
              "gap-4 web:cursor-default web:duration-200 ",
              isModalOpen
                ? "web:animate-in web:fade-in-0 web:zoom-in-95"
                : "web:animate-out web:fade-out-0 web:zoom-out-95"
            )}
          >
            <View className="flex flex-col gap-1.5 text-center sm:text-left">
              <Text className="text-lg native:text-xl text-foreground font-semibold leading-none tracking-tight">
                {title}
              </Text>
              <Text className="text-sm native:text-base text-muted-foreground">
                {description}
              </Text>
            </View>
            <View className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
              <Button variant="ghost" onPress={closeModal}>
                <Text>{cancelButtonText}</Text>
              </Button>
              <Button variant="destructive" onPress={handleConfirm}>
                <Text>{confirmButtonText}</Text>
              </Button>
            </View>
          </View>
        )}
      </ModalComponent>
    );
  }, [
    isModalOpen,
    mutationResult,
    title,
    description,
    confirmButtonText,
    cancelButtonText,
    handleConfirm,
    closeModal,
  ]);

  return {
    Modal,
    isModalOpen,
    openModal,
    closeModal,
    mutationResult,
  };
};
