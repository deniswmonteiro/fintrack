import queryString from "query-string";

import { api } from "@/lib/axios";

export const TransactionService = {
  getAll: async (input) => {
    const query = queryString.stringify({
      from: input.from,
      to: input.to,
    });

    const response = await api.get(`/transactions/me?${query}`);
    return response.data;
  },
  create: async (input) => {
    const response = await api.post("/transactions/me", {
      name: input.name,
      amount: input.amount,
      date: input.date,
      type: input.type,
    });
    return response.data;
  },
  update: async (input) => {
    const response = await api.patch(`/transactions/me?${input.id}`, {
      name: input.name,
      amount: input.amount,
      date: input.date,
      type: input.type,
    });
    return response.data;
  },
};
