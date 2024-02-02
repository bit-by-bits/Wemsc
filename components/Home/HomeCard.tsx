"use client";

import { FC, useState } from "react";
import { Image } from "@nextui-org/react";
import { HomeCardProps } from "./Interfaces";
import { useImageLoader } from "@/utils/useSongMeta";
import LikeButton from "../Button/LikeButton";
import PlayButton from "../Button/PlayButton";
import { useRouter } from "next/navigation";
import urls from "@/URL";
import usePlayer from "../Player/PlayerUtils/usePlayer";

const HomeCard: FC<HomeCardProps> = ({ item, onPlay }) => {
  const router = useRouter();
  const [show, setShow] = useState(false);

  const { activeID } = usePlayer();
  const curr = activeID === item.id;
  const image = useImageLoader(item) || "/placeholder.png";

  const onMore = () => router.push(`${urls.SONG}/${item.id}`);

  return (
    <div
      className="relative group flex flex-col w-full h-full hover:bg-gray-900 p-2 rounded"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <Image
        className="h-[150px] xl:h-[200px] 2xl:h-[250px] w-full bg-black"
        src={image}
        alt={item.label}
        radius="sm"
        removeWrapper
      />
      <div className="flex flex-row justify-between items-center w-full">
        <div className="flex flex-col mt-2">
          <span
            className="ml-2 text-white hover:underline cursor-pointer"
            onClick={onMore}
          >
            {item.label}
          </span>
          <span className="ml-2 text-xs">{item.author}</span>
        </div>
        <div className="flex flex-row items-center gap-2">
          <LikeButton songID={item.id} show={show} />
          <PlayButton
            onPlay={() => onPlay(item.id)}
            mode={curr ? 1 : show ? 2 : 0}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
