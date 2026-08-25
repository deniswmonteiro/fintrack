import { useQuery } from "@tanstack/react-query";
import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import React from "react";
import { useSearchParams } from "react-router";

import { AuthContext } from "@/contexts/auth/auth";
import { UserService } from "@/services/user";

import BalanceItem from "./BalanceItem";

const Balance = () => {
  const { user } = React.useContext(AuthContext);
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const { data } = useQuery({
    queryKey: ["balance", user.id, from, to],
    queryFn: async () => {
      return UserService.getBalance({ from, to });
    },
  });

  if (!data) return false;

  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-6">
      <BalanceItem
        label="Saldo"
        icon={<WalletIcon size={16} />}
        amount={data.balance}
      />
      <BalanceItem
        label="Ganhos"
        icon={<TrendingUpIcon size={16} className="text-primary-green" />}
        amount={data.earnings}
      />
      <BalanceItem
        label="Perdas"
        icon={<TrendingDownIcon size={16} className="text-primary-red" />}
        amount={data.expenses}
      />
      <BalanceItem
        label="Investimentos"
        icon={<PiggyBankIcon size={16} className="text-primary-blue" />}
        amount={data.investments}
      />
    </div>
  );
};

export default Balance;
