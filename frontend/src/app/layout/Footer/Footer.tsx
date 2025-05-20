import { InstagramIcon } from "@/app/ui/InstagramIcon";
import { LinkedInIcon } from "@/app/ui/LinkedInIcon";
import { Link } from "react-router";
import Logo from "@/assets/EcosLogoFooter.webp";

export const Footer = () => {
  return (
    <footer className="bg-ecos-base mt-36 flex w-full flex-col pt-24">
      <div className="flex flex-col justify-center lg:flex-row lg:justify-around">
        <Link to="/">
          <img
            src={Logo}
            alt="Logo de Ecos"
            className="mx-auto mb-12 h-auto w-full max-w-[300px] sm:max-w-[380px]"
          />
        </Link>
        <div className="mb-12 flex flex-col items-center gap-6">
          <h3 className="text-4xl font-semibold">Seguinos</h3>
          <div className="flex gap-5">
            <a href="https://www.linkedin.com/" title="linkedin">
              <LinkedInIcon className="size-10" />
            </a>
            <a href="https://www.instagram.com/" title="instagram">
              <InstagramIcon className="size-10" />
            </a>
          </div>
        </div>
      </div>
      <span className="mb-6 text-center sm:mt-24">
        Copyright © 2025 ECOS - Todos los derechos reservados.
      </span>
    </footer>
  );
};
