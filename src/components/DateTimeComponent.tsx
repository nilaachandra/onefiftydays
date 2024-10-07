"use client";
import { format, parseISO } from "date-fns";
import { enUS } from "date-fns/locale";
import { CalendarDays } from "lucide-react";

type DateTimeComponentProps = {
  dateTimeString: string; // The date-time string prop
};

export const DateTimeComponent = ({
  dateTimeString,
}: DateTimeComponentProps) => {
  // Parse the string into a Date object
  const date = parseISO(dateTimeString);

  // Format the date to IST timezone format
  const formattedDateTime = format(date, "h:mm a, EEEE, dd MMMM yyyy", {
    locale: enUS,
  });

  return (
    <div className="flex items-center text-sm text-gray-500">
      <CalendarDays className="mr-2 h-4 w-4" />
      <p>{formattedDateTime}</p>
    </div>
  );
};
