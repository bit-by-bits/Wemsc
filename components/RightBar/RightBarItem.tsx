import { Avatar } from "@nextui-org/react";
import { FC } from "react";

const RightBarItem: FC<RightBarItemProps> = ({ item }) => {
  return (
    <div className="flex flex-row justify-between items-center cursor-pointer hover:bg-gray-900 rounded-lg p-2 w-full">
      <div className="flex flex-row items-center gap-2">
        <Avatar radius="sm" src={item.img} alt={item.main} />
        <div className="flex flex-col">
          <span className="text-white text-sm">{item.main}</span>
          <span className="text-xs">{item.left}</span>
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-xs"> {item.right}</span>
      </div>
    </div>
  );
};

export default RightBarItem;
