import React from "react";

const B2 = () => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="100" height="100" fill="#F5F5F5" />
      <g id="B2" clip-path="url(#clip0_0_1)">
        <rect width="100" height="100" fill="white" />
        <rect id="station" x="37" y="37" width="26" height="26" fill="black" />
        <g id="road">
          <g id="Rectangle 3">
            <mask id="path-2-inside-1_0_1" fill="white">
              <path d="M37 60L0 60V40H37V60Z" />
            </mask>
            <path d="M37 60L0 60V40H37V60Z" fill="white" />
            <path
              d="M37 58L0 58V62L37 62V58ZM0 42H37V38H0V42Z"
              fill="black"
              mask="url(#path-2-inside-1_0_1)"
            />
          </g>
          <rect
            id="Rectangle 4"
            x="4"
            y="51"
            width="2"
            height="9"
            transform="rotate(-90 4 51)"
            fill="black"
          />
          <rect
            id="Rectangle 5"
            x="18"
            y="51"
            width="2"
            height="9"
            transform="rotate(-90 18 51)"
            fill="black"
          />
          <rect
            id="Rectangle 6"
            x="32"
            y="51"
            width="2"
            height="9"
            transform="rotate(-90 32 51)"
            fill="black"
          />
        </g>
        <g id="trail">
          <path id="Vector 2" d="M40 6L60 6" stroke="black" strokeWidth="2" />
          <path id="Vector 3" d="M40 18H60" stroke="black" strokeWidth="2" />
          <path id="Vector 4" d="M40 30H60" stroke="black" strokeWidth="2" />
          <rect id="Rectangle 4_2" x="49" width="2" height="37" fill="black" />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_0_1">
          <rect width="100" height="100" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default B2;