import { useApiQuery } from "@/shared/hooks/use-api-query";
import { ApiEvents } from "@/profile/musician/musician-types";
import EventCard from "@/shared/components/Cards/EventCard";

const UpcomingEvents = () => {
  const { data: events } = useApiQuery<ApiEvents>("events", `events/search`);

  return (
    <section id="eventos" className="space-y-8 pr-[0.813rem] md:pr-[4.625rem] lg:pr-8">
      <h2 className="subtitles text-start">Próximos Eventos</h2>

      <div className="grid grid-cols-[repeat(auto-fit,_22.688rem)] justify-around space-y-8">
        {events?.items.map((event) => (
          <EventCard
            key={event.id}
            id={event.id}
            image={event.image}
            stageName={event.musician.stageName ?? ""}
            category={event.category}
            supportingText={event.name}
            datePublished={event.date}
            contentPublished={event.description}
          />
        ))}
      </div>
    </section>
  );
};

export default UpcomingEvents;
