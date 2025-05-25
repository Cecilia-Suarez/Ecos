import { useState, useEffect } from "react";
import { useAuth } from "@/auth/hooks/use-auth";
import { useNavigate } from "react-router";
import { Settings, Avatar, Logout, UserProfileIcon, EditContainer } from "./ui/icons";
import ProfileUserModal from "@/profile/components/ProfileUserModal";
import { useProfileData } from "../hooks/useProfileData";
import { Musician, Fan } from "../types";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, handleLogout } = useAuth();
  const [isOpenPerfilModal, setIsOpenProfileModal] = useState(false);

  const navigate = useNavigate();
  const id = user?.id ?? "";

  const profileType = user?.role === "MUSICIAN" ? "musician" : "fan";
  const endpoint = user?.role === "MUSICIAN" ? `musician-profile/${id}` : `fan-profile/${id}`;

  const { data: profile } = useProfileData<Musician | Fan>(profileType, id, endpoint);

  const [profileImage, setProfileImage] = useState<string | undefined>(profile?.photoUrl);

  useEffect(() => {
    setProfileImage(profile?.photoUrl);
  }, [profile]);

  const handleLogOut = () => {
    handleLogout();
    navigate("/");
  };

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  if (!user) return null;

  return (
    <>
      <div className="relative">
        <button type="button" onClick={toggleMenu}>
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="size-[65px] cursor-pointer rounded-full object-cover"
            />
          ) : (
            <Avatar className="m-5 cursor-pointer" />
          )}
        </button>

        {isOpen && (
          <div className="fixed inset-0 z-10" onClick={toggleMenu}>
            <div
              className="absolute top-22 right-1 z-10 mt-4 flex h-[450px] w-80 flex-col items-center justify-around bg-white text-2xl shadow-lg xl:top-32"
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              <h2 className="leading-5 font-medium tracking-tight uppercase">{user.name}</h2>
              <div className="flex flex-col items-start gap-6">
                <button
                  type="button"
                  onClick={() => {
                    navigate(`/profile/${user.role.toLowerCase()}/${id}`);
                    setIsOpen(false);
                  }}
                  className="flex cursor-pointer items-center gap-5 leading-1"
                >
                  <UserProfileIcon className="size-8" />
                  Mi perfil
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (user.role === "MUSICIAN") {
                      navigate("/profile/musician/edit");
                    } else {
                      setIsOpenProfileModal(true);
                    }
                    setIsOpen(false);
                  }}
                  className="flex cursor-pointer items-center gap-5 leading-1"
                >
                  <EditContainer className="size-8" />
                  Editar perfil
                </button>

                {user.role === "MUSICIAN" && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpenProfileModal(true);
                      setIsOpen(false);
                    }}
                    className="flex cursor-pointer items-center gap-5 leading-1"
                  >
                    <Settings className="size-8" />
                    Configuración
                  </button>
                )}

                <button
                  onClick={handleLogOut}
                  type="button"
                  className="flex cursor-pointer items-center gap-5 leading-1"
                >
                  <Logout className="size-8" />
                  Cerrar sesión
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {isOpenPerfilModal && (
        <ProfileUserModal
          onClose={() => {
            setIsOpenProfileModal(false);
          }}
        />
      )}
    </>
  );
};

export default UserMenu;
