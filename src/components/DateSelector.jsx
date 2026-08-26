import { useQueryClient } from "@tanstack/react-query";
import { addMonths, format, isValid, parse } from "date-fns";
import React from "react";
import { useNavigate, useSearchParams } from "react-router";

import { AuthContext } from "@/contexts/auth/auth";

import { DatePickerWithRange } from "./ui/date-picker-with-range";

const formatDateToQueryParam = (date) => format(date, "yyyy-MM-dd");

const getInitialDatesState = (searchParams) => {
  const defaultDates = {
    from: new Date(),
    to: addMonths(new Date(), 1),
  };

  const from = searchParams.get("from");
  const to = searchParams.get("to");

  if (!from || !to) return defaultDates;

  const parsedFrom = parse(from, "yyyy-MM-dd", new Date());
  const parsedTo = parse(to, "yyyy-MM-dd", new Date());

  const datesAreInvalid = !isValid(parsedFrom) || !isValid(parsedTo);

  if (datesAreInvalid) return defaultDates;

  return {
    from: parsedFrom,
    to: parsedTo,
  };
};

const DateSelector = () => {
  const queryClient = useQueryClient();
  const { user } = React.useContext(AuthContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [date, setDate] = React.useState(getInitialDatesState(searchParams));

  React.useEffect(() => {
    if (!date.from || !date.to) return;

    const queryParams = new URLSearchParams();

    queryParams.set("from", formatDateToQueryParam(date.from));
    queryParams.set("to", formatDateToQueryParam(date.to));

    navigate(`?${queryParams.toString()}`);

    queryClient.invalidateQueries({
      queryKey: [
        "balance",
        user.id,
        formatDateToQueryParam(date.from),
        formatDateToQueryParam(date.to),
      ],
    });
  }, [date, navigate, queryClient, user.id]);

  return <DatePickerWithRange value={date} onChange={setDate} />;
};

export default DateSelector;
