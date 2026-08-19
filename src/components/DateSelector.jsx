import { addMonths } from "date-fns";
import React from "react";

import { DatePickerWithRange } from "./ui/date-picker-with-range";

const DateSelector = () => {
  const [date, setDate] = React.useState({
    from: new Date(new Date()),
    to: addMonths(new Date(), 1),
  });

  return <DatePickerWithRange value={date} onChange={setDate} />;
};

export default DateSelector;
