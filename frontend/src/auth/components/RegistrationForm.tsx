import Button from "@/app/ui/Button";
import Input from "@/app/ui/Input";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeOff, EyeOn } from "./ui/icons";
import { useApiMutation } from "@/shared/hooks/use-api-mutation";
import { useAuth } from "../hooks/use-auth";
import { useState } from "react";
import { toast } from "sonner";
import { Spinner } from "@/app/ui/Spinner";

const nameRegex = /^[\p{L}0-9\s]+$/u;
const noOnlySpaces = /^(?!\s*$).+/;
const passwordRegex = /^[a-zA-Z0-9!@#$%&*_-]+$/;

const registerSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Su nombre debe tener al menos 3 caracteres." })
    .regex(noOnlySpaces, { message: "Este campo no puede contener solo espacios." })
    .regex(nameRegex, {
      message: "Su nombre solo puede contener letras, números y espacios.",
    }),
  email: z.string().email({ message: "El email ingresado no es válido." }),
  password: z
    .string()
    .min(8, { message: "Su contraseña debe tener al menos 8 caracteres." })
    .regex(noOnlySpaces, { message: "Este campo no puede contener solo espacios." })
    .regex(passwordRegex, {
      message: "La contraseña solo puede contener letras, números y ! @ # $ % & * _ -",
    }),
  terms: z.literal(true, {
    errorMap: () => ({ message: "Debes aceptar los términos." }),
  }),
});

export type FormFields = z.infer<typeof registerSchema>;

type RegistrationData = Omit<FormFields, "terms"> & { role: string };

interface RegistrationFormProps {
  role: string;
}

interface RegisterResponse {
  token: string;
}

const RegistrationForm = ({ role }: RegistrationFormProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(registerSchema),
  });

  const { handleLogin } = useAuth();

  const { mutate, isPending } = useApiMutation<RegisterResponse, RegistrationData>("/auth", "POST");

  const onSubmit: SubmitHandler<FormFields> = ({ name, email, password }) => {
    const userData = { name, email, password, role };

    mutate(userData, {
      onSuccess: (response) => {
        handleLogin(response.token);
        toast.success(`Tu registro fue exitoso`);
        localStorage.setItem("showWelcomeUser", "true");
      },
      onError: (error) => {
        toast.error("Error al registrarse");
        setError("root", {
          message: error.message,
        });
      },
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-3/5 flex-col gap-6">
        <div>
          <Input type="text" placeholder="Nombre" {...register("name")} />
          {errors.name && <p className="mt-1 mb-3 h-6 text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <Input type="email" placeholder="e-mail@mail.com" {...register("email")} />
          {errors.email && <p className="mt-1 h-6 text-red-500">{errors.email.message}</p>}
        </div>

        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            {...register("password")}
          />
          {errors.password && (
            <p className="mt-1 mb-3 h-6 text-red-500">{errors.password.message}</p>
          )}

          <button
            type="button"
            onClick={() => {
              setShowPassword(!showPassword);
            }}
            className="absolute top-2 right-4 text-gray-500"
          >
            {showPassword ? <EyeOn /> : <EyeOff />}
            <span className="sr-only">
              {showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            </span>
          </button>
        </div>

        <label className="flex items-center justify-center gap-2 text-sm">
          <input type="checkbox" {...register("terms")} className="size-6" />
          <span className="checkbox-label text-[#6E6E6E]">
            Leí y acepto los <u className="hover:cursor-pointer">Términos de uso</u>.
          </span>
        </label>
        {errors.terms && <p className="mt-1 h-6 text-red-500">{errors.terms.message}</p>}

        <Button
          bgType="secondary"
          className="text-white hover:cursor-pointer"
          type="submit"
          disabled={isPending}
        >
          {isPending ? (
            <>
              Registrándose... <Spinner className="size-8 rounded-full bg-white/20" />
            </>
          ) : (
            "Registrate"
          )}
        </Button>

        {errors.root && <p className="text-red-500">{errors.root.message}</p>}
      </form>
    </>
  );
};

export default RegistrationForm;
