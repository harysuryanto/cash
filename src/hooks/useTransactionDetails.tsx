import { useQuery } from "@tanstack/react-query";
import { removeNullishValuesFromObject } from "@/src/utils/utils/object";
import { getTransactionDetails } from "@/src/services/transaction";
import useAnalytics from "@/src/hooks/useAnalytics";
import { useEffect } from "react";

export const useTransactionDetailsQueryKey = "transactionDetails";

export const createTransactionDetailsQueryKey = (id: string) => [
  removeNullishValuesFromObject({
    useTransactionDetailsQueryKey,
    id,
  }),
];

const useTransactionDetails = (id: string) => {
  const { capture } = useAnalytics();

  const query = useQuery({
    queryKey: createTransactionDetailsQueryKey(id),
    queryFn: async () => await getTransactionDetails(id),
  });

  useEffect(() => {
    if (!query.isFetching && query.error) {
      capture({
        eventType: "error",
        eventDetails: "loading_transaction_details_" + id,
      });
    }
  }, [query.isFetching, query.error, query.status]);

  return query;
};

export default useTransactionDetails;
