import { SVGProps } from "react";

const HamburguerMenuIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      className="m-2"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path d="M3 18V16H21V18H3ZM3 13V11H21V13H3ZM3 8V6H21V8H3Z" fill="#19233A" />
    </svg>
  );
};

export default HamburguerMenuIcon;
