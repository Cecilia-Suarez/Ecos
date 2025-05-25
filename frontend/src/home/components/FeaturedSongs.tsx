import { useApiQuery } from "@/shared/hooks/use-api-query";
import SongsGrid from "./SongGrid";
import { SongList } from "./types/SongList";

interface ApiResponseSongs {
  items: SongList[];
}

const FeaturedSongs = () => {
  const { data } = useApiQuery<ApiResponseSongs>("songs", "songs", "featured");
  return (
    <div className="flex flex-col gap-4 overflow-hidden sm:mx-36">
      <h2 className="mx-2 mb-4 text-start text-3xl font-bold text-[#19233A]">Temas destacados</h2>
      {data && <SongsGrid songs={data.items} />}
    </div>
  );
};

export default FeaturedSongs;
