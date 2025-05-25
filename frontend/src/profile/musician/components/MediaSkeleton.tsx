import { UploadCloud } from "@/profile/components/ui/Icons";
import { ComponentProps } from "react";

type MediaSkeletonProps = ComponentProps<"div"> & {
  message: string;
};

export const MediaSkeleton = ({ message, ...props }: MediaSkeletonProps) => {
  return (
    <div {...props}>
      <UploadCloud className="size-20 transition-transform group-hover:scale-110 sm:size-36" />
      <p className="transition-transform group-hover:scale-110">{message}</p>
    </div>
  );
};
