import React from "react";
import { Navigate } from "react-router";

import AddTransactionButton from "@/components/AddTransactionButton";
import Balance from "@/components/Balance";
import DateSelector from "@/components/DateSelector";
import Header from "@/components/Header";
import TransactionsTable from "@/components/TransactionsTable";
import { AuthContext } from "@/contexts/auth/auth";

const Home = () => {
  const { user, isInitializing } = React.useContext(AuthContext);

  if (isInitializing) return null;

  if (!user) return <Navigate to="/login" />;

  return (
    <>
      <Header />
      <main className="space-y-8 p-6">
        <section>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <div className="flex items-center gap-4">
              <DateSelector />
              <AddTransactionButton />
            </div>
          </div>
        </section>
        <section className="grid grid-cols-[2fr_1fr]">
          <Balance />
        </section>
        <section>
          <TransactionsTable />
        </section>
      </main>
    </>
  );
};

export default Home;
