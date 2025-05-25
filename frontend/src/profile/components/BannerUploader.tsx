import { ComponentProps, useRef, useState } from "react";
import { UploadCloud } from "./ui/Icons";

interface BannerUploaderProps extends ComponentProps<"section"> {
  onImageUpload?: (file: File | null, imageUrl: string | null) => void;
  onUpload?: () => void;
  isUploading?: boolean;
}

export default function BannerUploader({
  onImageUpload,
  onUpload,
  isUploading,
  ...sectionProps
}: BannerUploaderProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validateImageDimensions = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const isValid = img.width >= 1170 && img.height >= 504;
        resolve(isValid);
      };
      img.src = URL.createObjectURL(file);
    });
  };

  const handleFile = async (file: File) => {
    setError(null);

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      setError("Formato inválido. Solo se aceptan JPG o PNG.");
      return;
    }

    const isValidSize = await validateImageDimensions(file);
    if (!isValidSize) {
      setError("La imagen debe tener al menos 1170px de ancho y 504px de alto.");
      return;
    }

    const url = URL.createObjectURL(file);
    setImageUrl(url);
    setFile(file);
    onImageUpload?.(file, url);
  };

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const [selectedFile] = event.target.files ?? [];

    if (selectedFile.size > 0) {
      await handleFile(selectedFile);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    const [droppedFile] = event.dataTransfer.files;

    if (droppedFile.size > 0) {
      handleFile(droppedFile);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
  };

  const handleDelete = () => {
    setImageUrl(null);
    setFile(null);
  };

  return (
    <section {...sectionProps}>
      <label
        htmlFor="fileInput"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-lg ${file ? "" : "border-2 border-dashed"} border-gray-400 px-4 py-8 text-center`}
      >
        {imageUrl ? (
          <img src={imageUrl} alt="Banner" className="h-[253px] w-full rounded-lg object-cover" />
        ) : (
          <>
            <UploadCloud className="mb-2" />
            <p className="text-lg font-semibold">Subí tu imagen aquí</p>
            <p className="mt-2 text-sm text-balance text-gray-600">
              La imagen debe tener al menos 1170 píxeles de ancho y 504 de alto
              <br />
              Formatos válidos: JPG o PNG.
            </p>
            <span className="my-2 font-bold text-gray-500">o</span>
            <div className="bg-ecos-blue rounded-full px-20 py-2.5 text-sm font-medium text-white uppercase">
              Buscar archivo
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
      {error && <p className="text-center text-sm text-red-500">{error}</p>}

      {onUpload && (
        <div className="flex gap-4">
          <button
            type="button"
            onClick={onUpload}
            disabled={isUploading}
            className="bg-ecos-orange-light text-ecos-blue cursor-pointer rounded-full px-16 py-2.5 font-medium"
          >
            {isUploading ? "Guardando" : "Guardar"}
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isUploading}
            className="bg-ecos-blue cursor-pointer rounded-full px-16 py-2.5 font-medium text-white"
          >
            Eliminar
          </button>
        </div>
      )}
    </section>
  );
}
