import ImageBanner from "@/assets/bannerProfileFan.webp";
import FavoriteSongList from "./components/FavoriteSongList";
import FeaturedArtists from "@/home/components/sections/FeaturedArtists";
import FeaturedTopicsList from "@/home/components/FeaturedSongs";
import UpcomingEvents from "@/home/components/sections/UpcomingEvents";
import { useRequiredUser } from "@/auth/hooks/use-required-user";
import Button from "@/app/ui/Button";
import { Link, useLocation } from "react-router";
import { useEffect } from "react";

const ProfileFanPage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const section = document.getElementById(location.hash.slice(1));
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  const user = useRequiredUser();

  return (
    <div className="flex w-full flex-col items-center gap-24 px-2.5 lg:px-0">
      <img src={ImageBanner} alt="banner" className="w-full object-cover" />

      <div className="w-full lg:w-4/6">
        <h1 className="mb-2 text-start text-4xl font-medium sm:text-5xl">¡BIENVENIDO!</h1>
        <h3 className="text-2xl sm:text-3xl">{user.name}</h3>
      </div>

      <FavoriteSongList />
      <FeaturedTopicsList />
      <FeaturedArtists />
      <Link to={"/artist"} className="mx-36 mt-20 hidden lg:flex lg:justify-center">
        <Button
          type="button"
          className="rounded bg-[#19233A] text-white lg:w-96"
          children="VER MÁS"
          bgType="secondary"
        ></Button>
      </Link>
      <UpcomingEvents />
    </div>
  );
};

export default ProfileFanPage;
