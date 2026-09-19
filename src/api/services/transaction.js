import queryString from "query-string";

import { api } from "@/lib/axios";

export const TransactionService = {
  create: async (input) => {
    const response = await api.post("/transactions/me", input);
    return response.data;
  },
  getAll: async (input) => {
    const query = queryString.stringify({
      from: input.from,
      to: input.to,
    });

    const response = await api.get(`/transactions/me?${query}`);
    return response.data;
  },
};
