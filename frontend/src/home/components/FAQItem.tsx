import { ArrowUpIcon } from "./ui/Icons";
import { useState } from "react";

const FAQItemList = [
  {
    id: 1,
    question: "¿Cómo puedo promocionar mi música en esta plataforma?",
    answer:
      "Sube tus canciones, completa tu perfil con biografía y fotos, usa etiquetas (#género #ubicación) y participa en playlists destacadas.",
  },
  {
    id: 2,
    question: "¿Puedo recibir donaciones de mis fans?",
    answer:
      "Sí, activa la opción 'Donaciones' en tu perfil. Los fans pueden apoyarte económicamente y tú recibes el 100% (menos comisión de la plataforma).",
  },
  {
    id: 3,
    question: "¿Cómo contrato a un artista para mi evento?",
    answer:
      "Busca artistas por género o ubicación, revisa sus perfiles y envía una solicitud directa. Si aceptan, podrás gestionar fechas y pagos desde la plataforma.",
  },
  {
    id: 4,
    question: "¿Puedo vender entradas para mi evento aquí?",
    answer:
      "Sí, crea tu evento, configura precios y aforo, y puedes promocionarlo entre los usuarios.",
  },
  {
    id: 5,
    question: "¿Cómo apoyo a mis artistas favoritos?",
    answer:
      "Puedes dar like, compartir su música, asistir a sus eventos y enviar donaciones directas desde su perfil.",
  },
];

const FAQItem = () => {
  const [openItemId, setOpenItemId] = useState<number | null>(null);

  const toggleItem = (id: number) => {
    setOpenItemId((prevId) => (prevId === id ? null : id));
  };

  return (
    <ul className="w-full list-none pr-[0.813rem] md:w-[44.938rem] md:pr-[4.625rem] lg:w-[63.375rem] lg:pr-8">
      {FAQItemList.map(({ id, question, answer }) => {
        const isOpen = openItemId === id;
        return (
          <li key={id} className="border-ecos-blue border-b">
            <div
              className="flex cursor-pointer items-center justify-between py-5"
              onClick={() => {
                toggleItem(id);
              }}
            >
              <h3 className="py-5 text-lg font-bold">{question}</h3>
              <ArrowUpIcon
                className={`h-5 w-5 transition-transform duration-300 ${
                  isOpen ? "rotate-0" : "rotate-180"
                }`}
              />
            </div>
            {isOpen && <p className="pb-6 text-sm">{answer}</p>}
          </li>
        );
      })}
    </ul>
  );
};

export default FAQItem;
