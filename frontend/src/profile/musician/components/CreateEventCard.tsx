import { Link } from "react-router";
import { CalendarPlus } from "../../components/ui/Icons";

export default function CreateEventoCard() {
  return (
    <div className="max-w-md rounded-xl bg-[#F2F2F2] p-6">
      <h2 className="text-2xl font-semibold text-gray-800">Crear un evento en Ecos</h2>
      <p className="mt-2 text-gray-600">
        ¿Tienes un evento, show o actividad? Cargá tu evento, gestioná todo en un solo lugar y ganá
        visibilidad.
      </p>
      <div className="mt-4">
        <Link
          to="/event"
          className="bg-ecos-blue inline-flex items-center gap-2 rounded-md px-4 py-2 text-white"
        >
          <CalendarPlus className="h-5 w-5 fill-white" />
          Crear evento
        </Link>
      </div>
    </div>
  );
}
