import z from "zod";

export const createTransactionFormSchema = z.object({
  name: z.string().trim().min(1, {
    error: "O nome é obrigatório.",
  }),
  amount: z.coerce
    .number({
      error: (issue) =>
        issue.input === undefined || issue.input === ""
          ? "O valor é obrigatório."
          : "Insira um valor válido.",
    })
    .min(1, {
      error: "O valor é obrigatório.",
    }),
  date: z.date(),
  type: z.enum(["EARNING", "EXPENSE", "INVESTMENT"]),
});
