import ArtistGrid from "@/app/components/ArtistsGrid";
import { useApiQuery } from "@/shared/hooks/use-api-query";
import { FeaturedMusician } from "../types/FeaturedMusician";

interface ApiResponse {
  items: FeaturedMusician[];
}

const FeaturedArtists = () => {
  const { data } = useApiQuery<ApiResponse>("musicians", "/musician-profile/search", "featured");

  return (
    <section id="artistas-destacados" className="space-y-8 pr-[0.813rem] md:pr-[4.625rem] lg:pr-8">
      <h2 className="subtitles text-start">Artistas destacados</h2>
      {data && <ArtistGrid musicians={data.items} />}
    </section>
  );
};

export default FeaturedArtists;
