import { useQueryClient } from "@tanstack/react-query";
import { addMonths, format } from "date-fns";
import React from "react";
import { useNavigate, useSearchParams } from "react-router";

import { AuthContext } from "@/contexts/auth/auth";

import { DatePickerWithRange } from "./ui/date-picker-with-range";

const formatDateToQueryParam = (date) => format(date, "yyyy-MM-dd");

const DateSelector = () => {
  const queryClient = useQueryClient();
  const { user } = React.useContext(AuthContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [date, setDate] = React.useState({
    from: searchParams.get("from")
      ? new Date(searchParams.get("from") + "T00:00:00")
      : new Date(),
    to: searchParams.get("to")
      ? new Date(searchParams.get("to") + "T00:00:00")
      : addMonths(new Date(), 1),
  });

  React.useEffect(() => {
    if (!date.from || !date.to) return;

    const queryParams = new URLSearchParams();

    queryParams.set("from", formatDateToQueryParam(date.from));
    queryParams.set("to", formatDateToQueryParam(date.to));

    navigate(`?${queryParams.toString()}`);

    queryClient.invalidateQueries({
      queryKey: ["balance", user.id],
    });
  }, [date, navigate, queryClient, user.id]);

  return <DatePickerWithRange value={date} onChange={setDate} />;
};

export default DateSelector;
