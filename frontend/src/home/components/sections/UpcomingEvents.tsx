import { useApiQuery } from "@/shared/hooks/use-api-query";
import { ApiEvents } from "@/profile/musician/musician-types";
import EventCard from "@/shared/components/Cards/EventCard";

const UpcomingEvents = () => {
  const { data: events } = useApiQuery<ApiEvents>("events", `events/search`);

  return (
    <section id="#eventos" className="w-full px-4 md:px-28 lg:mt-36 lg:ml-36 lg:px-40">
      <h2 className="text-ecos-blue text-start text-6xl font-bold lg:mb-24">Próximos Eventos</h2>

      <div className="mb-[261px] grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-14">
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
