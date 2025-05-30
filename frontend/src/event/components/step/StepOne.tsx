import { useState } from "react";
import InputField from "../ui/ImputField";
import TypeSelector from "../ui/TypeSelector";
import InputTime from "../ui/InputTime";
import { eventSchema } from "../../validation/EventSchema";
import { ZodError } from "zod";
import { FormData } from "../../type/FormData";
import { useNavigate } from "react-router";

interface StepOneProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  nextStep: () => void;
}

export default function StepOne({ nextStep, formData, setFormData }: StepOneProps) {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const parsedData = eventSchema.parse(formData);
      setFormData((prev) => ({
        ...prev,
        ...parsedData,
      }));
      nextStep();
    } catch (err) {
      if (err instanceof ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.errors.forEach((error) => {
          if (error.path[0]) {
            fieldErrors[error.path[0] as string] = error.message;
          }
        });
        setFormErrors(fieldErrors);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    try {
      const fieldSchema = eventSchema.shape[name as keyof typeof eventSchema.shape];
      fieldSchema.parse(value);

      setFormErrors((prev) => {
        const newErrors = { ...prev };
        const { [name]: _, ...restErrors } = newErrors;
        setFormErrors(restErrors);

        return newErrors;
      });
    } catch (err) {
      if (err instanceof ZodError) {
        setFormErrors((prev) => ({
          ...prev,
          [name]: err.errors[0]?.message || "Error en el campo",
        }));
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 w-full space-y-8 md:p-6 lg:mx-auto lg:max-w-7xl">
      <div>
        <p className="mb-2 font-[Roboto] text-2xl font-medium">Detalles</p>
        <div className="grid w-full grid-cols-1 items-center justify-start gap-4">
          <InputField
            type="text"
            label="Nombre del evento "
            name="name"
            value={formData.name}
            required
            onChange={handleChange}
            error={formErrors.name}
            placeholder="Introduce el nombre de tu evento"
          />

          <InputField
            type="text"
            label="Categoría "
            name="category"
            value={formData.category}
            required
            onChange={handleChange}
            error={formErrors.category}
            placeholder="Introduce la categoría del evento"
          />
        </div>
      </div>

      <TypeSelector form={formData} setForm={setFormData} error={formErrors.type} />

      <InputTime form={formData} handleChange={handleChange} errors={formErrors} />

      <div className="flex flex-col">
        <p className="mb-2 font-[Roboto] text-2xl font-medium">Lugar</p>
        <InputField
          type="text"
          label="¿Dónde se realiza el evento?"
          name="location"
          value={formData.location}
          required
          onChange={handleChange}
          error={formErrors.location}
          placeholder="Introduce la ubicación del evento"
        />
      </div>

      <p className="mb-2 font-[Roboto] text-2xl font-medium">Información adicional</p>
      <div className="flex-1 md:flex md:space-x-4">
        <label className="w-35 text-end text-sm font-medium text-gray-800">
          Descripción <span className="text-red-500">*</span>
        </label>
        <div className="w-full pl-4 md:ml-0">
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={`flex h-28 w-full border p-2 text-[16px] placeholder:text-[#ACACAC] focus:ring-2 focus:outline-none lg:rounded-[20px] lg:text-[22px]`}
            placeholder="Describe un poco más tu evento para atraer al público"
          />
          {formErrors.description && (
            <p className="mt-1 text-sm text-red-600">{formErrors.description}</p>
          )}
        </div>
      </div>

      <div className="flex justify-center space-x-4 md:justify-end">
        <button
          type="submit"
          className="button-primary h-[63px] w-[155px] px-6 py-2.5 md:w-[316px]"
        >
          Guardar y continuar
        </button>
        <button
          type="button"
          className="button-secondary h-[63px] w-[155px] px-6 py-2.5 md:w-[316px]"
          onClick={() => navigate(-1)}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
