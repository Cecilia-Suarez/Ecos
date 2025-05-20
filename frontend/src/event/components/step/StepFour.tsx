import { useState } from "react";
import type { FormData as FormDataType } from "@/event/type/FormData";
import { useApiMutation } from "@/shared/hooks/use-api-mutation";
import { toast } from "sonner";
import { useRequiredUser } from "@/auth/hooks/use-required-user";
import { useNavigate } from "react-router";
import CalendarIcon from "../ui/CalendarIcon";
import ClockIcon from "../ui/ClockIcon";
import LocationIcon from "../ui/LocationIcon";
import TicketIcon from "../ui/TicketIcon";
import { CalendarButton } from "../ui/CalendarButton";

interface StepFourProps {
  prevStep: () => void;
  formData: FormDataType;
}

export default function StepFour({ prevStep, formData }: StepFourProps) {
  const user = useRequiredUser();
  const userId = user.id;

  const navigate = useNavigate();

  function formatDateToDDMMYYYY(dateString: string): string {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  }

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

    const formattedDate = formatDateToDDMMYYYY(formData.dateString);

    const data = new FormData();
    data.append("name", formData.name);
    data.append("category", formData.category);
    data.append("dateString", formattedDate);
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
      onError: () => {
        toast.error("Error al publicar evento");
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
                <LocationIcon className="h-[30px] w-[30px]" />
                <p className="text-2xl font-semibold">Dirección: </p>
                <span>{formData.location}</span>
              </div>
            </div>
            <div className="flex flex-col gap-y-4">
              <h3 className="text-2xl font-bold md:text-[32px]">Información de las entradas</h3>
              <div className="gap-x-1">
                <p className="pl-7 font-semibold">Puntos de venta:</p>
                <div className="flex items-center">
                  <TicketIcon className="h-[30px] w-[30px]" />
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
          className="rounded-[37px] bg-[#FE963D] px-6 py-2 text-white hover:opacity-90"
        >
          Publicar Evento
        </button>
        <button
          type="button"
          onClick={prevStep}
          className="rounded-[37px] bg-[#19233A] px-6 py-2 text-white hover:bg-gray-400"
        >
          Cancelar
        </button>
      </div>
      {error && <p className="mt-4 text-center text-red-500">{error}</p>}
    </form>
  );
}
