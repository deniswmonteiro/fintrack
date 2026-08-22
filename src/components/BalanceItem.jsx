import { Card, CardContent } from "./ui/card";

const BalanceItem = ({ label, icon, amount }) => {
  return (
    <Card>
      <CardContent className="space-y-2 p-6">
        <div className="flex items-center gap-2">
          <div className="rouded-lg bg-muted flex h-8 w-8 items-center justify-center rounded-lg">
            {icon}
          </div>
          <span className="text-muted-foreground text-sm">{label}</span>
        </div>
        <h3 className="text-2xl font-bold">
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(amount)}
        </h3>
      </CardContent>
    </Card>
  );
};

export default BalanceItem;
