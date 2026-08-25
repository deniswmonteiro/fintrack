import { api } from "@/lib/axios";

export const TransactionService = {
  create: async (input) => {
    const response = await api.post("/transactions/me", input);
    return response.data;
  },
};
