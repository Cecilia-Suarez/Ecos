import { ComponentProps } from "react";
import { Donate } from "./ui/Icons";

type HeartButtonProps = ComponentProps<"button"> & {
  children: React.ReactNode;
};

export const DonateButton = ({ children, ...buttonProps }: HeartButtonProps) => {
  return (
    <button type="button" {...buttonProps}>
      <Donate className="size-5 sm:size-8" />
      {children}
    </button>
  );
};
