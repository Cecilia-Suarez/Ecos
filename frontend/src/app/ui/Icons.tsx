import { SVGProps } from "react";

export const BackArrow = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" {...props}>
      <path
        d="M28.4435 50.6668L10.6657 32.0002M10.6657 32.0002L28.4435 13.3335M10.6657 32.0002L53.3324 32.0002"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const PauseIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="bg-ecos-orange h-12 w-12 rounded-full border-4 border-white stroke-white p-2"
      {...props}
    >
      <rect x="14" y="4" width="4" height="16" rx="1" />
      <rect x="6" y="4" width="4" height="16" rx="1" />
    </svg>
  );
};

export const PlayIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="bg-ecos-orange h-12 w-12 rounded-full border-4 border-white p-2"
    {...props}
  >
    <polygon points="6,4 20,12 6,20" fill="ecos-orange" stroke="white" strokeWidth="2" />
  </svg>
);
