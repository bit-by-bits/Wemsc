"use client";

import { FC } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { TopBarButtons } from "./Interfaces";

const TopBarButtons: FC = () => {
  const router = useRouter();

  const buttons: TopBarButtons[] = [
    {
      icon: <FaChevronLeft className="text-2xl" />,
      click: () => router.back(),
    },
    {
      icon: <FaChevronRight className="text-2xl" />,
      click: () => router.forward(),
    },
  ];

  return (
    <div className="flex gap-2 items-center justify-center">
      {buttons.map((e, i) => (
        <button
          key={i}
          onClick={e.click}
          className="cursor-pointer hover:text-white transition-all"
        >
          {e.icon}
        </button>
      ))}
    </div>
  );
};

export default TopBarButtons;
