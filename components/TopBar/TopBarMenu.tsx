import urls from "@/URL";
import Link from "next/link";
import React, { FC, useState, useEffect, useRef } from "react";
import { TopBarMenuItems } from "./Interfaces";

const TopBarMenu: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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

  const items: TopBarMenuItems[] = [
    {
      label: "Home",
      href: urls.home,
    },
    {
      label: "About",
      href: urls.about,
    },
    {
      label: "Contact",
      href: urls.contact,
    },
  ];

  return (
    <div className="relative" ref={menuRef}>
      <div
        className="flex flex-row items-center justify-center gap-1 p-1 h-10 hover:cursor-pointer"
        onClick={toggleMenu}
      >
        {[1, 2, 3].map((_, i) => (
          <div key={i} className={`w-1 h-1 bg-white rounded-full`} />
        ))}
      </div>
      {isMenuOpen && (
        <div className="bg-black text-white  absolute top-11 right-0 flex flex-col rounded p-1">
          {items.map((e, i) => (
            <Link
              key={i}
              href={e.href}
              className="p-2 min-w-[100px] hover:underline"
            >
              {e.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopBarMenu;
