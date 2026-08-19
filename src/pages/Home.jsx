import { PlusIcon } from "lucide-react";
import React from "react";
import { Navigate } from "react-router";

import DateSelector from "@/components/DateSelector";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/contexts/auth/auth";

const Home = () => {
  const { user, isInitializing } = React.useContext(AuthContext);

  if (isInitializing) return null;

  if (!user) return <Navigate to="/login" />;

  return (
    <>
      <Header />
      <section className="p-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <DateSelector />
            <Button>
              Nova transação <PlusIcon />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
