import { BackArrow } from "@/app/ui/Icons";
import { useNavigate } from "react-router";

export const BackButtonHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-ecos-blue flex h-full min-h-20 items-center sm:min-h-36">
      <BackArrow
        onClick={() => navigate(-1)}
        className="ml-3.5 cursor-pointer text-white sm:ml-16"
      />
    </header>
  );
};
