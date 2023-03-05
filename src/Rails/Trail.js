import React from "react";

const Trail = () => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="100" height="100" fill="#F5F5F5" />
      <g id="trail">
        <rect width="100" height="100" fill="white" />
        <g id="trail_2">
          <path id="Vector 2" d="M40 69H60" stroke="black" stroke-width="2" />
          <path id="Vector 3" d="M40 81H60" stroke="black" stroke-width="2" />
          <path id="Vector 4" d="M40 93H60" stroke="black" stroke-width="2" />
          <rect
            id="Rectangle 4"
            x="49"
            y="63"
            width="2"
            height="37"
            fill="black"
          />
        </g>
        <g id="trail_3">
          <path id="Vector 2_2" d="M40 32H60" stroke="black" stroke-width="2" />
          <path id="Vector 3_2" d="M40 44H60" stroke="black" stroke-width="2" />
          <path id="Vector 4_2" d="M40 56H60" stroke="black" stroke-width="2" />
          <rect
            id="Rectangle 4_2"
            x="49"
            y="26"
            width="2"
            height="37"
            fill="black"
          />
        </g>
        <g id="trail_4">
          <path
            id="Vector 3_3"
            d="M40 7L60 7"
            stroke="black"
            stroke-width="2"
          />
          <path id="Vector 4_3" d="M40 19H60" stroke="black" stroke-width="2" />
          <rect id="Rectangle 4_3" x="49" width="2" height="26" fill="black" />
        </g>
      </g>
    </svg>
  );
};

export default Trail;
