import { FC } from "react";
import Link from "next/link";

const LeftBarItem: FC<LeftBarItemProps> = ({ item, isOpen }) => {
  return (
    <Link
      key={item.label}
      href={item.href}
      className={`flex flex-row items-center justify-start w-full my-1 md:my-0 py-1 gap-2 rounded-lg ${
        item.active ? "text-link-active" : "hover:text-white"
      }`}
    >
      {item.active ? (
        <item.iconFilled
          className={
            isOpen
              ? "hidden lg:block text-xl"
              : "text-xl sm:text-2xl md:text-xl lg:text-2xl w-full"
          }
        />
      ) : (
        <item.iconOutline
          className={
            isOpen
              ? "hidden lg:block text-xl"
              : "text-xl sm:text-2xl md:text-xl lg:text-2xl w-full"
          }
        />
      )}
      {isOpen && <span className="text-sm ml-2 lg:ml-0">{item.label}</span>}
    </Link>
  );
};

export default LeftBarItem;
