import { EyeIcon, EyeOffIcon } from "lucide-react";
import React from "react";
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
  const [passwordIsVisible, setPasswordIsVisible] = React.useState(false);

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
            <div className="relative">
              <Input
                type={passwordIsVisible ? "text" : "password"}
                placeholder="Digite a sua senha"
                className="pr-12"
              />
              <Button
                type="button"
                variant="ghost"
                className="text-muted-foreground absolute top-0 right-0 bottom-0 my-auto h-10 w-10"
                onClick={() => setPasswordIsVisible((prev) => !prev)}
              >
                {passwordIsVisible ? <EyeOffIcon /> : <EyeIcon />}
              </Button>
            </div>
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
