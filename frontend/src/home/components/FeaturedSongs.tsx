import { useApiQuery } from "@/shared/hooks/use-api-query";
import SongsGrid from "./SongGrid";
import { SongList } from "./types/SongList";

interface ApiResponseSongs {
  items: SongList[];
}

interface FeaturedSongsProps {
  onFavoriteAdded?: () => void;
}

const FeaturedSongs = ({ onFavoriteAdded }: FeaturedSongsProps) => {
  const { data } = useApiQuery<ApiResponseSongs>("songs", "songs", "featured");

  return (
    <section className="flex w-full flex-col space-y-8 overflow-visible">
      <h2 className="subtitles mt-8 text-start">Temas destacados</h2>
      {data && <SongsGrid songs={data.items} onFavoriteAdded={onFavoriteAdded} />}
    </section>
  );
};

export default FeaturedSongs;
