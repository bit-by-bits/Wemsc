"use client";

import { FC, useState } from "react";
import { Image, Skeleton } from "@nextui-org/react";
import { HomeCardProps } from "./Interfaces";
import { useImageLoader } from "@/utils/useSongMeta";
import LikeButton from "../Button/LikeButton";
import PlayButton from "../Button/PlayButton";

const HomeCard: FC<HomeCardProps> = ({ item, onPlay }) => {
  const [show, setShow] = useState(false);
  const image = useImageLoader(item) || "/placeholder.png";

  return (
    <div
      className="relative group flex flex-col w-full h-full hover:bg-gray-900 p-2 rounded"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <Skeleton className="w-full" isLoaded={!!image}>
        <Image
          className="h-[200px] w-full"
          src={image}
          alt={item.label}
          radius="sm"
          removeWrapper
        />
      </Skeleton>
      <div className="flex flex-row justify-between items-center w-full">
        <div className="flex flex-col mt-2">
          <span className="ml-2 text-white">{item.label}</span>
          <span className="ml-2 text-xs">{item.author}</span>
        </div>
        <div className="flex flex-row items-center gap-2">
          <LikeButton songID={item.id} show={show} />
          <PlayButton onPlay={() => onPlay(item.id)} show={show} />
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
