import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

import {
  useCreateTransaction,
  useEditTransaction,
} from "@/api/hooks/transaction";

import {
  createTransactionFormSchema,
  editTransactionFormSchema,
} from "../schemas/transaction";

/** Create transaction */
export const useCreateTransactionForm = ({ onSuccess, onError }) => {
  const { mutateAsync: createTransaction, isPending } = useCreateTransaction();

  const form = useForm({
    resolver: zodResolver(createTransactionFormSchema),
    defaultValues: {
      name: "",
      amount: "",
      date: new Date(),
      type: "EARNING",
    },
    shouldUnregister: true,
  });

  const handleSubmit = async (data) => {
    try {
      await createTransaction(data);
      onSuccess();
    } catch (error) {
      console.error(error);
      onError();
    }
  };

  return { form, handleSubmit, isPending };
};

const getEditTransactionFormDefaultValues = (transaction) => {
  return {
    name: transaction.name,
    amount: parseFloat(transaction.amount),
    date: new Date(transaction.date),
    type: transaction.type,
  };
};

/** Edit transaction */
export const useEditTransactionForm = ({ transaction, onSuccess, onError }) => {
  const { mutateAsync: editTransaction, isPending } = useEditTransaction();

  const form = useForm({
    resolver: zodResolver(editTransactionFormSchema),
    defaultValues: getEditTransactionFormDefaultValues(transaction),
    shouldUnregister: true,
  });

  React.useEffect(() => {
    form.reset(getEditTransactionFormDefaultValues(transaction));
    form.setValue("id", transaction.id);
  }, [form, transaction]);

  const handleSubmit = async (data) => {
    try {
      await editTransaction(data);
      onSuccess();
    } catch (error) {
      console.error(error);
      onError();
    }
  };

  return { form, handleSubmit, isPending };
};
