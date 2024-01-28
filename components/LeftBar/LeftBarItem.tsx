import { FC } from "react";
import Link from "next/link";

const LeftBarItem: FC<LeftBarItemProps> = ({ item, isOpen }) => {
  return (
    <Link
      key={item.label}
      href={item.href}
      className={`flex flex-row items-center justify-start w-full py-1 my-1 gap-2 rounded-lg ${
        item.active ? "text-link-active" : "hover:text-white"
      }`}
    >
      {item.active ? (
        <item.iconFilled className={isOpen ? "" : "text-2xl w-full"} />
      ) : (
        <item.iconOutline className={isOpen ? "" : "text-2xl w-full"} />
      )}
      {isOpen && <span className="text-sm">{item.label}</span>}
    </Link>
  );
};

export default LeftBarItem;
