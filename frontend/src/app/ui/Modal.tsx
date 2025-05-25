import { PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import { CloseArrow } from "@/auth/components/ui/icons";

interface ModalProps extends PropsWithChildren {
  onClose: () => void;
  firstNormalText?: string;
  highlightedText?: string;
  secondNormalText?: string;
  className?: string;
}

const portalRoot = document.getElementById("portal-root");

const Modal = ({
  onClose,
  children,
  firstNormalText,
  highlightedText,
  secondNormalText,
  className = "",
}: ModalProps) => {
  if (!portalRoot) return;

  return createPortal(
    <div className="fixed inset-0 z-101 grid bg-black/50" onClick={onClose}>
      <div
        className={`relative flex flex-col place-self-center rounded-[30px] bg-white shadow-lg ${className}`}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div className="h-fit w-full">
          <h1 className="bg-ecos-blue flex w-full flex-wrap items-center justify-center overflow-hidden rounded-t-[30px] px-4 py-4 text-center text-2xl text-white md:h-14">
            {firstNormalText} &nbsp; <span className="font-bold">{highlightedText}</span> &nbsp;
            {secondNormalText}
          </h1>
          <button
            type="button"
            title="CloseArrow"
            onClick={onClose}
            className="absolute top-2 right-2 hover:cursor-pointer"
          >
            <CloseArrow fill="white" />
          </button>
        </div>

        {children}
      </div>
    </div>,
    portalRoot,
  );
};

export default Modal;
