import CardArtist from "@/app/components/CardArtist";
import { FeaturedMusician } from "../../home/components/types/FeaturedMusician";

interface ArtistGridProps {
  musicians: FeaturedMusician[];
}

const ArtistGrid = ({ musicians }: ArtistGridProps) => {
  return (
    <div className="grid w-full grid-cols-1 justify-items-center space-y-8 md:grid-cols-1 lg:grid-cols-[repeat(auto-fit,_550px)] lg:justify-between">
      {musicians.map((musician) => (
        <CardArtist key={musician.id} musician={musician} />
      ))}
    </div>
  );
};

export default ArtistGrid;
