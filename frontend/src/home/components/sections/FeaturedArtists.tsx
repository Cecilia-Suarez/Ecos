import ArtistGrid from "@/app/components/ArtistsGrid";
import { useApiQuery } from "@/shared/hooks/use-api-query";
import { FeaturedMusician } from "../types/FeaturedMusician";

interface ApiResponse {
  items: FeaturedMusician[];
}

const FeaturedArtists = () => {
  const { data } = useApiQuery<ApiResponse>("musicians", "/musician-profile/search", "featured");

  return (
    <section id="#artistas" className="mt-36 ml-36 px-2.5 lg:px-12">
      <h2 className="text-ecos-blue mb-24 text-start text-6xl font-bold">Artistas destacados</h2>
      {data && <ArtistGrid musicians={data.items} />}
    </section>
  );
};

export default FeaturedArtists;
