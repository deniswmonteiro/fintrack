import {
  ExternalLinkIcon,
  Loader2Icon,
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
} from "lucide-react";
import React from "react";
import { Controller } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { toast } from "sonner";

import { useEditTransactionForm } from "@/forms/hooks/transaction";

import { Button } from "./ui/button";
import { DatePicker } from "./ui/date-picker";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

const EditTransactionButton = ({ transaction }) => {
  const [sheetIsOpen, setSheetIsOpen] = React.useState(false);

  const { form, handleSubmit, isPending } = useEditTransactionForm({
    transaction,
    onSuccess: () => {
      setSheetIsOpen(false);
      toast.success("Transação atualizada com sucesso.");
    },
    onError: () => {
      toast.error(
        "Ocorreu um erro ao atualizar a transação. Por favor, tente novamente."
      );
    },
  });

  if (!transaction) return null;

  return (
    <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
      <SheetTrigger
        render={
          <Button variant="ghost" size="icon">
            <ExternalLinkIcon className="text-muted-foreground" />
          </Button>
        }
      />
      <SheetContent className="min-w-112.5">
        <form
          action="#"
          id="form-add-transaction"
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-5"
        >
          <SheetHeader className="items-center">
            <SheetTitle className="text-xl font-bold">
              Adicionar Transação
            </SheetTitle>
            <SheetDescription className="text-muted-foreground">
              Insira as informações abaixo
            </SheetDescription>
          </SheetHeader>
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
                    {...field}
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

          <SheetFooter className="grid grid-cols-2 gap-4">
            <SheetClose
              render={
                <Button variant="secondary" disabled={isPending}>
                  Cancelar
                </Button>
              }
            />
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  Salvando
                  <Loader2Icon className="mr-1 animate-spin" />
                </>
              ) : (
                "Salvar"
              )}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default EditTransactionButton;
