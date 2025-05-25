import { useRef, useState } from "react";
import { FormData } from "@/event/type/FormData";
import { z, ZodError } from "zod";
import { UploadCloud } from "@/profile/components/ui/Icons";
import { toast } from "sonner";

interface StepTwoProps {
  nextStep: () => void;
  prevStep: () => void;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const imagenSchema = z.object({
  image: z.any().refine(
    async (file) => {
      if (!file) return true;
      if (!(file instanceof File)) return false;
      const objectUrl = URL.createObjectURL(file);
      return await new Promise<boolean>((resolve) => {
        const img = new Image();
        img.onload = () => {
          const isValid = img.width >= 1170 && img.height >= 504;
          URL.revokeObjectURL(objectUrl);
          resolve(isValid);
        };
        img.onerror = () => {
          URL.revokeObjectURL(objectUrl);
          resolve(false);
        };
        img.src = objectUrl;
      });
    },
    {
      message:
        "La imagen debe ser un archivo válido y tener al menos 1170 píxeles de ancho y 504 de alto",
    },
  ),
});

export default function StepTwo({ nextStep, prevStep, setFormData }: StepTwoProps) {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFormData((prev) => ({ ...prev, image: selectedFile }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
    setFormData((prev) => ({ ...prev, image: droppedFile }));
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result as string);
    };
    reader.readAsDataURL(droppedFile);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };

  const handleSubmit = () => {
    toast.success("Imagen cargada correctamente");
  };

  const handleDelete = () => {
    setFile(null);
    setImageUrl(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setFormData((prev) => ({ ...prev, image: null }));
  };

  const handleNext = async () => {
    try {
      await imagenSchema.parseAsync({ image: file });
      nextStep();
    } catch (error) {
      if (error instanceof ZodError) {
        setError(error.errors[0].message);
      } else {
        setError("Ocurrió un error inesperado");
      }
    }
  };

  return (
    <div className="mb-20 h-full w-full flex-1 space-y-10 md:mx-auto md:max-w-7xl md:p-6 lg:space-y-25">
      <section className="border[#19233A] flex h-[604px] w-[364px] flex-col items-center justify-center gap-y-9 rounded-3xl border md:w-[801px]">
        <label
          htmlFor="fileInput"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className={`flex h-[390px] w-[327px] cursor-pointer flex-col items-center justify-center rounded-lg md:w-[686px] ${file ? "" : "border-2 border-dashed"} border-gray-400 px-4 py-8 text-center`}
        >
          {imageUrl ? (
            <img src={imageUrl} alt="Banner" className="w-full rounded-lg object-cover" />
          ) : (
            <>
              <UploadCloud className="mb-4" />
              <p className="text-lg font-semibold">Subí tu imagen aquí</p>
              <p className="mt-2 text-sm text-gray-600">
                <span className="block sm:hidden">formatos jpg.....</span>
                <span className="hidden sm:block">
                  La imagen debe tener al menos 1170 píxeles de ancho y 504 de alto <br />
                  Formatos válidos: JPG, GIF, PNG.
                </span>
              </p>
              <span className="my-2 font-bold text-gray-500">o</span>
              <div className="rounded-full bg-[#19233A] px-6 py-2 text-sm font-semibold text-white">
                BUSCAR ARCHIVO
              </div>
            </>
          )}
          <input
            id="fileInput"
            type="file"
            accept="image/jpeg, image/png, image/gif"
            onChange={handleChange}
            ref={inputRef}
            className="hidden"
          />
        </label>
        {error && <p className="mt-2 text-sm font-medium text-red-500">{error}</p>}

        <div className="flex gap-4">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!file}
            className="rounded-full bg-[#FE963D] px-6 py-2 font-semibold text-white hover:bg-purple-800"
          >
            Guardar
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={!file}
            className="rounded-full bg-[#19233A] px-6 py-2 font-semibold text-white hover:bg-gray-400"
          >
            Eliminar
          </button>
        </div>
      </section>
      <div className="flex justify-center space-x-4 lg:justify-end">
        <button
          type="submit"
          onClick={handleNext}
          className="rounded-[37px] bg-[#FE963D] px-6 py-2 text-white hover:opacity-90"
        >
          Guardar y continuar
        </button>
        <button
          type="button"
          onClick={prevStep}
          className="rounded-[37px] bg-[#19233A] px-6 py-2 text-white hover:bg-gray-400"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
