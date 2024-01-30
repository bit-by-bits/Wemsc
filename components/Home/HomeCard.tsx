"use client";

import { FC } from "react";
import { Image } from "@nextui-org/react";
import { HomeCardProps } from "./Interfaces";
import useImageLoader from "@/utils/useImage";

const HomeCard: FC<HomeCardProps> = ({ item }) => {
  const image = useImageLoader(item) || "/placeholder.png";

  return (
    <div className="flex flex-col w-full h-full hover:bg-gray-900 p-2 rounded cursor-pointer">
      <Image
        className="h-[200px] w-full"
        src={image}
        alt={item.label}
        radius="sm"
        removeWrapper
      />
      <span className="ml-2 text-white mt-2">{item.label}</span>
      <span className="ml-2 text-xs">{item.author}</span>
    </div>
  );
};

export default HomeCard;
