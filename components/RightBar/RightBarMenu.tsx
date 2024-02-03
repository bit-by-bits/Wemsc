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
      <Link
        href={href}
        className="text-sm hover:text-white hover:underline hidden lg:block"
      >
        See All
      </Link>
    </div>
    {items?.length === 0 ? (
      <div className="text-sm">No songs found</div>
    ) : (
      items?.slice(0, 3).map((e, i) => <LeftBarItem key={i} item={e} />)
    )}
  </div>
);

export default RightBarMenu;
