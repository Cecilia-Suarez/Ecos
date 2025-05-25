import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { Avatar } from "@/auth/components/ui/icons";
import Input from "@/app/ui/Input";
import AuthModal, { AuthMode } from "@/auth/components/AuthModal";
import EcosLogo from "@/assets/header/logo.svg?react";
import MenuIcon from "@/assets/hamburgerMenu-2.svg?react";
import Lens from "@/assets/lens.svg?react";
import { useAuth } from "@/auth/hooks/use-auth";
import { useApiQuery } from "@/shared/hooks/use-api-query";
import UserMenu from "@/auth/components/UserMenu";
import WelcomeUserModal from "@/auth/components/WelcomeUserModal";

<<<<<<< HEAD
interface Song {
  id: string;
  title: string;
  genre?: string;
  audioUrl?: string;
}

const NAV_SECTIONS = [
  "Inicio",
  "Explorar",
  "Artistas Destacados",
  "Eventos",
  "Preguntas Frecuentes",
=======
const HOME_SECTIONS = [
  { name: "Inicio", hash: "" },
  { name: "Explorar", hash: "#explorar" },
  { name: "Artistas Destacados", hash: "#artistas-destacados" },
  { name: "Eventos", hash: "#eventos" },
  { name: "Preguntas Frecuentes", hash: "#preguntas-frecuentes" },
>>>>>>> frontend
];

const USER_SECTIONS = [
  { name: "Inicio", hash: "" },
  { name: "Mis Favoritos", hash: "#favoritos" },
  { name: "Artistas Destacados", hash: "#artistas-destacados" },
  { name: "Eventos", hash: "#eventos" },
];

export const Header = () => {
<<<<<<< HEAD
  // const [activeSection, setActiveSection] = useState("");

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const sections = ["explorar", "artistas", "eventos", "preguntas"];
  //     const scrollY = window.scrollY;

  //     sections.forEach((id) => {
  //       const section = document.getElementById(id);
  //       if (section) {
  //         const offsetTop = section.offsetTop;
  //         const height = section.offsetHeight;

  //         if (scrollY >= offsetTop && scrollY < offsetTop + height) {
  //           setActiveSection(id);
  //         }
  //       }
  //     });
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);
  const [searchQuery, setSearchQuery] = useState("");
  const searchUrl = searchQuery
    ? `/songs/search?search=${encodeURIComponent(searchQuery)}&page=0&size=10&sortBy=title&direction=asc`
    : "";
  const { data } = useApiQuery<{ items: Song[] }>("search", searchUrl, undefined, !!searchQuery);

  const songs = searchQuery.trim().length > 0 && data?.items ? data.items : [];
  const [currentSong, setCurrentSong] = useState<string | null>(null);
  const handlePlaySong = (url: string) => {
    setCurrentSong(null);

    setTimeout(() => {
      setCurrentSong(url);
    }, 50);

    setSearchQuery("");
  };
  const handleClosePlayer = () => {
    const audio = document.querySelector("audio");

    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      audio.src = "";
      audio.load();
    }

    setCurrentSong(null);
  };

=======
>>>>>>> frontend
  const [openModal, setOpenModal] = useState<AuthMode | null>(null);
  const [showWelcomeUser, setShowWelcomeUser] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();

  const { user } = useAuth();
  const isFan = user?.role === "FAN";

  const handleOpenModal = (mode: AuthMode): void => {
    setOpenModal(mode);
  };

  const handleCloseModal = () => {
    setOpenModal(null);
  };

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMobileMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (user) setOpenModal(null);
  }, [user]);

  useEffect(() => {
    const shouldShow = localStorage.getItem("showWelcomeUser");
    if (shouldShow) {
      setShowWelcomeUser(true);
      setOpenModal(null);
      localStorage.removeItem("showWelcomeUser");
    }
  }, [user]);

  return (
    <>
      <header id="top" className="bg-ecos-blue shadow">
        <div className="mx-auto flex items-center justify-between py-6 pr-2.5 pl-6 xl:pr-[22px] xl:pl-[45px]">
          <div className="flex flex-auto items-center gap-9 2xl:gap-[74px]">
            <Link to="/" className="hidden lg:flex">
              <EcosLogo className="h-auto w-20 py-5 xl:w-[121px] xl:py-0" />
            </Link>

            <button
              type="button"
              className="block focus:outline-none lg:hidden"
              onClick={toggleMobileMenu}
            >
              {isOpen ? (
                <span className="text-5xl text-white">✖</span>
              ) : (
                <MenuIcon className="h-12 w-12 md:ml-9" />
              )}
            </button>

            {/* MOBILE NAV */}
            {isOpen && (
              <div className="fixed inset-0 z-10" onClick={closeMobileMenu}>
                <nav
                  className="absolute top-22 left-1 z-10 flex w-[286px] flex-col items-start gap-2.5 rounded-[20px] bg-white px-[26px] py-[53px] shadow-md lg:hidden"
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                >
                  {isFan && location.pathname !== "/"
                    ? USER_SECTIONS.map(({ name, hash }) => (
                        <Link
                          key={name}
                          title={name}
                          onClick={closeMobileMenu}
                          className="cursor-pointer hover:text-[#B1B1B1]"
                          to={{ pathname: name === "Inicio" ? "/" : location.pathname, hash }}
                        >
                          {name}
                        </Link>
                      ))
                    : HOME_SECTIONS.map(({ name, hash }) => (
                        <Link
                          key={name}
                          title={name}
                          onClick={closeMobileMenu}
                          className="cursor-pointer hover:text-[#B1B1B1]"
                          to={{ pathname: "/", hash }}
                        >
                          {name}
                        </Link>
                      ))}
                </nav>
              </div>
            )}

            {/* DESKTOP NAV */}
            <nav className="text-ecos-base hidden gap-10 text-xl font-normal lg:flex 2xl:gap-20 2xl:text-2xl">
              {isFan && location.pathname !== "/"
                ? USER_SECTIONS.slice(1).map(({ name, hash }) => (
                    <Link
                      key={name}
                      title={name}
                      className="cursor-pointer hover:text-[#B1B1B1]"
                      to={{ pathname: location.pathname, hash }}
                    >
                      {name}
                    </Link>
                  ))
                : HOME_SECTIONS.slice(1).map(({ name, hash }) => (
                    <Link
                      key={name}
                      title={name}
                      className="cursor-pointer hover:text-[#B1B1B1]"
                      to={{ pathname: "/", hash }}
                    >
                      {name}
                    </Link>
                  ))}
            </nav>
          </div>

          <div className="flex items-center justify-end xl:gap-3 2xl:gap-[74px]">
            {!user ? (
              <>
                <div className="text-ecos-base hidden gap-6 px-[39px] text-base font-normal md:flex">
                  <button
                    className="cursor-pointer"
                    type="button"
                    onClick={() => {
                      handleOpenModal("login");
                    }}
                  >
                    Iniciar Sesión
                  </button>
                  <button
                    className="cursor-pointer"
                    type="button"
                    onClick={() => {
                      handleOpenModal("register");
                    }}
                  >
                    Crear cuenta
                  </button>
                </div>
                <Avatar className="m-5 md:m-0" />
              </>
            ) : (
              <>
                <UserMenu />
              </>
            )}
          </div>
        </div>
        <div className="mx-auto mb-6 w-88 md:w-192 lg:-mt-12 lg:mb-12 lg:w-4/5">
          <Input
            placeholder="Busca Canciones y navega con música ..."
            className="text-ecos-blue mx-auto flex w-full bg-[#ECE6F0] sm:w-4/5 lg:py-2 lg:text-xl lg:font-semibold"
            startIcon={<MenuIcon className="my-auto" />}
            endIcon={<Lens className="my-auto" />}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
          {songs.length > 0 && searchQuery.trim().length > 0 && (
            <div className="absolute top-48 left-120 z-30 max-h-[300px] w-[300px] -translate-x-1/2 transform overflow-y-auto rounded-lg bg-white p-4 shadow-md">
              {songs.map((song) => (
                <p
                  key={song.id}
                  className="cursor-pointer rounded px-2 py-1 text-black hover:bg-gray-200"
                  onClick={() => {
                    if (song.audioUrl) {
                      handlePlaySong(song.audioUrl);
                    }
                  }}
                >
                  {song.title}
                </p>
              ))}
            </div>
          )}
        </div>
      </header>
      {currentSong && (
        <div className="stick top-60 z-20 flex transform justify-between rounded-lg bg-white px-10 py-1 shadow-lg">
          <audio controls autoPlay key={currentSong}>
            <source src={currentSong} type="audio/mpeg" />
            Tu navegador no soporta audio.
          </audio>
          <button
            type="button"
            onClick={handleClosePlayer}
            className="bg-ecos-orange my-auto h-12 w-36 cursor-pointer rounded-4xl px-3 py-1 text-white"
          >
            Cerrar
          </button>
        </div>
      )}

      {openModal && <AuthModal mode={openModal} onClose={handleCloseModal} />}
      {showWelcomeUser && (
        <WelcomeUserModal
          onClose={() => {
            setShowWelcomeUser(false);
          }}
        />
      )}
    </>
  );
};
