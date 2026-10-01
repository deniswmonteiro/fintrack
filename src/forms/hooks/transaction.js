import { zodResolver } from "@hookform/resolvers/zod";
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

/** Edit transaction */
export const useEditTransactionForm = ({ transaction, onSuccess, onError }) => {
  const { mutateAsync: editTransaction, isPending } = useEditTransaction();

  const form = useForm({
    resolver: zodResolver(editTransactionFormSchema),
    defaultValues: {
      id: transaction.id,
      name: transaction.name,
      amount: parseFloat(transaction.amount),
      date: transaction.date,
      type: transaction.type,
    },
    shouldUnregister: true,
  });

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
