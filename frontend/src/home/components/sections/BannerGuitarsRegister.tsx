import AuthModal, { AuthMode } from "@/auth/components/AuthModal";
import WelcomeUserModal from "@/auth/components/WelcomeUserModal";
import { useAuth } from "@/auth/hooks/use-auth";
import { useEffect, useState } from "react";
import BannerGuitar from "@/assets/GuitarsBanner.webp";

export default function BannerGuitarsRegister() {
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
      <div className="relative rounded-[1.875rem]">
        <img
          src={BannerGuitar}
          className="m-auto h-[11.375rem] w-[22.75rem] rounded-2xl md:h-[29.438rem] md:w-[42.938rem] md:pr-[4.625rem] lg:h-[30.375rem] lg:w-[98.125rem]"
          alt="Banner Guitar"
        />
        <button
          type="button"
          className="bg-ecos-orange-light hover:bg-ecos-dark-grey-light absolute bottom-6 z-10 h-9 w-[12.125rem] cursor-pointer rounded-4xl text-xl text-white md:bottom-12 md:left-[4.438rem] md:h-[3.938rem] md:w-[21.188rem] md:text-2xl lg:bottom-16 lg:left-44"
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
