import { useNavigate, useParams } from "react-router";
import { useApiQuery } from "@/shared/hooks/use-api-query";
import { CalendarIcon, ClockIcon, LocationIcon, TicketIcon } from "../../event/components/ui/Icons";
import ImageBanner from "@/assets/imageBanner.webp";
import { type EventById as EventByIdType } from "../types/event-by-id-types";
import { CalendarButton } from "@/event/components/ui/CalendarButton";
import { parseDateTime } from "../utils/parse-date-time";

export const EventById = () => {
  const { id } = useParams() as { id: string };

  const navigate = useNavigate();

  const { data: event } = useApiQuery<EventByIdType>("events", `events/${id}`, id);

  return (
    <div className="text-ecos-blue flex flex-col gap-8 sm:gap-[120px] sm:p-4 xl:p-[200px]">
      <section className="mt-4 flex p-2 md:mt-0">
        <div className="border-ecos-blue flex flex-col gap-y-10 rounded-[50px] border-3 pb-8 md:w-[807px] md:p-10 lg:w-full lg:px-[50px] lg:py-[38px]">
          <header className="w-full px-[50px] pt-[38px] md:h-[400px] lg:h-[594px] lg:px-0 lg:pt-0">
            <img
              src={event?.image ?? ImageBanner}
              alt="Imagen del evento"
              className="h-full min-h-[196px] w-full min-w-[275px] rounded-[50px] object-cover"
            />
          </header>

          <main className="flex flex-col gap-y-8 px-8 lg:gap-y-[80px] lg:px-0">
            <h2 className="text-[32px] font-extrabold md:text-start md:text-5xl">{event?.name}</h2>
            <div className="flex flex-col gap-y-4">
              <h3 className="text-2xl font-bold md:text-[32px] lg:mb-7">Fecha y Hora</h3>
              <div className="flex items-center gap-x-5">
                <CalendarIcon />
                <p className="text-2xl font-semibold">{event?.date}</p>
              </div>
              <div className="flex items-center gap-x-5">
                <ClockIcon />
                <p className="text-2xl font-semibold">{event?.startTime}</p>
              </div>
              {event && (
                <CalendarButton
                  title={event.name}
                  description={event.description}
                  location={event.location}
                  start={parseDateTime(event.date, event.startTime)}
                  end={parseDateTime(event.date, event.endTime)}
                />
              )}
            </div>
            <div className="flex flex-col gap-y-4">
              <h3 className="text-2xl font-bold md:text-[32px]">Lugar</h3>
              <div className="flex flex-col items-start gap-4 gap-x-1 md:flex-row md:items-end">
                <div className="flex gap-5">
                  <LocationIcon />
                  <p className="text-2xl font-semibold">Dirección: </p>
                </div>
                <span className="flex text-2xl text-balance">{event?.location}</span>
              </div>
            </div>
            <div className="flex flex-col gap-y-4">
              <h3 className="text-[32px] font-bold">Información de las entradas</h3>
              <div className="gap-x-1">
                <p className="pl-9 font-semibold">Puntos de venta:</p>
                <div className="flex items-center gap-2">
                  <TicketIcon />
                  <div>
                    {event?.tickets.map((ticket) => (
                      <div key={ticket.id} className="flex gap-x-4">
                        <p className="text-balance">{ticket.location}</p>
                        <span className="min-w-16 text-center">$ {ticket.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-y-4">
              <h3 className="text-[32px] font-bold">Descripción del Evento</h3>
              <p className="text-base leading-9 font-normal text-balance md:text-2xl">
                {event?.description}
              </p>
            </div>
          </main>
        </div>
      </section>
      <div className="p-2">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="bg-ecos-blue h-[62px] w-[186px] cursor-pointer rounded-[37px] px-[67px] py-5 text-base font-bold text-white"
        >
          Volver
        </button>
      </div>
    </div>
  );
};
