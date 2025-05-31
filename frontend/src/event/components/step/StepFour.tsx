import { useState } from "react";
import type { FormData as FormDataType } from "@/event/type/FormData";
import { useApiMutation } from "@/shared/hooks/use-api-mutation";
import { toast } from "sonner";
import { useRequiredUser } from "@/auth/hooks/use-required-user";
import { useNavigate } from "react-router";
import { CalendarIcon, ClockIcon, TicketIcon, LocationIcon } from "../../../app/ui/Icons";
import { CalendarButton } from "../ui/CalendarButton";

interface StepFourProps {
  prevStep: () => void;
  formData: FormDataType;
}

export default function StepFour({ prevStep, formData }: StepFourProps) {
  const user = useRequiredUser();
  const userId = user.id;

  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);

  const { mutate } = useApiMutation<string, FormData>("/events", "POST");

  const handleSubmit = () => {
    if (!userId) {
      toast.error("No se pudo obtener el perfil del músico.");
      return;
    }

    if (formData.tickets.some((ticket) => typeof ticket.price !== "number" || ticket.price <= 0)) {
      toast.error("Precio de tickets inválido");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("category", formData.category);
    data.append("dateString", formData.dateString);
    data.append("startTime", formData.startTime);
    data.append("endTime", formData.endTime);
    data.append("type", formData.type);
    data.append("location", formData.location);
    data.append("description", formData.description);
    data.append("musicianId", userId.toString());
    data.append("active", "true");
    data.append("deleteImage", "false");

    formData.tickets.forEach((ticket, index) => {
      data.append(`tickets[${index.toString()}].location`, ticket.location);
      data.append(`tickets[${index.toString()}].price`, ticket.price.toString());
    });

    if (formData.image) {
      data.append("image", formData.image);
    }

    mutate(data, {
      onSuccess: () => {
        setError(null);
        toast.success(`Tu evento fué públicado con éxito`);
        navigate(`/profile/musician/${user.id}`);
      },
      onError: (error) => {
        toast.error("Error al publicar evento");
        setError("Error al publicar evento: " + error.message);
      },
    });
  };

  return (
    <form className="w-full">
      <p className="mb-4 text-sm font-normal">
        ¡Casi terminamos! Revisa que los datos sean correctos.
      </p>
      <section className="flex p-3 lg:pr-[77px] lg:pl-[23px]">
        <div className="flex flex-col gap-y-10 rounded-[50px] border-3 border-[#19233A] p-3 md:w-[807px] md:p-10 lg:w-full lg:px-[50px] lg:py-[38px]">
          {formData.image && (
            <header className="h-[297px] w-full md:h-[400px] lg:h-[594px]">
              <img
                src={URL.createObjectURL(formData.image)}
                alt="Imagen del evento"
                className="h-full w-full rounded-[50px] object-cover"
              />
            </header>
          )}
          <main className="flex flex-col gap-y-8 lg:gap-y-[80px] lg:pr-[271px]">
            <h2 className="text-center text-4xl font-extrabold md:text-start md:text-5xl">
              {formData.name}
            </h2>
            <div className="flex flex-col gap-y-4">
              <h3 className="text-2xl font-bold md:text-[32px] lg:mb-7">Fecha y Hora</h3>
              <div className="flex items-center gap-x-5">
                <CalendarIcon />
                <p className="text-2xl font-semibold">{formData.dateString}</p>
              </div>
              <div className="flex items-center gap-x-5">
                <ClockIcon />
                <p className="text-2xl font-semibold">{formData.startTime}</p>
              </div>
              <CalendarButton
                title={formData.name}
                description={formData.description}
                location={formData.location}
                start={new Date(`${formData.dateString}T${formData.startTime}`)}
                end={new Date(`${formData.dateString}T${formData.endTime}`)}
              />
            </div>
            <div className="flex flex-col gap-y-4">
              <h3 className="text-2xl font-bold md:text-[32px]">Lugar</h3>
              <div className="flex items-end gap-x-1">
                <LocationIcon />
                <p className="text-2xl font-semibold">Dirección: </p>
                <span className="hidden lg:flex">{formData.location}</span>
              </div>
            </div>
            <div className="flex flex-col gap-y-4">
              <h3 className="text-2xl font-bold md:text-[32px]">Información de las entradas</h3>
              <div className="gap-x-1">
                <p className="pl-9 font-semibold">Puntos de venta:</p>
                <div className="flex items-center gap-2">
                  <TicketIcon />
                  <div>
                    {formData.tickets.map((ticket) => (
                      <div key={ticket.location} className="flex gap-x-4">
                        <p>{ticket.location}</p>
                        <span>$ {ticket.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-y-4">
              <h3 className="text-3xl font-bold">Descripción del Evento</h3>
              <p className="text-lg font-normal">{formData.description}</p>
            </div>
          </main>
        </div>
      </section>
      <div className="mt-6 flex justify-center space-x-4">
        <button
          type="button"
          onClick={handleSubmit}
          className="button-primary h-[63px] w-[155px] px-6 py-2.5 md:w-[316px]"
        >
          Publicar Evento
        </button>
        <button
          type="button"
          onClick={prevStep}
          className="button-secondary h-[63px] w-[155px] px-6 py-2.5 md:w-[316px]"
        >
          Cancelar
        </button>
      </div>
      {error && <p className="mt-4 text-center text-red-500">{error}</p>}
    </form>
  );
}
