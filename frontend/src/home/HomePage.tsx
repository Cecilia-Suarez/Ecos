import Hero from "@/home/components/sections/Hero";
import OptionsRegister from "@/home/components/sections/OptionsRegister";
import FeaturedArtists from "./components/sections/FeaturedArtists";
import UpcomingEvents from "./components/sections/UpcomingEvents";
import FAQList from "./components/sections/FAQList";
import DiscoverArtist from "./components/sections/DiscoverArtist";
import GuitarRegisterSection from "./components/sections/GuitarRegisterSection";

export const HomePage = () => {
  return (
    <main className="content-center">
      <Hero />
      <div className="space-y-24">
        <OptionsRegister />
        <DiscoverArtist />
        <FeaturedArtists />
        <UpcomingEvents />
        <FAQList />
        <GuitarRegisterSection />
      </div>
    </main>
  );
};
