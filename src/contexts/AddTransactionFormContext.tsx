import { zodResolver } from "@hookform/resolvers/zod";
import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { PropsWithChildren, createContext, useContext, useEffect } from "react";
import { SubmitHandler, UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";
import { DocumentData, DocumentReference, Timestamp } from "firebase/firestore";
import type { Transaction } from "@/src/types/Transaction";
import { addTransaction } from "@/src/services/transaction";

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

interface AddTransactionFormContextValue {
  formMethods: UseFormReturn<FormFields>;
  mutation: UseMutationResult<Doc, unknown, FormFields>;
  onSubmit: (callback?: {
    onError?: (error: Error) => void;
    onSuccess?: (data: Doc) => void;
  }) => Promise<void>;
  reset: () => void;
}

const AddTransactionFormContext = createContext<
  AddTransactionFormContextValue | undefined
>(undefined);

export const useAddTransactionForm = () => {
  const context = useContext(AddTransactionFormContext);
  if (!context) {
    throw new Error(
      "useAddTransactionForm must be used within AddTransactionFormProvider"
    );
  }
  return context;
};

export const AddTransactionFormProvider = ({ children }: PropsWithChildren) => {
  const formMethods = useForm<FormFields>({ resolver: zodResolver(schema) });
  const mutation = useMutation({
    mutationFn: async (data: FormFields) => {
      return await addTransaction({
        type: data.type.value as Transaction["type"],
        nominal: parseInt(data.nominal) ?? 0,
        category: data.category.value,
        fund: data.fund.value,
        date: Timestamp.fromDate(data.date),
        description: data.description ?? "",
      });
    },
  });
  const onSubmit: AddTransactionFormContextValue["onSubmit"] = async (
    callback
  ) => {
    const submit: SubmitHandler<FormFields> = async (data) =>
      mutation.mutateAsync(data, callback);
    await formMethods.handleSubmit(submit)();
  };
  const reset = () => {
    formMethods.reset();
    mutation.reset();
  };

  const type = formMethods.getValues("type");
  useEffect(() => {
    formMethods.resetField("category");
  }, [type]);

  const value = {
    formMethods,
    mutation,
    onSubmit,
    reset,
  } satisfies AddTransactionFormContextValue;

  return (
    <AddTransactionFormContext.Provider value={value}>
      {children}
    </AddTransactionFormContext.Provider>
  );
};