import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router";
import z from "zod";

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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const Cadastro = () => {
  const signupSchema = z
    .object({
      firstName: z.string().trim().min(1, {
        error: "O nome é obrigatório.",
      }),
      lastName: z.string().trim().min(1, {
        error: "O sobrenome é obrigatório.",
      }),
      email: z.email({
        error: "O email é inválido.",
      }),
      password: z.string().trim().min(6, {
        error: "A senha deve ter no mínimo 6 caracteres.",
      }),
      passwordConfirmation: z.string().trim().min(6, {
        error: "A confirmação de senha deve ter no mínimo 6 caracteres.",
      }),
      terms: z.boolean().refine((value) => value === true, {
        error: "Você precisa aceitar os termos.",
      }),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      path: ["passwordConfirmation"],
      error: "As senhas não conferem.",
    });

  const methods = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      terms: false,
    },
  });

  const handleSubmit = (data) => {
    console.log(data);
  };

  return (
    <section className="flex h-screen w-screen flex-col items-center justify-center gap-6">
      <Card className="w-125 p-0">
        <CardHeader className="gap-2 p-6 pb-2 text-center">
          <CardTitle className="text-3xl font-bold">Crie a sua conta</CardTitle>
          <CardDescription className="text-muted-foreground">
            Insira os seus dados abaixo.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <form
            action="#"
            id="form-signup"
            onSubmit={methods.handleSubmit(handleSubmit)}
          >
            <FieldGroup>
              {/* Nome */}
              <Controller
                name="firstName"
                control={methods.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <Input
                      type="text"
                      placeholder="Digite o seu nome"
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

              {/* Last Name */}
              <Controller
                name="lastName"
                control={methods.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <Input
                      type="text"
                      placeholder="Digite o seu sobrenome"
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

              {/* E-mail */}
              <Controller
                name="email"
                control={methods.control}
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

              {/* Password */}
              <Controller
                name="password"
                control={methods.control}
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

              {/* Password confirmation */}
              <Controller
                name="passwordConfirmation"
                control={methods.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <InputPassword
                      placeholder="Confirme a sua senha"
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
                name="terms"
                control={methods.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <div className="items-top flex space-x-2">
                      <Checkbox
                        id="terms"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <FieldLabel
                        htmlFor="terms"
                        className={`text-muted-foreground block text-xs opacity-75 ${fieldState.invalid && "text-destructive"}`}
                      >
                        Ao clicar em "Criar Conta", você aceita{" "}
                        <a
                          href="#"
                          className={`hover:text-primary text-white underline underline-offset-4 transition-all duration-300 hover:duration-300 ${fieldState.invalid && "text-destructive!"}`}
                        >
                          nosso termo de uso e política de privacidade.
                        </a>
                      </FieldLabel>
                    </div>
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
            form="form-signup"
          >
            Criar Conta
          </Button>
        </CardFooter>
      </Card>

      <div className="flex items-center justify-center">
        <p className="text-muted-foreground text-center text-sm opacity-75">
          Já possui uma conta?{" "}
          <Link
            to="/login"
            className={`hover:text-primary pl-0.5 text-white underline underline-offset-4 ${buttonVariants({ variant: "link" })}`}
          >
            Faça login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Cadastro;
