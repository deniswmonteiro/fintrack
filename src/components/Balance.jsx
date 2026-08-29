import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import { useSearchParams } from "react-router";

import { useGetUserBalance } from "@/api/hooks/user";

import BalanceItem from "./BalanceItem";

const Balance = () => {
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const { data } = useGetUserBalance({ from, to });

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
