interface CalendarEventProps {
  title: string;
  description: string;
  location: string;
  start: Date;
  end: Date;
}

export const CalendarButton = ({
  title,
  description,
  location,
  start,
  end,
}: CalendarEventProps) => {
  const formatDate = (date: Date) => {
    return date.toISOString().replace(/[-:]|\.\d{3}/g, "");
  };

  const handleAddToCalendar = () => {
    const calendarUrl = new URL("https://www.google.com/calendar/render");
    calendarUrl.searchParams.set("action", "TEMPLATE");
    calendarUrl.searchParams.set("text", title);
    calendarUrl.searchParams.set("details", description);
    calendarUrl.searchParams.set("location", location);
    calendarUrl.searchParams.set("dates", `${formatDate(start)}/${formatDate(end)}`);

    window.open(calendarUrl.toString(), "_blank");
  };

  return (
    <button
      type="button"
      onClick={handleAddToCalendar}
      className="cursor-pointer text-center text-xl font-semibold text-[#2C53AE] md:text-start lg:mt-5"
    >
      + Agregar a Calendario
    </button>
  );
};
