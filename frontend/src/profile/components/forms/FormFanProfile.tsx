import Button from "@/app/ui/Button";
import { useState } from "react";
import useCountryList from "react-select-country-list";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormFanProfileSchema, formFanProfileSchema } from "./schemas/ProfileSchema";
import { useAuth } from "@/auth/hooks/use-auth";
import { useProfileForm } from "@/profile/hooks/use-profile-form";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { PersonalDataFanSection } from "./components/sections/PersonalDataFanSection";
import LabeledInput from "./components/labeledFields/LabeledInput";
import ProfilePhotoSection from "./components/sections/ProfilePhotoSection";
import { useApiMutation } from "@/shared/hooks/use-api-mutation";
import { useLoadFanForm } from "@/profile/hooks/use-load-fan-form";
import { handleFanProfileSubmit } from "@/profile/utils/handlers/handle-fan-profile-submit";

interface FormFanProfileProps {
  onClose: () => void;
}

const FormFanProfile = ({ onClose }: FormFanProfileProps) => {
  const countryOptions = useCountryList().getData();
  const [country, setCountry] = useState("");
  const [profileImage, setProfileImage] = useState<File | string | null>(null);
  const [genreInterest, setGenreInterest] = useState<string[]>([]);

  const { user } = useAuth();
  const id = user?.id ?? "";

  const navigate = useNavigate();

  const handleProfileImageChange = (file: File | null) => {
    setProfileImage(file);
  };

  const formMethods = useForm<FormFanProfileSchema>({
    resolver: zodResolver(formFanProfileSchema),
  });

  const { data, refetch } = useProfileForm<FormFanProfileSchema>(
    "fan",
    id,
    `fan-profile/${id}`,
    formMethods,
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
  } = formMethods;

  useLoadFanForm({
    data,
    setValue,
    setProfileImage,
    setCountry,
    setGenreInterest,
    countryOptions,
    user: user ?? undefined,
  });

  const { mutate, isPending } = useApiMutation<FormData>("fan-profile", "PUT");

  const onSubmit = (data: FormFanProfileSchema) => {
    handleFanProfileSubmit({
      data,
      profileImage,
      mutate: (formData) => {
        mutate(formData, {
          onSuccess: () => {
            refetch();
            toast.success("¡Perfil actualizado con éxito!");
            navigate(`/profile/fan/${id}`);
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
      <PersonalDataFanSection
        country={country}
        genreInterest={genreInterest}
        onGenresListChange={(val) => {
          setGenreInterest(val as [string, ...string[]]);
          setValue("genreInterest", val as [string, ...string[]]);
        }}
        onCountryChange={(val) => {
          setCountry(val);
          setValue("country", val);
        }}
        register={register}
        errors={errors}
        className="order-2 md:order-2 lg:order-1"
      />

      <ProfilePhotoSection
        profileImage={profileImage}
        onImageChange={handleProfileImageChange}
        className="order-1 md:order-1 md:grid md:grid-cols-2 lg:order-2"
      />

      <fieldset className="fieldsetSectionProfile order-3 md:order-3 lg:order-3">
        <legend className="legendSectionProfile">DATOS DE CONTACTO</legend>
        <LabeledInput
          label="Correo Electrónico *"
          htmlFor="email"
          inputProps={{
            id: "email",
            type: "email",
            placeholder: "Correo Electrónico",
            readOnly: true,
            ...register("email"),
          }}
          error={errors.email?.message}
        />
      </fieldset>

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

export default FormFanProfile;
