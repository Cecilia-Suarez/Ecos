import Button from "@/app/ui/Button";
import { useState } from "react";
import useCountryList from "react-select-country-list";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormMusicianProfileSchema, formMusicianProfileSchema } from "./schemas/ProfileSchema";
import { useAuth } from "@/auth/hooks/use-auth";
import { useProfileForm } from "@/profile/hooks/use-profile-form";
import { useLoadMusicianForm } from "@/profile/hooks/use-load-musician-form";
import { handleMusicianProfileSubmit } from "@/profile/utils/handlers/handle-musician-profile-submit";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { ContactDetailMusicianSection } from "./components/sections/ContactDetailsMusicianSection";
import { SocialLinksSection } from "./components/sections/SocialLinksSection";
import ProfilePhotoSection from "./components/sections/ProfilePhotoSection";
import { useApiMutation } from "@/shared/hooks/use-api-mutation";
import { PersonalDataMusicianSection } from "./components/sections/PersonalDataMusicianSection";
import { DonationDataSection } from "./components/sections/DonationDataSection";

interface FormMusicianProfileProps {
  onClose: () => void;
}

const FormMusicianProfile = ({ onClose }: FormMusicianProfileProps) => {
  const countryOptions = useCountryList().getData();
  const [country, setCountry] = useState("");
  const [genre, setGenre] = useState<string>("");
  const [profileImage, setProfileImage] = useState<File | string | null>(null);

  const { user } = useAuth();
  const id = user?.id ?? "";

  const navigate = useNavigate();

  const handleProfileImageChange = (file: File | null) => {
    setProfileImage(file);
  };

  const formMethods = useForm<FormMusicianProfileSchema>({
    resolver: zodResolver(formMusicianProfileSchema),
  });

  const { data, refetch } = useProfileForm<FormMusicianProfileSchema>(
    "musician",
    id,
    "`musician-profile/${id}`",
    formMethods,
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
  } = formMethods;

  useLoadMusicianForm({
    data,
    setValue,
    setProfileImage,
    setCountry,
    setGenre,
    countryOptions,
    user: user ?? undefined,
  });

  const { mutate, isPending } = useApiMutation<FormData>("musician-profile", "PUT");

  const onSubmit = (data: FormMusicianProfileSchema) => {
    handleMusicianProfileSubmit({
      data,
      profileImage,
      mutate: (formData) => {
        mutate(formData, {
          onSuccess: () => {
            refetch();
            toast.success("¡Perfil actualizado con éxito!");
            navigate(`/profile/musician/${id}`);
            onClose();
          },
          onError: () => {
            toast.error("Ocurrió un error al guardar. Intentá nuevamente.");
            setError("root", {
              message: "Ocurrió un error al guardar. Intentá nuevamente.",
            });
          },
        });
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="formProfile">
      <PersonalDataMusicianSection
        genre={genre}
        country={country}
        onGenreChange={(val) => {
          setGenre(val);
          setValue("genre", val);
        }}
        onCountryChange={(val) => {
          setCountry(val);
          setValue("country", val);
        }}
        errors={errors}
        register={register}
        className="order-2 md:order-2 lg:order-1"
      />

      <ProfilePhotoSection
        profileImage={profileImage}
        onImageChange={handleProfileImageChange}
        className="order-1 md:order-1 md:grid md:grid-cols-2 lg:order-2"
      />

      <ContactDetailMusicianSection
        register={register}
        errors={errors}
        className="order-3 md:order-3 lg:order-3"
      />

      <DonationDataSection
        register={register}
        errors={errors}
        className="order-4 md:order-4 lg:order-4 lg:col-start-1"
      />

      <SocialLinksSection
        register={register}
        errors={errors}
        className="order-5 md:order-5 lg:order-5 lg:col-start-1"
      />

      <div className="containerBtnSectionProfile">
        <Button type="submit" className="btnSectionProfile" disabled={isPending} bgType="primary">
          {isPending ? "GUARDANDO..." : "GUARDAR"}
        </Button>
        <Button type="button" className="btnSectionProfile" onClick={onClose} bgType="secondary">
          CANCELAR
        </Button>
      </div>
    </form>
  );
};

export default FormMusicianProfile;
