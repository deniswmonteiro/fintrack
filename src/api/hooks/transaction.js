import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
      queryClient.invalidateQueries({
        queryKey: getTransactionsQueryKey(user.id),
      });
    },
  });
};

/** Get Transactions */
export const getTransactionsQueryKey = (userId, from, to) => {
  if (!from || !to) return ["getTransactions", userId];

  return ["getTransactions", userId, from, to];
};

export const useGetTransactions = ({ from, to }) => {
  const { user } = React.useContext(AuthContext);

  return useQuery({
    queryKey: getTransactionsQueryKey(user.id, from, to),
    queryFn: () => TransactionService.getAll({ from, to }),
    enabled: Boolean(from) && Boolean(to) && Boolean(user.id),
  });
};
