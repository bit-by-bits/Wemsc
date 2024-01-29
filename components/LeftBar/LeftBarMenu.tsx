import { FC } from "react";
import LeftBarItem from "./LeftBarItem";

const LeftBarMenu: FC<LeftBarMenuProps> = ({ label, items, isOpen }) => (
  <div
    key={label}
    className="flex flex-col items-start justify-center w-full my-2"
  >
    {isOpen && (
      <span className="text-xs mb-2 text-secondary-text">{label}</span>
    )}
    {items.map((e, i) => (
      <LeftBarItem key={i} item={e} isOpen={isOpen} />
    ))}
  </div>
);

export default LeftBarMenu;
