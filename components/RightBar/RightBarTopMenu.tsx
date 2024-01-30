import React, { FC, useState, useEffect, useRef } from "react";
import useAuth from "../Modal/ModalUtils/useAuth";
import { FaAngleDown } from "react-icons/fa6";

const RightBarTopMenu: FC = () => {
  const menuRef = useRef<HTMLDivElement>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const items: string[] = [];

  return (
    <div className="relative" ref={menuRef}>
      <FaAngleDown
        onClick={toggleMenu}
        className="cursor-pointer hover:text-white"
      />
      {isMenuOpen && (
        <div className="bg-black text-white absolute top-10 right-0 flex flex-col rounded p-1 max-h-[200px] overflow-y-auto scrollbar-hide max-w-[200px] min-w-[150px]">
          {items.length === 0 ? (
            <div className="p-2 text-center">No items</div>
          ) : (
            items.map((e, i) => (
              <div
                key={i}
                className="p-2 border-b border-primary-text overflow-hidden whitespace-nowrap overflow-ellipsis hover:overflow-auto hover:whitespace-normal scrollbar-hide"
              >
                {e}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default RightBarTopMenu;
