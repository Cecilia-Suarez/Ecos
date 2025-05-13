import OptionsRegisterCards from "@/shared/components/Cards/OptionsRegisterCards";
import iconoM from "@/assets/iconoM.svg";
import iconoF from "@/assets/iconoF.svg";
import iconoE from "@/assets/iconoE.svg";

import womenDj from "@/assets/womenDj.webp";
import celuFestival from "@/assets/celuFestival.webp";
import chicaAtractiva from "@/assets/chicaAtractiva.webp";

export default function OptionsRegister() {
  const cardsData = [
    {
      id: "musicos",
      icono: iconoM,
      option: "MÚSICOS",
      description: "**Artistas independientes y emergentes**",
      imageSrc: womenDj,
      title: "Conquista tu escena musical",
      parrafo2: "Plataforma diseñada para impulsar tu carrera.",
      parrafo: "Promociona tu música, encuentra oportunidades y conecta con tu audiencia.",
      buttonText: "Regístrate",
    },
    {
      id: "fan",
      icono: iconoF,
      option: "FAN",
      description: "**Descubre, Escucha y Sigue a tus Músicos Favoritos**",
      imageSrc: chicaAtractiva,
      title: "Busca nuevas Opciones de Música",
      parrafo2: "Conecta con músicos ideales según tus gustos.",
      parrafo: "Encuentra talentos y llena tus espacios con la mejor música.",
      buttonText: "Regístrate",
    },
    {
      id: "eventos",
      icono: iconoE,
      option: "PRÓXIMOS EVENTOS",
      description: "No te pierdas lo que viene",
      imageSrc: celuFestival,
      title: "La fiesta comienza !!",
      parrafo2:
        "Conciertos Únicos: Artistas independientes y emergentes creando magia musical      en vivo.",
      parrafo: "La música no espera, ¡Únete ya!.",
      buttonText: "Explorar",
    },
  ];

  return (
    <div className="mx-auto mt-12 w-auto text-center">
      <div className="mx-12 w-5/6 text-start text-3xl text-[#19233A] md:mx-24 md:w-158 lg:ms-36 lg:mt-32">
        <h2 className="text-4xl font-normal md:text-[40px]">
          Conectamos músicos, fans y eventos en una sola plataforma
        </h2>
        <h2 className="mt-12 text-[32px] font-bold md:text-[40px]">¡Empieza!</h2>
      </div>
      <div className="mt-32 flex w-full flex-col gap-6 lg:flex-row lg:px-12">
        {cardsData.map((data) => (
          <OptionsRegisterCards key={data.id} {...data} />
        ))}
      </div>
    </div>
  );
}
