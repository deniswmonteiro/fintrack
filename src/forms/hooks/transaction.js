import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useCreateTransaction } from "@/api/hooks/transaction";

import { createTransactionFormSchema } from "../schemas/transaction";

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
