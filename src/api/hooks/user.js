import { useQuery } from "@tanstack/react-query";
import React from "react";

import { AuthContext } from "@/contexts/auth/auth";

import { UserService } from "../services/user";

export const getUserBalanceQueryKey = (userId, from, to) => {
  if (!from || !to) return ["balance", userId];

  return ["balance", userId, from, to];
};

export const useGetUserBalance = ({ from, to }) => {
  const { user } = React.useContext(AuthContext);

  return useQuery({
    queryKey: getUserBalanceQueryKey(user.id, from, to),
    queryFn: async () => {
      return UserService.getBalance({ from, to });
    },
    staleTime: 1000 * 60 * 5, // 5 minutes to re-run the query
    enabled: Boolean(from) && Boolean(to) && Boolean(user.id),
  });
};
