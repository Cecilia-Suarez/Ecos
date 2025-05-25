import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import Button from "@/app/ui/Button";
import Input from "@/app/ui/Input";
import { EyeOff, EyeOn } from "./ui/icons";
import { useState } from "react";

interface ForgotPasswordFormProps {
  onChange: () => void;
}

const ForgotPasswordSchema = z.object({
  name: z.string().min(3, { message: "Su nombre es obligatorio" }),
  password: z.string().min(8, { message: "Su contraseña debe tener al menos 8 caracteres" }),
});

type FormFields = z.infer<typeof ForgotPasswordSchema>;

const ForgotPasswordForm = ({ onChange }: ForgotPasswordFormProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const handleFormSubmit: SubmitHandler<FormFields> = (data: FormFields) => {
    console.log("Datos enviados:", data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="flex w-[329px] flex-col gap-4">
      <div>
        <Input type="text" {...register("name")} placeholder="Cambiar nombre" />
        {errors.name && (
          <span className="mt-1 h-6 text-sm text-red-500">{errors.name.message}</span>
        )}
      </div>

      <div>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Cambiar contraseña"
            {...register("password")}
          />
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
        {errors.password && (
          <p className="mt-1 h-6 text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <Button type="submit" onClick={onChange} disabled={isSubmitting}>
        {isSubmitting ? "Enviando..." : "Enviar"}
      </Button>
    </form>
  );
};

export default ForgotPasswordForm;
