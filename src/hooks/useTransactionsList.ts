import { useQuery } from "@tanstack/react-query";
import { removeNullishValuesFromObject } from "@/src/utils/utils/object";
import { getTransactionsList } from "@/src/services/transaction";
import useAnalytics from "@/src/hooks/useAnalytics";

export const useTransactionsListQueryKey = "transactionsList";

export const createTransactionsListQueryKey = (args?: {
  type?: "income" | "expense";
}) => [
  removeNullishValuesFromObject({
    useTransactionsListQueryKey,
    ...args,
  }),
];

interface useTransactionsListProps {
  type?: "income" | "expense";
}

const useTransactionsList = (filter?: useTransactionsListProps) => {
  const { capture } = useAnalytics();

  return useQuery({
    queryKey: createTransactionsListQueryKey(filter),
    queryFn: async () => await getTransactionsList(filter),
    retry: () => {
      capture({ eventType: "error", eventDetails: "loading_transactions" });
      return false;
    },
  });
};

export default useTransactionsList;
