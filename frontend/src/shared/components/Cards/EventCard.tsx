import img from "@/assets/image.webp";
import { useNavigate } from "react-router";

interface EventCardProps {
  id: number;
  image?: string;
  category: string;
  stageName: string;
  supportingText: string;
  datePublished: string;
  contentPublished: string;
}

const EventCard = ({
  id,
  image,
  category,
  stageName,
  supportingText,
  datePublished,
  contentPublished,
}: EventCardProps) => {
  const navigate = useNavigate();

  const date = new Date(datePublished);
  const formatted = new Intl.DateTimeFormat("es-LA", {
    day: "numeric",
    month: "long",
  }).format(date);

  return (
    <div className="bg-ecos-blue flex h-[22.5rem] w-[22.688rem] flex-col gap-[1.125rem] rounded-[1.25rem] shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
      <div className="flex h-[11.438rem] w-full gap-6 px-4 py-[1.125rem]">
        <img
          src={image ?? img}
          alt="imagen"
          className="aspect-square h-[10.688rem] w-[10.563rem] flex-shrink rounded-[1.75rem]"
        />

        <div className="flex h-[11rem] flex-col justify-between text-white">
          <div className="flex h-[3.75rem] flex-col items-start gap-1">
            <h2 className="text-2xl font-normal">{stageName}</h2>
            <h4 className="text-base font-medium">{supportingText}</h4>
          </div>
          <button
            type="button"
            onClick={() => navigate(`/event/${id.toString()}`)}
            className="bg-ecos-orange-light cursor-pointer rounded-[1.25rem] px-6 py-2.5 text-sm font-medium"
          >
            Ver más
          </button>
        </div>
      </div>

      <div className="flex h-[7.813rem] flex-col items-start gap-2 px-4 py-2 text-white">
        <h5 className="text-[0.688rem] font-medium">{`${category} - ${formatted}`}</h5>
        <p className="line-clamp-3 text-sm leading-5 font-normal tracking-[0.016rem] text-balance">
          {contentPublished}
        </p>
      </div>
    </div>
  );
};

export default EventCard;
