import { createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useSearchParams } from "react-router";

import { useGetTransactions } from "@/api/hooks/transaction";
import { formatCurrency } from "@/helpers/currency";

import EditTransactionButton from "./EditTransactionButton";
import TransactionTypeBadge from "./TransactionTypeBadge";
import { Card, CardContent } from "./ui/card";
import { DataTable } from "./ui/data-table";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

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
    cell: ({ row: { original: transaction } }) => {
      return <EditTransactionButton transaction={transaction} />;
    },
  }),
]);

const TransactionsTable = () => {
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const { data: transactions } = useGetTransactions({ from, to });

  if (!transactions) return null;

  return (
    <>
      <h2 className="mb-6 text-xl font-bold">Transações</h2>
      <Card>
        <CardContent>
          <ScrollArea className="[&_thead]:bg-card h-70 max-h-70 **:data-[slot=table-container]:overflow-visible [&_thead]:sticky [&_thead]:top-0 [&_thead]:z-10 [&_thead]:shadow-sm">
            <DataTable columns={columns} data={transactions} />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </CardContent>
      </Card>
    </>
  );
};

export default TransactionsTable;
