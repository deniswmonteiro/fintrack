import {
  Loader2Icon,
  PiggyBankIcon,
  PlusIcon,
  TrendingDownIcon,
  TrendingUpIcon,
} from "lucide-react";
import React from "react";
import { Controller } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { toast } from "sonner";

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
import { useCreateTransactionForm } from "@/forms/hooks/transaction";

import { DatePicker } from "./ui/date-picker";

const AddTransactionButton = () => {
  const [dialogIsOpen, setDialogIsOpen] = React.useState(false);

  const { form, handleSubmit, isPending } = useCreateTransactionForm({
    onSuccess: () => {
      setDialogIsOpen(false);
      toast.success("Transação adicionada com sucesso.");
    },
    onError: () => {
      toast.error(
        "Ocorreu um erro ao adicionar transação. Por favor, tente novamente."
      );
    },
  });

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
                          field.value === "INVESTMENT" ? "secondary" : "outline"
                        }
                        className="h-10"
                        onClick={() => field.onChange("INVESTMENT")}
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
