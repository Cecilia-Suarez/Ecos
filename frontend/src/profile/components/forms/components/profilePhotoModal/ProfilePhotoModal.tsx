import Modal from "@/app/ui/Modal";
import { useState, useEffect } from "react";
import ProfileImagen from "./components/ProfileImagen";
import ImageUpload from "./components/ImageUpdload";
import Button from "@/app/ui/Button";
import { Edit, Trash } from "@/profile/components/ui/Icons";

export type Transition = "edit" | "upload";

interface ProfilePhotoPropsModal {
  open: boolean;
  mode: Transition;
  onClose: () => void;
  openProfileImagen: (file: File | null, imageUrl: string | null) => void;
  initialImage?: string | null;
  currentImage?: string | null;
}

const ProfilePhotoModal = ({
  open,
  mode,
  onClose,
  openProfileImagen,
  currentImage,
}: ProfilePhotoPropsModal) => {
  const [transition, setTransition] = useState<Transition>(mode);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(currentImage ?? null);

  useEffect(() => {
    setTransition(mode);
    setPreview(currentImage ?? null);
    setFile(null);
  }, [mode, currentImage, open]);

  const switchToUpload = () => {
    {
      setTransition("upload");
    }
  };

  const handleImageUpload = (file: File | null, imageUrl: string | null) => {
    setFile(file);
    setPreview(imageUrl);
  };

  const handleSave = () => {
    if (file && preview) {
      openProfileImagen(file, preview);
      onClose();
    }
  };

  if (!open) return null;

  return (
    <Modal onClose={onClose} className="flex h-fit w-fit gap-5 lg:h-[600px] lg:w-[700px]">
      <h2 className="px-6 py-2 text-start text-2xl font-medium">IMAGEN DE PERFIL</h2>
      {transition === "edit" && (
        <div className="flex flex-col items-center justify-around gap-20 px-3.5 pb-10">
          <ProfileImagen profileImage={preview ?? null} />
          <div className="flex items-center gap-11">
            <Button
              startIcon={<Edit className="h-10 w-10 stroke-white" />}
              children="CAMBIAR"
              className="text-white"
              bgType="primary"
              onClick={switchToUpload}
            />
            <Button
              children="ELIMINAR"
              className="text-white"
              bgType="secondary"
              startIcon={<Trash className="h-10 w-10" />}
              onClick={() => {
                setFile(null);
                setPreview(null);
                openProfileImagen(null, null);
                onClose();
              }}
            />
          </div>
        </div>
      )}
      {transition === "upload" && (
        <div className="flex flex-col items-center justify-around gap-9 px-3.5 pb-10">
          <ImageUpload onImageUpload={handleImageUpload} />
          <div className="flex items-center gap-11 font-medium">
            <Button
              children="GUARDAR"
              onClick={handleSave}
              bgType="primary"
              className="text-white"
              disabled={!file}
            />
            <Button
              children="CANCELAR"
              onClick={onClose}
              className="text-white"
              bgType="secondary"
            />
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ProfilePhotoModal;
