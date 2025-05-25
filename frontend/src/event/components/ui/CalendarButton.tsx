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
      title="Agregar en Google Calendar"
      onClick={handleAddToCalendar}
      className="cursor-pointer pl-8 text-start text-xl font-semibold text-[#2C53AE]"
    >
      + Agregar a Calendario
    </button>
  );
};
