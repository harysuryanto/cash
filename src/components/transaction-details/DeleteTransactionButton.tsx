import {
  ActivityIndicator,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTransaction } from "@/src/services/transaction";
import { createTransactionsListQueryKey } from "@/src/hooks/useTransactionsList";
import { useDeleteConfirmationModal } from "@/src/hooks/useDeleteConfirmationModal";
import { Text } from "@/src/components/shared/react-native-reusables/Text";
import { useRouter } from "expo-router";

interface DeleteTransactionButtonProps extends TouchableOpacityProps {
  transactionId: string;
}

export default function DeleteTransactionButton({
  transactionId,
}: DeleteTransactionButtonProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (id: string) => {
      return await deleteTransaction(id);
    },
    onError: (error) => {
      alert(error.message);
    },
    onSuccess: async () => {
      router.back();
      await queryClient.invalidateQueries({
        queryKey: createTransactionsListQueryKey(),
      });
    },
  });

  const { Modal: DeleteConfirmationModal, openModal } =
    useDeleteConfirmationModal({
      onDelete: async () => {
        mutate(transactionId);
      },
    });

  if (isPending) {
    return <ActivityIndicator size="small" />;
  }

  return (
    <>
      <TouchableOpacity onPress={openModal} hitSlop={16}>
        <Text className="text-destructive">Delete</Text>
      </TouchableOpacity>
      <DeleteConfirmationModal />
    </>
  );
}
