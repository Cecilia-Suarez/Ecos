import { SVGProps } from "react";

interface AvatarProps extends SVGProps<SVGSVGElement> {
  bgColor?: string;
  detailColor?: string;
}

export const Avatar = ({ bgColor = "#FFFFFF", detailColor = "#19233A", ...props }: AvatarProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="65"
    height="65"
    viewBox="0 0 89 89"
    fill="none"
    {...props}
  >
    <rect width="89" height="89" rx="44.5" fill={bgColor} />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M57.8503 35.6C57.8503 42.973 51.8733 48.95 44.5003 48.95C37.1273 48.95 31.1503 42.973 31.1503 35.6C31.1503 28.227 37.1273 22.25 44.5003 22.25C51.8733 22.25 57.8503 28.227 57.8503 35.6ZM53.4003 35.6C53.4003 40.5153 49.4156 44.5 44.5003 44.5C39.585 44.5 35.6003 40.5153 35.6003 35.6C35.6003 30.6847 39.585 26.7 44.5003 26.7C49.4156 26.7 53.4003 30.6847 53.4003 35.6Z"
      fill={detailColor}
    />
    <path
      d="M44.5003 55.625C30.0948 55.625 17.8209 64.1432 13.1455 76.0773C14.2845 77.2083 15.4843 78.2781 16.7396 79.2813C20.2212 68.3246 31.143 60.075 44.5003 60.075C57.8576 60.075 68.7795 68.3246 72.261 79.2814C73.5163 78.2781 74.7161 77.2083 75.8551 76.0773C71.1797 64.1432 58.9058 55.625 44.5003 55.625Z"
      fill={detailColor}
    />
  </svg>
);
