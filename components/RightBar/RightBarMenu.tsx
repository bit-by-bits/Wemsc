import { FC } from "react";
import LeftBarItem from "./RightBarItem";
import Link from "next/link";
import { RightBarMenuProps } from "./Interfaces";

const RightBarMenu: FC<RightBarMenuProps> = ({ label, href, items }) => (
  <div
    key={label}
    className="flex flex-col items-start justify-center w-full my-2"
  >
    <div className="flex flex-row justify-between items-center w-full mb-2">
      <span className="text-white font-semibold">{label}</span>
      <Link href={href} className="text-sm hover:text-white hover:underline">
        See All
      </Link>
    </div>
    {items?.map((e, i) => <LeftBarItem key={i} item={e} />)}
  </div>
);

export default RightBarMenu;
