import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const TopBar = () => {
  return (
    <div className="flex flex-row items-center justify-between w-full h-16 mb-4">
      <FaChevronLeft className="text-2xl" />
      <FaChevronRight className="text-2xl" />
      <input
        className="w-1/2 h-10 px-4 rounded-lg bg-gray-700 text-gray-100"
        placeholder="Search..."
      />
      <div className="flex flex-row items-center justify-center w-10 h-10 rounded-lg bg-gray-700">
        <span className="text-xl">A</span>
      </div>
    </div>
  );
};

export default TopBar;
