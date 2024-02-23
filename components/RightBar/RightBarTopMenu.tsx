import urls from "@/URL";
import { useRouter } from "next/navigation";
import React, { FC, useState, useEffect, useRef } from "react";
import { FaAngleDown } from "react-icons/fa6";

const RightBarTopMenu: FC = () => {
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const seeAll = () => {
    router.push(urls.NOTIFICATIONS);
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
        <div className="bg-black absolute top-10 right-0 flex flex-col rounded p-2 max-h-[200px] overflow-y-auto scrollbar-hide min-w-max z-50 text-sm border border-primary-text">
          {items?.length === 0 ? (
            <div className="p-2 text-center">No unread messages.</div>
          ) : (
            items?.map((e, i) => (
              <div
                key={i}
                className="p-2 border-b border-primary-text overflow-hidden whitespace-nowrap overflow-ellipsis hover:overflow-auto hover:whitespace-normal scrollbar-hide"
              >
                {e}
              </div>
            ))
          )}
          <button
            onClick={seeAll}
            className="p-2 bg-link-active hover:bg-opacity-75 text-white w-full rounded-lg"
          >
            See All
          </button>
        </div>
      )}
    </div>
  );
};

export default RightBarTopMenu;
