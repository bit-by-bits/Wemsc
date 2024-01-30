"use client";

import { FC, useState } from "react";
import { Image } from "@nextui-org/react";
import { HomeCardProps } from "./Interfaces";
import useImageLoader from "@/utils/useImage";
import LikeButton from "../Button/LikeButton";

const HomeCard: FC<HomeCardProps> = ({ item }) => {
  const image = useImageLoader(item) || "/placeholder.png";

  const [show, setShow] = useState(false);

  return (
    <div
      className="relative group flex flex-col w-full h-full hover:bg-gray-900 p-2 rounded cursor-pointer"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <Image
        className="h-[200px] w-full"
        src={image}
        alt={item.label}
        radius="sm"
        removeWrapper
      />
      <div className="flex flex-row justify-between items-center w-full">
        <div className="flex flex-col items-center">
          <span className="ml-2 text-white mt-2">{item.label}</span>
          <span className="ml-2 text-xs">{item.author}</span>
        </div>
        <LikeButton songID={item.id} show={show} />
      </div>
    </div>
  );
};

export default HomeCard;
