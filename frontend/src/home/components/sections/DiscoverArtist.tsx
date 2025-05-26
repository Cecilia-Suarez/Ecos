import MusicSearch from "@/app/components/MusicSearch";
import FeaturedSongs from "../FeaturedSongs";

const DiscoverArtist = () => {
  return (
    <section
      id="#explorar"
      className="noScrollbar w-full max-w-screen items-center gap-y-8 overflow-visible overflow-x-auto pr-[0.813rem] md:pr-[4.625rem] lg:pr-8"
    >
      <MusicSearch />
      <FeaturedSongs />
    </section>
  );
};

export default DiscoverArtist;
