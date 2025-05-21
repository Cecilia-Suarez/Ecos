import { useEffect, useState } from "react";
import AuthModal, { AuthMode } from "@/auth/components/AuthModal";
import { useAuth } from "@/auth/hooks/use-auth";
import WelcomeUserModal from "@/auth/components/WelcomeUserModal";
import BannerGuitars from "@/assets/GuitarsBanner.webp";

export default function GuitarRegisterSection() {
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

  return (
    <>
      <div className="relative max-h-[310px] max-w-[393] md:max-h-[698px] md:max-w-[833px] lg:max-h-[774px] lg:max-w-[1920px]">
        <img
          src={BannerGuitars}
          className="m-auto h-[182px] w-[364] rounded-2xl shadow-2xl md:h-[471px] md:w-[687px] lg:h-[486px] lg:w-[1570px]"
          alt="Banner Guitar"
        />
        <button
          type="button"
          className="bg-ecos-orange-light absolute bottom-6 left-24 z-10 h-[36px] w-[194px] rounded-4xl text-2xl text-white md:bottom-16 md:left-36 md:h-[63px] md:w-[339px] lg:bottom-16 lg:left-44"
          onClick={() => {
            handleOpenModal("register");
          }}
        >
          Registrate
        </button>
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
