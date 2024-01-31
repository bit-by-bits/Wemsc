"use client";

import { BounceLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="h-full w-full flex items-center justify-center text-center">
      <BounceLoader color="white" size={40} />
    </div>
  );
};

export default Loading;
