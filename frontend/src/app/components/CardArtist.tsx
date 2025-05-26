import Button from "@/app/ui/Button";
import defaultImage from "@/assets/imagePlay.svg";
import { FeaturedMusician } from "@/home/components/types/FeaturedMusician";
import { useNavigate } from "react-router";

interface CardArtistProps {
  musician: FeaturedMusician;
}

const CardArtist = ({ musician }: CardArtistProps) => {
  const navigate = useNavigate();
  const { id, stageName, genre, photoUrl, description } = musician;

  const goToMusicianProfile = () => {
    navigate(`/profile/musician/${String(id)}`);
  };

  return (
    <div key={id} className="flex h-[16.25rem] w-full max-w-[34.375rem] flex-row gap-6">
      <img
        src={photoUrl ?? defaultImage}
        alt={`Foto de ${stageName}`}
        className="aspect-square h-[8.25rem] w-[8.25rem] rounded-[1.75rem] object-cover md:h-[14.313rem] md:w-[14.313rem] lg:h-[13.5rem] lg:w-[13.5rem]"
      />

      <div className="text-ecos-blue flex h-[16.25rem] flex-col justify-between text-start md:h-[13.75rem] lg:h-[12.5rem]">
        <div className="flex flex-col gap-1">
          <h3 className="text-2xl font-semibold uppercase">{stageName}</h3>
          <p className="text-[0.688rem] font-medium">{genre}</p>
          <p className="w-max-[26.625rem] line-clamp-7 text-sm break-words whitespace-pre-line">
            {description}
          </p>
        </div>

        <div>
          <Button
            children="Ver más"
            bgType="primary"
            type="button"
            onClick={goToMusicianProfile}
            className="w-full max-w-[7.5rem] px-6 py-2.5 text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default CardArtist;
