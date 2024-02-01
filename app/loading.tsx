"use client";

import React from "react";

const Loading = () => {
  return (
    <div className="h-full w-full flex items-center justify-center text-center">
      <div className="relative w-max h-max ">
        <svg id="loader" width="60" height="60" viewBox="-3 -4 39 39">
          <polygon
            fill="transparent"
            stroke="white"
            strokeWidth="1"
            points="16,0 32,32 0,32"
          />
        </svg>
      </div>
    </div>
  );
};

export default Loading;
