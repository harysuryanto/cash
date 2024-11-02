import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import * as Haptics from "expo-haptics";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/src/components/shared/react-native-reusables/Card";
import { Text } from "@/src/components/shared/react-native-reusables/Text";
import { useDeleteConfirmationModal } from "@/src/hooks/useDeleteConfirmationModal";
import Modal from "@/src/components/shared/Modal";

type TransactionCardProps = {
  type: string;
  nominal: string;
  category: string;
  fund: string;
  date: string;
  description: string;
};

export default function TransactionCard({
  type,
  nominal,
  category,
  fund,
  date,
  description,
}: TransactionCardProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleDelete = async () => {
    // Your delete logic here
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  const {
    Modal: DeleteConfirmationModal,
    openModal,
    mutationResult,
  } = useDeleteConfirmationModal({
    onDelete: handleDelete,
  });

  const handleLongPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsModalVisible(true);
  };

  return (
    <>
      <TouchableOpacity onLongPress={handleLongPress}>
        <Card className="p-4">
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
      </TouchableOpacity>
      <Modal visible={isModalVisible} onClose={() => setIsModalVisible(false)}>
        <TouchableOpacity className="p-3">
          <Text className="text-lg font-medium">Edit</Text>
        </TouchableOpacity>
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
