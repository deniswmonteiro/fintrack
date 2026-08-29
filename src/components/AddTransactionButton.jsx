import { zodResolver } from "@hookform/resolvers/zod";
import {
  Loader2Icon,
  PiggyBankIcon,
  PlusIcon,
  TrendingDownIcon,
  TrendingUpIcon,
} from "lucide-react";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { toast } from "sonner";
import z from "zod";

import { useCreateTransaction } from "@/api/hooks/transaction";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { DatePicker } from "./ui/date-picker";

const addTransactionSchema = z.object({
  name: z.string().trim().min(1, {
    error: "O nome é obrigatório.",
  }),
  amount: z.coerce
    .number({
      error: (issue) =>
        issue.input === undefined || issue.input === ""
          ? "O valor é obrigatório."
          : "Insira um valor válido.",
    })
    .min(1, {
      error: "O valor é obrigatório.",
    }),
  date: z.date(),
  type: z.enum(["EARNING", "EXPENSE", "INVESTMENTS"]),
});

const AddTransactionButton = () => {
  const { mutateAsync: createTransaction, isPending } = useCreateTransaction();

  const [dialogIsOpen, setDialogIsOpen] = React.useState(false);

  const form = useForm({
    resolver: zodResolver(addTransactionSchema),
    defaultValues: {
      name: "",
      amount: "",
      date: new Date(),
      type: "EARNING",
    },
    shouldUnregister: true,
  });

  const handleSubmit = async (data) => {
    try {
      await createTransaction(data);
      setDialogIsOpen(false);
      toast.success("Transação adicionada com sucesso.");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
        <DialogTrigger
          render={
            <Button>
              Nova transação <PlusIcon />
            </Button>
          }
        />

        <DialogContent className="gap-5 sm:max-w-md" showCloseButton={false}>
          <form
            action="#"
            id="form-add-transaction"
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-5"
          >
            <DialogHeader className="items-center">
              <DialogTitle className="text-xl font-bold">
                Adicionar Transação
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Insira as informações abaixo
              </DialogDescription>
            </DialogHeader>
            <FieldGroup>
              {/** Name */}
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="add-transaction-name">Nome</FieldLabel>
                    <Input
                      type="text"
                      id="add-transaction-name"
                      placeholder="Digite o nome da transação"
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

              {/** Amount */}
              <Controller
                name="amount"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="add-transaction-amount">
                      Valor
                    </FieldLabel>
                    <NumericFormat
                      id="add-transaction-amount"
                      placeholder="Digite o valor da transação"
                      thousandSeparator="."
                      decimalSeparator=","
                      decimalScale={2}
                      prefix="R$ "
                      allowNegative={false}
                      customInput={Input}
                      onValueChange={(values) =>
                        field.onChange(values.floatValue)
                      }
                      onChange={() => {}}
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

              {/** Date */}
              <Controller
                name="date"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="add-transaction-date">Data</FieldLabel>
                    <DatePicker id="add-transaction-date" {...field} />
                    {fieldState.invalid && (
                      <FieldError
                        errors={[fieldState.error]}
                        className="text-xs"
                      />
                    )}
                  </Field>
                )}
              ></Controller>

              {/** Type */}
              <Controller
                name="type"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="add-transaction-type">Tipo</FieldLabel>
                    <div className="grid grid-cols-3 gap-4">
                      <Button
                        type="button"
                        variant={
                          field.value === "EARNING" ? "secondary" : "outline"
                        }
                        className="h-10"
                        onClick={() => field.onChange("EARNING")}
                      >
                        <TrendingUpIcon className="text-primary-green" />
                        Ganho
                      </Button>
                      <Button
                        type="button"
                        variant={
                          field.value === "EXPENSE" ? "secondary" : "outline"
                        }
                        className="h-10"
                        onClick={() => field.onChange("EXPENSE")}
                      >
                        <TrendingDownIcon className="text-primary-red" />
                        Gasto
                      </Button>
                      <Button
                        type="button"
                        variant={
                          field.value === "INVESTMENTS"
                            ? "secondary"
                            : "outline"
                        }
                        className="h-10"
                        onClick={() => field.onChange("INVESTMENTS")}
                      >
                        <PiggyBankIcon className="text-primary-blue" />
                        Investimento
                      </Button>
                    </div>
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

            <DialogFooter className="grid grid-cols-2 gap-4">
              <DialogClose
                render={
                  <Button variant="secondary" disabled={isPending}>
                    Cancelar
                  </Button>
                }
              />
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    Adicionando
                    <Loader2Icon className="mr-1 animate-spin" />
                  </>
                ) : (
                  "Adicionar"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddTransactionButton;
