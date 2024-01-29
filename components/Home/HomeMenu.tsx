import { FC } from "react";
import HomeCard from "./HomeCard";
import Link from "next/link";

const HomeMenu: FC<HomeMenuProps> = ({ label, href, items }) => (
  <div
    key={label}
    className="flex flex-col items-start justify-center w-full my-4"
  >
    <div className="flex flex-row justify-between items-center w-full mb-4">
      <span className="text-white font-semibold text-xl">{label}</span>
      <Link href={href} className="text-sm hover:text-white hover:underline">
        See All
      </Link>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
      {items.map((e, i) => (
        <HomeCard key={i} item={e} />
      ))}
    </div>
  </div>
);

export default HomeMenu;
