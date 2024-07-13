import { useQuery } from "@tanstack/react-query";
import { removeNullishValuesFromObject } from "@/src/utils/utils/object";
import { getTransactionsList } from "@/src/services/transaction";

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
  return useQuery({
    queryKey: createTransactionsListQueryKey(filter),
    queryFn: async () => await getTransactionsList(filter),
  });
};

export default useTransactionsList;
