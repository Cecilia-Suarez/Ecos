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
      description: "Artistas independientes y emergentes",
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
      description: "Descubre, Escucha y Sigue a tus Músicos Favoritos",
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
    <div className="mt-36 ml-36 flex flex-col justify-around gap-11 p-4 text-center lg:mt-[156px] lg:px-12">
      <div className="max-w-[634px] space-y-8 text-start text-3xl text-[#19233A] md:text-[40px]">
        <h2 className="font-normal">Conectamos músicos, fans y eventos en una sola plataforma</h2>
        <h2 className="font-bold">¡Empieza!</h2>
      </div>
      <div className="flex w-full flex-col gap-6 lg:flex-row">
        {cardsData.map((data) => (
          <OptionsRegisterCards key={data.id} {...data} />
        ))}
      </div>
    </div>
  );
}
