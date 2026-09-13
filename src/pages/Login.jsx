import { Loader2Icon } from "lucide-react";
import React from "react";
import { Controller } from "react-hook-form";
import { Link, Navigate } from "react-router";

import InputPassword from "@/components/InputPassword";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { AuthContext } from "@/contexts/auth/auth";
import { useLoginForm } from "@/forms/hooks/user";

const Login = () => {
  const { user, isInitializing } = React.useContext(AuthContext);

  const { form, handleSubmit } = useLoginForm();

  if (isInitializing) return null;

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <section className="flex h-full w-full flex-col items-center justify-center gap-6 py-15">
      <Card className="w-125 p-0">
        <CardHeader className="gap-2 p-6 pb-2 text-center">
          <CardTitle className="text-3xl font-bold">
            Entre na sua conta
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Insira seus dados abaixo
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <form
            action="#"
            id="form-login"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FieldGroup>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <Input
                      type="email"
                      placeholder="Digite o seu e-mail"
                      {...field}
                    />
                    {fieldState.invalid && (
                      <FieldError
                        errors={[fieldState.error]}
                        className="text-xs"
                      />
                    )}
                  </Field>
                )}
              ></Controller>

              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <InputPassword
                      placeholder="Digite a sua senha"
                      {...field}
                    />
                    {fieldState.invalid && (
                      <FieldError
                        errors={[fieldState.error]}
                        className="text-xs"
                      />
                    )}
                  </Field>
                )}
              ></Controller>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="p-0">
          <Button
            type="submit"
            className="h-15 w-full rounded-tl-none rounded-tr-none text-lg font-semibold"
            form="form-login"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <>
                Fazendo login <Loader2Icon className="mr-1 animate-spin" />
              </>
            ) : (
              "Fazer login"
            )}
          </Button>
        </CardFooter>
      </Card>

      <div className="flex items-center justify-center">
        <p className="text-muted-foreground text-center text-sm opacity-75">
          Ainda não possui uma conta?{" "}
          <Link
            to="/cadastro"
            className={`hover:text-primary pl-0.5 text-white underline underline-offset-4 ${buttonVariants({ variant: "link" })}`}
          >
            Crie agora
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
