"use client";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const DatePicker = ({
  value,
  onChange,
  placeholder = "Selecione uma data",
  className,
}) => {
  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            data-empty={!value}
            className={`data-[empty=true]:text-muted-foreground h-10 w-full justify-start text-left font-normal ${className || ""}`}
          />
        }
      >
        <CalendarIcon />
        {value ? (
          format(value, "PPP", { locale: ptBR })
        ) : (
          <span>{placeholder}</span>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          locale={ptBR}
        />
      </PopoverContent>
    </Popover>
  );
};
