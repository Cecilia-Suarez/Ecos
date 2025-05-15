import CardArtist from "@/app/components/CardArtist";
import { FeaturedMusician } from "../../home/components/types/FeaturedMusician";

interface ArtistGridProps {
  musicians: FeaturedMusician[];
}

const ArtistGrid = ({ musicians }: ArtistGridProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 px-6 lg:grid-cols-2 lg:grid-rows-2">
      {musicians.map((musician) => (
        <CardArtist key={musician.id} musician={musician} />
      ))}
    </div>
  );
};

export default ArtistGrid;
