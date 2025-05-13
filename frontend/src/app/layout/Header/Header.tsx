import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Avatar } from "@/auth/components/ui/Avatar";
import Input from "@/app/ui/Input";
import AuthModal, { AuthMode } from "@/auth/components/AuthModal";
import Layer from "@/assets/Layer.svg?react";
import MenuIcon from "@/assets/hamburgerMenu-2.svg?react";
import Lens from "@/assets/lens.svg?react";
import { useAuth } from "@/auth/hooks/use-auth";
import UserMenu from "@/auth/components/UserMenu";
import { Bell } from "./Bell";
import WelcomeUserModal from "@/auth/components/WelcomeUserModal";

export const Header = () => {
  const [openModal, setOpenModal] = useState<AuthMode | null>(null);
  const [showWelcomeUser, setShowWelcomeUser] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useAuth();

  const handleOpenModal = (mode: AuthMode) => {
    setOpenModal(mode);
  };

  const handleCloseModal = () => {
    setOpenModal(null);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
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
      <header className="bg-[#19233A] shadow">
        <div className="mx-auto flex items-center justify-between px-12 py-6">
          <div className="flex items-center gap-16">
            <Link to="/" className="hidden px-6 py-5 lg:flex">
              <Layer />
            </Link>
            <button
              type="button"
              title="Menú"
              className="block p-4 focus:outline-none lg:hidden"
              onClick={toggleMenu}
            >
              <MenuIcon className="h-12 w-12" />
            </button>
            {isOpen && (
              <nav className="absolute top-22 left-1 z-10 w-48 rounded-xl bg-white px-4 py-10 shadow-md lg:hidden">
                <Link to="/explorer" className="block py-2 text-[#19233A]" onClick={closeMenu}>
                  Explorar
                </Link>
                <Link to="/artist" className="block py-2 text-[#19233A]" onClick={closeMenu}>
                  Artistas
                </Link>
                <Link to="/play" className="block py-2 text-[#19233A]" onClick={closeMenu}>
                  Play
                </Link>
              </nav>
            )}
            <nav className="hidden gap-6 text-xl font-semibold text-white lg:flex xl:gap-16">
              <Link to="/explorer">Explorar</Link>
              <Link to="/artist">Artistas</Link>
              <Link to="/play">Play</Link>
            </nav>
          </div>
          <div className="flex items-center gap-6">
            {!user ? (
              <>
                <div className="hidden gap-6 text-xl font-semibold text-white sm:flex xl:mx-24 xl:gap-12">
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
                <Avatar />
              </>
            ) : (
              <>
                <Bell />
                <UserMenu />
              </>
            )}
          </div>
        </div>
        <div className="mx-auto mb-6 w-88 md:w-192 lg:-mt-12 lg:mb-12 lg:w-4/5">
          <Input
            placeholder="Busca Artista, Album, Canción"
            className="mx-auto flex w-full bg-[#ECE6F0] text-[#19233A] sm:w-4/5 lg:py-2 lg:text-xl lg:font-semibold"
            startIcon={<MenuIcon className="my-auto" />}
            endIcon={<Lens className="my-auto" />}
          />
        </div>
      </header>
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
