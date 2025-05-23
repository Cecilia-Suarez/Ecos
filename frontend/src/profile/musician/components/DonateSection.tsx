import { Donate } from "@/profile/components/ui/Donate";

interface DonateSectionProps {
  handleDonationModal: () => void;
}

export const DonateSection = ({ handleDonationModal }: DonateSectionProps) => {
  return (
    <div className="mb-9 flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <Donate />
        <h3 className="text-2xl">Dona</h3>
        <small className="text-[11px]">Cada aporte es un acorde nuevo.</small>
        <p className="text-sm">Ayudanos a crear más canciones como esta.</p>
      </div>
      <button
        type="button"
        onClick={handleDonationModal}
        className="bg-ecos-orange-light text-ecos-blue h-10 w-[298px] cursor-pointer rounded-full px-6 py-2.5 text-sm font-medium uppercase"
      >
        Donar
      </button>
    </div>
  );
};
