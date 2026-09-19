import { createColumnHelper } from "@tanstack/react-table";
import { useSearchParams } from "react-router";

import { useGetTransactions } from "@/api/hooks/transaction";

import { Card, CardContent } from "./ui/card";
import { DataTable } from "./ui/data-table";

const columnHelper = createColumnHelper();

const columns = columnHelper.columns([
  columnHelper.accessor("name", {
    header: "Título",
  }),
  columnHelper.accessor("type", {
    header: "Tipo",
  }),
  columnHelper.accessor("date", {
    header: "Data",
  }),
  columnHelper.accessor("amount", {
    header: "Valor",
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
