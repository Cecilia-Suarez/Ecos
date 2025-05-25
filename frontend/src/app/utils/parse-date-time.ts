export function parseDateTime(eventDate: string, eventTime: string) {
  const [day, month, year] = eventDate.split("/");
  const formattedDate = `${year}-${month}-${day}`;
  return new Date(`${formattedDate}T${eventTime}`);
}
