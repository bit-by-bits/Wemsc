import { Avatar, Skeleton } from "@nextui-org/react";
import { FC } from "react";
import { RightBarItemProps } from "./Interfaces";
import { useImageLoader } from "@/utils/useSongMeta";
import { convertTime } from "@/utils/useTime";

const RightBarItem: FC<RightBarItemProps> = ({ item }) => {
  const last = convertTime(item.uploaded);
  const image = useImageLoader(item) || "/placeholder.png";

  return (
    <div className="flex flex-row justify-between items-center cursor-pointer hover:bg-gray-900 rounded-lg p-2 w-full">
      <div className="flex flex-row items-center gap-2">
        <Skeleton isLoaded={!!image}>
          <Avatar radius="sm" src={image} alt={item.label} />
        </Skeleton>
        <div className="flex flex-col">
          <span className="text-white text-sm">{item.label}</span>
          <span className="text-xs">{item.author}</span>
        </div>
      </div>
      <div className="flex flex-col">
        <Skeleton isLoaded={!!last}>
          <span className="text-xs">{last}</span>
        </Skeleton>
      </div>
    </div>
  );
};

export default RightBarItem;
