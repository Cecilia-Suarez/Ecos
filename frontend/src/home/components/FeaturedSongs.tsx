import { useApiQuery } from "@/shared/hooks/use-api-query";
import SongsGrid from "./SongGrid";
import { SongList } from "./types/SongList";

interface ApiResponseSongs {
  items: SongList[];
}

const FeaturedSongs = () => {
  const { data } = useApiQuery<ApiResponseSongs>("songs", "songs", "featured");
  return (
    <div className="flex flex-col gap-4 overflow-hidden">
      <h2 className="mt-36 ml-36 text-start text-6xl font-bold text-[#19233A]">
        Canciones Destacadas
      </h2>
      <div className="mt-24 ml-36">{data && <SongsGrid songs={data.items} />}</div>
    </div>
  );
};

export default FeaturedSongs;
