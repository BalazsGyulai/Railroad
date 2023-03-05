import React from "react";

const Road = () => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="100" height="100" fill="#F5F5F5" />
      <g id="Road">
        <rect width="100" height="100" fill="white" />
        <g id="road">
          <g id="Rectangle 3">
            <mask id="path-1-inside-1_0_1" fill="white">
              <path d="M40 100V63H60V100H40Z" />
            </mask>
            <path d="M40 100V63H60V100H40Z" fill="white" />
            <path
              d="M42 100V63H38V100H42ZM58 63V100H62V63H58Z"
              fill="black"
              mask="url(#path-1-inside-1_0_1)"
            />
          </g>
          <rect
            id="Rectangle 4"
            x="49"
            y="69"
            width="2"
            height="9"
            fill="black"
          />
          <rect
            id="Rectangle 5"
            x="49"
            y="84"
            width="2"
            height="9"
            fill="black"
          />
        </g>
        <g id="road_2">
          <g id="Rectangle 3_2">
            <mask id="path-5-inside-2_0_1" fill="white">
              <path d="M40 26V0H60V26H40Z" />
            </mask>
            <path d="M40 26V0H60V26H40Z" fill="white" />
            <path
              d="M42 26V0H38V26H42ZM58 0V26H62V0H58Z"
              fill="black"
              mask="url(#path-5-inside-2_0_1)"
            />
          </g>
        </g>
        <g id="road_3">
          <g id="Rectangle 3_3">
            <mask id="path-7-inside-3_0_1" fill="white">
              <path d="M40 63V26H60V63H40Z" />
            </mask>
            <path d="M40 63V26H60V63H40Z" fill="white" />
            <path
              d="M42 63V26H38V63H42ZM58 26V63H62V26H58Z"
              fill="black"
              mask="url(#path-7-inside-3_0_1)"
            />
          </g>
          <rect
            id="Rectangle 6"
            x="49"
            y="9"
            width="2"
            height="9"
            fill="black"
          />
          <rect
            id="Rectangle 7"
            x="49"
            y="24"
            width="2"
            height="9"
            fill="black"
          />
          <rect
            id="Rectangle 4_2"
            x="49"
            y="39"
            width="2"
            height="9"
            fill="black"
          />
          <rect
            id="Rectangle 5_2"
            x="49"
            y="54"
            width="2"
            height="9"
            fill="black"
          />
        </g>
      </g>
    </svg>
  );
};

export default Road;
