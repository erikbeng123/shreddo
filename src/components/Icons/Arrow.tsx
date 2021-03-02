import React from "react";

export enum Directions {
  left = 0,
  right = 180,
  up = -90,
  down = 90,
}

export const Arrow = ({
  direction = Directions.left,
  fill = "white",
}: {
  direction?: Directions;
  fill?: string;
}) => {
  return (
    <svg
      width="30"
      height="34"
      viewBox="0 0 30 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: `rotateZ(${direction}deg)` }}
    >
      <path
        d="M28.6733 16.4555C29.3367 16.846 29.3287 17.8082 28.6588 18.1875L1.52927 33.5495C0.85941 33.9288 0.0301305 33.4407 0.0365733 32.6709L0.297504 1.49509C0.303946 0.725314 1.14128 0.251177 1.8047 0.641644L28.6733 16.4555Z"
        fill={fill}
      />
    </svg>
  );
};
