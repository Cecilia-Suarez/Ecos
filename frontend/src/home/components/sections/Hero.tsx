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

  const handleScrollToExploreSection = () => {
    const $section = document.getElementById("explorar");
    if ($section) $section.scrollIntoView({ behavior: "smooth" });
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
      <div className="relative h-[13.813rem] w-full overflow-hidden md:h-[29.313rem] lg:h-screen">
        <video
          ref={videoRef}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          src={HeroVideo}
          autoPlay
          loop
          muted
          playsInline
          preload="none"
        />

        <div className="flex h-full w-full flex-col justify-center text-white">
          <div className="space-y-1.5 pl-[0.813rem] md:space-y-16 md:pl-[4.625rem] lg:space-y-[1.938rem] lg:pl-8">
            <h1 className="text-2xl font-medium drop-shadow-lg md:text-5xl">
              Bienvenido a Ecos <br /> tu plataforma <br /> musical ideal
            </h1>
            <p className="w-[16.063rem] text-justify text-xs md:w-[24.375rem] md:text-sm">
              Descubre un mundo lleno de música y creatividad. Únete a nosotros para compartir tu
              arte y conectar con otros amantes de la música.
            </p>
            <div className="flex gap-[0.688rem] md:gap-[2.063rem]">
              <button
                type="submit"
                className="bg-ecos-blue cursor-pointer rounded-3xl px-6 py-2.5 text-xs font-medium text-white hover:bg-[#B1B1B1] md:text-sm"
                onClick={() => {
                  handleOpenModal("register");
                }}
              >
                Regístrate
              </button>
              <button
                type="submit"
                onClick={handleScrollToExploreSection}
                className="bg-ecos-orange-light cursor-pointer rounded-3xl px-6 py-2.5 text-xs font-medium hover:bg-[#B1B1B1] md:text-sm"
              >
                Explora
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
