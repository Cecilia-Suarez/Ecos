import { useEffect, useRef, useState } from "react";
import HeroVideo from "@/assets/Video_Ecos.mp4";
import AuthModal, { AuthMode } from "@/auth/components/AuthModal";
import { useAuth } from "@/auth/hooks/use-auth";
import WelcomeUserModal from "@/auth/components/WelcomeUserModal";

export default function Hero() {
  const [openModal, setOpenModal] = useState<AuthMode | null>(null);
  const [showWelcomeUser, setShowWelcomeUser] = useState(false);
  const { user } = useAuth();

  const handleOpenModal = (mode: AuthMode) => {
    setOpenModal(mode);
  };

  const handleCloseModal = () => {
    setOpenModal(null);
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

  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && videoRef.current instanceof HTMLVideoElement) {
          videoRef.current.setAttribute("preload", "auto");
        }
      },
      { threshold: 0.5 },
    );
    if (videoRef.current instanceof HTMLVideoElement) {
      observer.observe(videoRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div className="relative w-full overflow-hidden md:h-[420px] lg:h-[860px]">
        <video
          ref={videoRef}
          className="absolute inset-0 -z-10 h-full w-full object-cover md:h-[469px] lg:h-[986px]"
          src={HeroVideo}
          autoPlay
          loop
          muted
          playsInline
          preload="none"
        />

        <div className="flex h-full w-full flex-col justify-center bg-gray-900/60 pl-36 text-white">
          <div className="max-w-md">
            <h1 className="text-2xl font-bold drop-shadow-lg md:text-5xl">
              Bienvenidos a Ecos, tu plataforma musical ideal
            </h1>
            <p className="text-md mt-4">
              Descubre un mundo lleno de música y creatividad. Únete a nosotros para compartir tu
              arte y conectar con otros amantes de la música.
            </p>
            <div className="mt-6 flex gap-6">
              <button
                type="submit"
                className="bg-ecos-orange-light hover:bg-ecos-dark-grey-light h-12 w-48 rounded-3xl text-xl text-black"
                onClick={() => {
                  handleOpenModal("register");
                }}
              >
                Registrate
              </button>
              <button
                type="submit"
                className="hover:bg-ecos-dark-grey-light border-ecos-orange-light h-12 w-48 rounded-3xl border-2 bg-transparent text-xl text-white"
              >
                Explorá
              </button>
            </div>
          </div>
        </div>
      </div>

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
}
