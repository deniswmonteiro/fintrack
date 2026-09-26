import { createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useSearchParams } from "react-router";

import { useGetTransactions } from "@/api/hooks/transaction";
import { formatCurrency } from "@/helpers/currency";

import TransactionTypeBadge from "./TransactionTypeBadge";
import { Card, CardContent } from "./ui/card";
import { DataTable } from "./ui/data-table";

const columnHelper = createColumnHelper();

const columns = columnHelper.columns([
  columnHelper.accessor("name", {
    header: "Título",
  }),
  columnHelper.accessor("type", {
    header: "Tipo",
    cell: ({ row: { original: transaction } }) => {
      return <TransactionTypeBadge variant={transaction.type.toLowerCase()} />;
    },
  }),
  columnHelper.accessor("date", {
    header: "Data",
    cell: ({ row: { original: transaction } }) => {
      return format(transaction.date, "dd 'de' MMMM 'de' yyyy", {
        locale: ptBR,
      });
    },
  }),
  columnHelper.accessor("amount", {
    header: "Valor",
    cell: ({ row: { original: transaction } }) => {
      return formatCurrency(transaction.amount);
    },
  }),
  columnHelper.accessor("actions", {
    header: "Ações",
  }),
]);

const TransactionsTable = () => {
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const { data: transactions } = useGetTransactions({ from, to });

  if (!transactions) return null;

  return (
    <Card>
      <CardContent>
        <DataTable columns={columns} data={transactions} />
      </CardContent>
    </Card>
  );
};

export default TransactionsTable;
