import {
  ActivityIndicator,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import React from "react";
import useAnalytics from "@/src/hooks/useAnalytics";
import { useAddTransactionForm } from "@/src/contexts/AddTransactionFormContext";
import { useQueryClient } from "@tanstack/react-query";
import { createTransactionsListQueryKey } from "@/src/hooks/useTransactionsList";
import { Text } from "@/src/components/shared/react-native-reusables/Text";
import { useRouter } from "expo-router";

interface AddTransactionButtonProps extends TouchableOpacityProps {
  color?: string | undefined;
}

export default function AddTransactionButton({
  color,
  ...rest
}: AddTransactionButtonProps) {
  const { capture } = useAnalytics();
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    formMethods: {
      formState: { isValidating },
    },
    mutation: { isPending },
    onSubmit,
  } = useAddTransactionForm();

  const handleSubmit = () => {
    capture({ eventType: "act", eventDetails: "add_transaction" });
    onSubmit({
      onError: alert,
      onSuccess: async () => {
        router.back();
        await queryClient.invalidateQueries({
          queryKey: createTransactionsListQueryKey(),
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
