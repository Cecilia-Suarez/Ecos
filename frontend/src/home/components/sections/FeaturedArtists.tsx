import ArtistGrid from "@/app/components/ArtistsGrid";
import { useApiQuery } from "@/shared/hooks/use-api-query";
import { FeaturedMusician } from "../types/FeaturedMusician";

interface ApiResponse {
  items: FeaturedMusician[];
}

const FeaturedArtists = () => {
  const { data } = useApiQuery<ApiResponse>("musicians", "/musician-profile/search", "featured");

  return (
    <section id="#artistas" className="mx-auto">
      <h2 className="text-ecos-blue t-36 text-start text-6xl font-bold lg:ml-36">
        Artistas Destacados
      </h2>
      {data && <ArtistGrid musicians={data.items} />}
    </section>
  );
};

export default FeaturedArtists;
