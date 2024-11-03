import React, { useState } from "react";
import { Platform, TouchableOpacity, View, ViewProps } from "react-native";
import * as Haptics from "expo-haptics";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/src/components/shared/react-native-reusables/Card";
import { Text } from "@/src/components/shared/react-native-reusables/Text";
import { useDeleteConfirmationModal } from "@/src/hooks/useDeleteConfirmationModal";
import Modal from "@/src/components/shared/Modal";
import { deleteTransaction } from "@/src/services/transaction";
import { createTransactionsListQueryKey } from "@/src/hooks/useTransactionsList";
import { Link } from "expo-router";

type TransactionCardProps = Omit<ViewProps, "children"> & {
  id: string;
  type: string;
  nominal: string;
  category: string;
  fund: string;
  date: string;
  description: string;
};

export default function TransactionCard({
  id,
  type,
  nominal,
  category,
  fund,
  date,
  description,
  ...rest
}: TransactionCardProps) {
  const queryClient = useQueryClient();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const { mutate } = useMutation({
    mutationFn: async (id: TransactionCardProps["id"]) => {
      return await deleteTransaction(id);
    },
    onError: (error) => {
      alert(error.message);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: createTransactionsListQueryKey(),
      });
    },
  });

  const { Modal: DeleteConfirmationModal, openModal } =
    useDeleteConfirmationModal({
      onDelete: async () => {
        mutate(id);
      },
    });

  const handleLongPress = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    setIsModalVisible(true);
  };

  return (
    <>
      {/* <TouchableOpacity onLongPress={handleLongPress}> */}
      <Card className="p-4" {...rest}>
        <View className="flex-row">
          <CardContent className="flex-1 p-0">
            <CardTitle className="text-sm">{description || "-"}</CardTitle>
            <CardDescription
              className={`text-lg font-medium ${
                type === "expense" ? "text-red-500" : "text-green-500"
              }`}
            >
              {type === "expense" ? "-" : ""}
              {nominal}
            </CardDescription>
            <CardDescription>{category}</CardDescription>
          </CardContent>
          <CardContent className="p-0 items-end">
            <CardDescription>{date}</CardDescription>
            <CardDescription>{fund}</CardDescription>
          </CardContent>
        </View>
      </Card>
      {/* </TouchableOpacity> */}
      <Modal visible={isModalVisible} onClose={() => setIsModalVisible(false)}>
        <Link href={`/(private)/cash-flow/${id}/edit`} asChild>
          <TouchableOpacity className="p-3">
            <Text className="text-lg font-medium">Edit</Text>
          </TouchableOpacity>
        </Link>
        <TouchableOpacity
          className="p-3"
          onPress={() => {
            setIsModalVisible(false);
            openModal();
          }}
        >
          <Text className="text-lg font-medium text-destructive">Delete</Text>
        </TouchableOpacity>
      </Modal>
      <DeleteConfirmationModal />
    </>
  );
}
