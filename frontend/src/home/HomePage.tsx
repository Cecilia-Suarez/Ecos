import Hero from "@/home/components/sections/Hero";
import FeaturedArtists from "./components/sections/FeaturedArtists";
import UpcomingEvents from "./components/sections/UpcomingEvents";
import FAQList from "./components/sections/FAQList";
import DiscoverArtist from "./components/sections/DiscoverArtist";

export const HomePage = () => {
  return (
    <main className="content-center">
      <Hero />
      <div className="space-y-24">
        <DiscoverArtist />
        <FeaturedArtists />
        <UpcomingEvents />
        <FAQList />
      </div>
    </main>
  );
};
