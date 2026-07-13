import { Link } from "react-router";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const Login = () => {
  return (
    <section className="flex h-screen w-screen flex-col items-center justify-center gap-6">
      <Card className="w-125">
        <CardHeader>
          <CardTitle>Crie a sua conta</CardTitle>
          <CardDescription>Insira os seus dados abaixo.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action="#" className="w-full space-y-5">
            <Input type="text" placeholder="Digite o seu nome" />
            <Input type="text" placeholder="Digite o seu sobrenome" />
            <Input type="email" placeholder="Digite o seu e-mail" />
            <Input type="password" placeholder="Digite a sua senha" />
          </form>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Criar Conta</Button>
        </CardFooter>
      </Card>
      <div className="flex items-center justify-center">
        <p className="text-center text-sm opacity-70">
          Já possui uma conta?{" "}
          <Link
            to="/login"
            className={`pl-0.5 ${buttonVariants({ variant: "link" })}`}
          >
            Faça login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
