import { zodResolver } from "@hookform/resolvers/zod";
import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { PropsWithChildren, createContext, useContext, useState } from "react";
import { SubmitHandler, UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";
import { DocumentData, DocumentReference, Timestamp } from "firebase/firestore";
import type { Transaction } from "@/src/types/Transaction";
import { updateTransaction } from "@/src/services/transaction";
import { useAuth } from "./AuthContext";

const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
});
const schema = z.object({
  type: optionSchema,
  nominal: z.string().min(1),
  category: optionSchema,
  fund: optionSchema,
  date: z.date(),
  description: z.string().optional(),
});

export type FormFields = z.infer<typeof schema>;
type Doc = DocumentReference<DocumentData, DocumentData>;

interface EditTransactionFormContextValue {
  transactionId: string;
  setTransactionId: (pklId: string) => void;
  formMethods: UseFormReturn<FormFields>;
  mutation: UseMutationResult<Doc, unknown, FormFields>;
  onSubmit: (callback?: {
    onError?: (error: Error) => void;
    onSuccess?: (data: Doc) => void;
  }) => Promise<void>;
  reset: () => void;
}

const EditTransactionFormContext = createContext<
  EditTransactionFormContextValue | undefined
>(undefined);

export const useEditTransactionForm = () => {
  const context = useContext(EditTransactionFormContext);
  if (!context) {
    throw new Error(
      "useEditTransactionForm must be used within EditTransactionFormProvider"
    );
  }
  return context;
};

export const EditTransactionFormProvider = ({
  children,
}: PropsWithChildren) => {
  const { user } = useAuth();

  const [transactionId, setTransactionId] =
    useState<EditTransactionFormContextValue["transactionId"]>();
  const formMethods = useForm<FormFields>({ resolver: zodResolver(schema) });
  const mutation = useMutation({
    mutationFn: async (data: FormFields) => {
      if (transactionId === undefined)
        throw new Error("transactionId cannot be null.");

      return await updateTransaction(transactionId, {
        type: data.type.value as Transaction["type"],
        nominal: parseInt(data.nominal) ?? 0,
        category: data.category.value,
        fund: data.fund.value,
        date: Timestamp.fromDate(data.date),
        description: data.description ?? "",
        uid: user!.uid,
        updatedAt: Timestamp.now(),
      });
    },
  });
  const onSubmit: EditTransactionFormContextValue["onSubmit"] = async (
    callback
  ) => {
    const submit: SubmitHandler<FormFields> = async (data) =>
      mutation.mutateAsync(data, callback);
    await formMethods.handleSubmit(submit)();
  };
  const reset = () => {
    setTransactionId(undefined);
    formMethods.reset();
    mutation.reset();
  };

  const value = {
    transactionId: transactionId!,
    setTransactionId,
    formMethods,
    mutation,
    onSubmit,
    reset,
  } satisfies EditTransactionFormContextValue;

  return (
    <EditTransactionFormContext.Provider value={value}>
      {children}
    </EditTransactionFormContext.Provider>
  );
};
