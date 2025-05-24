import { Link } from "react-router";
import logo from "@/assets/logo_V1-1.webp";

const NotFound = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-gray-100 text-center">
      <img src={logo} alt="Logo de Ecos" className="h-auto w-full max-w-[300px] sm:max-w-[380px]" />
      <h1 className="text-ecos-orange text-9xl font-bold">404</h1>
      <p className="mt-4 text-3xl text-gray-700">¡Ups! La página que buscas no existe.</p>
      <Link
        to="/"
        className="hover:bg-ecos-dark-grey-light bg-ecos-orange mt-6 rounded px-4 py-2 text-white"
      >
        🔙 Volver al inicio
      </Link>
    </div>
  );
};

export default NotFound;
