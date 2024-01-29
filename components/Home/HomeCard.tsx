import { FC } from "react";
import { Image } from "@nextui-org/react";

const HomeCard: FC<HomeCardProps> = ({ item }) => {
  return (
    <div className="flex flex-col w-full h-full">
      <Image src={item.image} alt={item.title} radius="sm" />
      <span className="text-white mt-2">{item.title}</span>
      <span className="text-xs">{item.description}</span>
    </div>
  );
};

export default HomeCard;
