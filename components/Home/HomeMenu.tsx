"use client";

import { FC } from "react";
import HomeCard from "./HomeCard";
import Link from "next/link";
import { HomeMenuProps } from "./Interfaces";
import usePlay from "../Player/PlayerUtils/usePlay";

const HomeMenu: FC<HomeMenuProps> = ({ label, href, items }) => {
  const play = usePlay(items);

  return (
    <div
      key={label}
      className="flex flex-col items-start justify-center w-full my-4"
    >
      <div className="flex flex-row justify-between items-center w-full mb-4">
        <span className="text-white font-semibold text-xl">{label}</span>
        {href && (
          <Link
            href={href}
            className="text-sm hover:text-white hover:underline"
          >
            See All
          </Link>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 gap-x-6">
        {items?.map((e, i) => <HomeCard key={i} item={e} onPlay={play} />)}
      </div>
    </div>
  );
};
export default HomeMenu;
