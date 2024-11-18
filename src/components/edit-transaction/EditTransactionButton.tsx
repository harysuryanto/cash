import {
  ActivityIndicator,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import React from "react";
import { useEditTransactionForm } from "@/src/contexts/EditTransactionFormContext";
import { useQueryClient } from "@tanstack/react-query";
import { createTransactionsListQueryKey } from "@/src/hooks/useTransactionsList";
import { Text } from "@/src/components/shared/react-native-reusables/Text";
import { useLocalSearchParams, useRouter } from "expo-router";
import { createTransactionDetailsQueryKey } from "@/src/hooks/useTransactionDetails";

interface EditTransactionButtonProps extends TouchableOpacityProps {
  color?: string | undefined;
}

export default function EditTransactionButton({
  color,
  ...rest
}: EditTransactionButtonProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { transactionId } = useLocalSearchParams<{ transactionId: string }>();
  const {
    formMethods: {
      formState: { isValidating },
    },
    mutation: { isPending },
    onSubmit,
  } = useEditTransactionForm();

  const handleSubmit = () => {
    onSubmit({
      onError: alert,
      onSuccess: async () => {
        router.back();
        await queryClient.invalidateQueries({
          queryKey: createTransactionsListQueryKey(),
        });
        await queryClient.invalidateQueries({
          queryKey: createTransactionDetailsQueryKey(transactionId),
        });
      },
    });
  };

  if (isValidating || isPending) {
    return <ActivityIndicator size={"small"} />;
  }

  return (
    <TouchableOpacity
      onPress={handleSubmit}
      disabled={isValidating || isPending}
      hitSlop={16}
      {...rest}
    >
      <Text className={`text-[${color}]`}>Save</Text>
    </TouchableOpacity>
  );
}
