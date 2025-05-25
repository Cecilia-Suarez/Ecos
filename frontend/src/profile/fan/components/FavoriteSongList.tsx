import CardSong from "./CardSong";
import { useApiQuery } from "@/shared/hooks/use-api-query";
import { ResponseListOfFavoriteSongs } from "@/profile/types/favorite-songs";

const FavoriteSongList = () => {
  const { data } = useApiQuery<ResponseListOfFavoriteSongs>("songs", "/saved-songs", "all");

  if (!data?.items.length) {
    return null;
  }

  return (
    <div id="favoritos" className="text-ecos-blue flex flex-col items-center">
      <h2 className="self-start text-4xl font-medium">TU LISTA DE FAVORITOS</h2>
      <div className="mt-6 grid grid-cols-1 gap-y-16 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-6">
        {data.items.map((song) => (
          <CardSong
            key={song.id}
            id={song.id}
            title={song.title}
            artistId={song.musicianInfo.artistId}
            stageName={song.musicianInfo.stageName}
            photoUrl={song.musicianInfo.photoUrl ?? undefined}
            audioUrl={song.audioUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default FavoriteSongList;
