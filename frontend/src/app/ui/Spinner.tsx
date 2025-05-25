import { SVGProps } from "react";

export function Spinner(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 100" style={{ rotate: "293deg" }} {...props}>
      <g transform="rotate(-1 50 50)">
        <path
          fill="#D9D9D9"
          d="M31.6,3.5C5.9,13.6-6.6,42.7,3.5,68.4c10.1,25.7,39.2,38.3,64.9,28.1l-3.1-7.9c-21.3,8.4-45.4-2-53.8-23.3
        c-8.4-21.3,2-45.4,23.3-53.8L31.6,3.5z"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            dur="1.25s"
            from="0 50 50"
            to="-360 50 50"
            repeatCount="indefinite"
          />
        </path>
      </g>

      <g transform="rotate(91 50 50)">
        <path
          fill="#2D2D2D"
          d="M82,35.7C74.1,18,53.4,10.1,35.7,18S10.1,46.6,18,64.3l7.6-3.4c-6-13.5,0-29.3,13.5-35.3s29.3,0,35.3,13.5
        L82,35.7z"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            dur="1.25s"
            from="0 50 50"
            to="360 50 50"
            repeatCount="indefinite"
          />
        </path>
      </g>

      <g transform="rotate(194 50 50)">
        <path
          fill="#D9D9D9"
          d="M42.3,39.6c5.7-4.3,13.9-3.1,18.1,2.7c4.3,5.7,3.1,13.9-2.7,18.1l4.1,5.5c8.8-6.5,10.6-19,4.1-27.7
        c-6.5-8.8-19-10.6-27.7-4.1L42.3,39.6z"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            dur="1.25s"
            from="0 50 50"
            to="-360 50 50"
            repeatCount="indefinite"
          />
        </path>
      </g>
    </svg>
  );
}
