"use client";

import urls from "@/URL";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useMemo, useState } from "react";
import {
  RiCompassDiscoverFill,
  RiCompassDiscoverLine,
  RiDownloadCloudFill,
  RiDownloadCloudLine,
  RiFolderSharedFill,
  RiFolderSharedLine,
  RiHeart3Fill,
  RiHeart3Line,
  RiHome2Fill,
  RiHome2Line,
  RiMenuFoldLine,
  RiMenuUnfoldLine,
} from "react-icons/ri";
import LeftBarMenu from "./LeftBarMenu";
import { LuListMusic } from "react-icons/lu";

const LeftBar: FC = () => {
  const path = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const features = useMemo<LeftBarItem[]>(
    () => [
      {
        label: "Home",
        iconOutline: RiHome2Line,
        iconFilled: RiHome2Fill,
        href: urls.HOME,
        active: path === urls.HOME,
      },
      {
        label: "Discover",
        iconOutline: RiCompassDiscoverLine,
        iconFilled: RiCompassDiscoverFill,
        href: urls.SEARCH,
        active: path === urls.SEARCH,
      },
      {
        label: "Songs",
        iconOutline: LuListMusic,
        iconFilled: LuListMusic,
        href: urls.SONGS,
        active: path === urls.SONGS,
      },
    ],
    [path],
  );

  const libraries = useMemo<LeftBarItem[]>(
    () => [
      {
        label: "Downloads",
        iconOutline: RiDownloadCloudLine,
        iconFilled: RiDownloadCloudFill,
        href: urls.DOWNLOADS,
        active: path === urls.DOWNLOADS,
      },
      {
        label: "Favourites",
        iconOutline: RiHeart3Line,
        iconFilled: RiHeart3Fill,
        href: urls.FAVOURITES,
        active: path === urls.FAVOURITES,
      },
      {
        label: "Local Files",
        iconOutline: RiFolderSharedLine,
        iconFilled: RiFolderSharedFill,
        href: urls.LOCAL_FILES,
        active: path === urls.LOCAL_FILES,
      },
    ],
    [path],
  );

  const menus = useMemo<LeftBarMenu[]>(
    () => [
      {
        label: "FEATURES",
        items: features,
      },
      {
        label: "LIBRARIES",
        items: libraries,
      },
    ],
    [features, libraries],
  );

  const toggleIsOpen = () => setIsOpen(prev => !prev);

  return (
    <div
      className={`flex flex-col items-center h-screen p-4 bg-menu-bg transition-all duration-300 ${isOpen ? "min-w-[18vw]" : "w-[5vw]"}`}
    >
      <div
        className={`flex flex-${
          isOpen ? "row" : "col gap-4"
        } items-center justify-between w-full mb-4`}
      >
        <Link href={urls.HOME}>
          <Image src="/wemsc.png" alt="logo" height={40} width={40} />
        </Link>
        <div className="hover:cursor-pointer" onClick={toggleIsOpen}>
          {isOpen ? (
            <RiMenuFoldLine className="text-2xl hover:text-white" />
          ) : (
            <RiMenuUnfoldLine className="text-2xl hover:text-white" />
          )}
        </div>
      </div>

      {menus.map((e, i) => (
        <LeftBarMenu key={i} label={e.label} items={e.items} isOpen={isOpen} />
      ))}
    </div>
  );
};

export default LeftBar;
