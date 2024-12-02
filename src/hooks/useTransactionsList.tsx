import { useQuery } from "@tanstack/react-query";
import { removeNullishValuesFromObject } from "@/src/utils/utils/object";
import { getTransactionsList } from "@/src/services/transaction";
import useAnalytics from "@/src/hooks/useAnalytics";
import { useEffect } from "react";
import { useAuth } from "@/src/contexts/AuthContext";

export const useTransactionsListQueryKey = "transactionsList";

export const createTransactionsListQueryKey = (args?: {
  type?: "income" | "expense";
  uid?: string;
}) => [
  removeNullishValuesFromObject({
    useTransactionsListQueryKey,
    ...args,
  }),
];

interface useTransactionsListProps {
  type?: "income" | "expense";
  uid?: string;
}

const useTransactionsList = (filter?: useTransactionsListProps) => {
  const { capture } = useAnalytics();
  const { user } = useAuth();

  const query = useQuery({
    enabled: !!user,
    queryKey: createTransactionsListQueryKey(filter),
    queryFn: async () => await getTransactionsList(filter),
  });

  useEffect(() => {
    if (!query.isFetching && query.error) {
      capture({ eventType: "error", eventDetails: "loading_transactions" });
    }
  }, [query.isFetching, query.error, query.status]);

  return query;
};

export default useTransactionsList;
