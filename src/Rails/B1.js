import React from "react";

const B1 = () => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="100" height="100" fill="#F5F5F5" />
      <g id="B1">
        <rect
          width="100"
          height="100"
          transform="matrix(0 -1 1 0 0 100)"
          fill="white"
        />
        <rect
          id="station"
          x="37"
          y="63"
          width="26"
          height="26"
          transform="rotate(-90 37 63)"
          fill="black"
        />
        <g id="road">
          <g id="Rectangle 3">
            <mask id="path-2-inside-1_0_1" fill="white">
              <path d="M60 63L60 100H40L40 63L60 63Z" />
            </mask>
            <path d="M60 63L60 100H40L40 63L60 63Z" fill="white" />
            <path
              d="M58 63L58 100H62L62 63H58ZM42 100L42 63L38 63L38 100H42Z"
              fill="black"
              mask="url(#path-2-inside-1_0_1)"
            />
          </g>
          <rect
            id="Rectangle 4"
            x="51"
            y="96"
            width="2"
            height="9"
            transform="rotate(-180 51 96)"
            fill="black"
          />
          <rect
            id="Rectangle 5"
            x="51"
            y="82"
            width="2"
            height="9"
            transform="rotate(-180 51 82)"
            fill="black"
          />
          <rect
            id="Rectangle 6"
            x="51"
            y="68"
            width="2"
            height="9"
            transform="rotate(-180 51 68)"
            fill="black"
          />
        </g>
        <g id="trail">
          <path
            id="Vector 2"
            d="M60 31L40 31"
            stroke="black"
            strokeWidth="2"
          />
          <path
            id="Vector 3"
            d="M60 19L40 19"
            stroke="black"
            strokeWidth="2"
          />
          <path id="Vector 4" d="M60 7L40 7" stroke="black" strokeWidth="2" />
          <rect
            id="Rectangle 4_2"
            x="51"
            y="37"
            width="2"
            height="37"
            transform="rotate(-180 51 37)"
            fill="black"
          />
        </g>
      </g>
    </svg>
  );
};

export default B1;
