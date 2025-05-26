import { Link } from "react-router";
import AuthModal, { AuthMode } from "@/auth/components/AuthModal";
import WelcomeUserModal from "@/auth/components/WelcomeUserModal";
import { useAuth } from "@/auth/hooks/use-auth";
import { useEffect, useState } from "react";

interface OptionsRegisterCardsProps {
  id: string;
  icono: string;
  option: string;
  description: string;
  imageSrc: string;
  title: string;
  parrafo2: string;
  parrafo: string;
  buttonText: string;
}

const OptionsRegisterCards = ({
  icono,
  option,
  description,
  imageSrc,
  title,
  parrafo2,
  parrafo,
  buttonText,
}: OptionsRegisterCardsProps) => {
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

  const HeaderContent = (
    <div className="flex items-center space-x-4 px-4">
      <img src={icono} alt={option} className="h-10 w-10" />
      <div className="gap-1 text-start">
        <h2 className="font-bold">{option}</h2>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );

  return (
    <>
      <div className="bg-ecos-blue flex h-20 w-[22.813rem] justify-between rounded-xl text-white md:hidden">
        {HeaderContent}
        <img
          src={imageSrc}
          alt={title}
          className="h-20 w-[7.5rem] rounded-r-[0.625rem] object-cover"
        />
      </div>

      <div className="border-ecos-blue bg-ecos-blue hidden max-w-[25rem] flex-col justify-between gap-3.5 rounded-[1.25rem] border py-3 text-white md:flex">
        {HeaderContent}
        <img src={imageSrc} alt={title} className="object-cover" />
        <div className="max-h-[6.125rem] w-[21.25rem] space-y-[0.438rem] px-4 text-start">
          <h1 className="font-medium">{title}</h1>
          <p className="text-sm leading-5 tracking-tight">{parrafo}</p>
          <p className="text-sm font-light">{parrafo2}</p>
        </div>

        <div className="mt-5 flex justify-end">
          {buttonText === "Explorar" ? (
            <Link
              to={{ hash: "#explorar" }}
              className="bg-ecos-orange-light hover:bg-ecos-dark-grey-light mr-[0.813rem] cursor-pointer rounded-3xl px-6 py-2.5 text-center text-sm font-medium text-white"
            >
              {buttonText}
            </Link>
          ) : (
            <button
              type="button"
              className="bg-ecos-orange-light hover:bg-ecos-dark-grey-light mr-[0.813rem] cursor-pointer rounded-3xl px-6 py-2.5 text-center text-sm font-medium text-white"
              onClick={() => {
                handleOpenModal("register");
              }}
            >
              {buttonText}
            </button>
          )}
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
};

export default OptionsRegisterCards;
