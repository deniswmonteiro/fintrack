import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";

import { AuthContext } from "@/contexts/auth/auth";

import { TransactionService } from "../services/transaction";
import { getUserBalanceQueryKey } from "./user";

export const getCreateTransactionMutationKey = ["createTransaction"];

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();
  const { user } = React.useContext(AuthContext);

  return useMutation({
    mutationKey: getCreateTransactionMutationKey,
    mutationFn: (input) => TransactionService.create(input),

    // Re-runs a query made by another component
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getUserBalanceQueryKey(user.id),
      });
    },
  });
};
