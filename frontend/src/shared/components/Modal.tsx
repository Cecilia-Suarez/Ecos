import { PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import { CloseArrow } from "@/auth/components/ui/CloseArrow";

interface ModalProps extends PropsWithChildren {
  onClose: () => void;
  normalText: string;
  highlightedText: string;
}

const portalRoot = document.getElementById("portal-root");

const Modal = ({ onClose, children, normalText, highlightedText }: ModalProps) => {
  if (!portalRoot) return;

  return createPortal(
    <div className="fixed inset-0 grid bg-black/50" onClick={onClose}>
      <div
        className="relative flex h-full max-h-[540px] w-full max-w-[700px] flex-col place-self-center rounded-[30px] bg-white shadow-lg"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <h1 className="flex h-14 w-full items-center justify-center rounded-t-[30px] bg-[#D9D9D9] text-2xl">
          {normalText} &nbsp; <span className="font-bold">{highlightedText}</span>
        </h1>
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 hover:cursor-pointer"
        >
          <CloseArrow />
        </button>
        {children}
      </div>
    </div>,
    portalRoot,
  );
};

export default Modal;
