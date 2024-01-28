"use client";

import urls from "@/URL";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { FC, useMemo, useState } from "react";
import { GoHome, GoHomeFill } from "react-icons/go";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { MdLibraryMusic, MdOutlineLibraryMusic } from "react-icons/md";
import { PiCompass, PiCompassFill } from "react-icons/pi";
import {
  RiDownloadCloudFill,
  RiDownloadCloudLine,
  RiMenuFoldLine,
  RiMenuUnfoldLine,
} from "react-icons/ri";
import { TbFolderFilled, TbFolderMinus } from "react-icons/tb";
import LeftBarMenu from "./LeftBarMenu";

const LeftBar: FC = () => {
  const path = usePathname();
  const [open, setOpen] = useState<boolean>(true);

  const features = useMemo<LeftBarItem[]>(
    () => [
      {
        label: "Home",
        iconOutline: GoHome,
        iconFilled: GoHomeFill,
        href: urls.HOME,
        active: path === urls.HOME,
      },
      {
        label: "Discover",
        iconOutline: PiCompass,
        iconFilled: PiCompassFill,
        href: urls.DISCOVER,
        active: path === urls.DISCOVER,
      },
      {
        label: "Collections",
        iconOutline: MdOutlineLibraryMusic,
        iconFilled: MdLibraryMusic,
        href: urls.COLLECTIONS,
        active: path === urls.COLLECTIONS,
      },
    ],
    [path]
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
        iconOutline: IoHeartOutline,
        iconFilled: IoHeart,
        href: urls.FAVOURITES,
        active: path === urls.FAVOURITES,
      },
      {
        label: "Local Files",
        iconOutline: TbFolderMinus,
        iconFilled: TbFolderFilled,
        href: urls.LOCAL_FILES,
        active: path === urls.LOCAL_FILES,
      },
    ],
    [path]
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
    [features, libraries]
  );

  const toggleOpen = () => setOpen((prev) => !prev);

  return (
    <div
      className={`flex flex-col items-center h-screen p-4 w-${
        open ? "1/4" : "5vw"
      } bg-menu-bg transition-all duration-300`}
    >
      <div
        className={`flex flex-${
          open ? "row" : "col gap-4"
        } items-center justify-between w-full mb-4`}
      >
        <Link href={urls.HOME}>
          <Image src="/wemsc.png" alt="logo" height={40} width={40} />
        </Link>
        <div className="hover:cursor-pointer" onClick={toggleOpen}>
          {open ? (
            <RiMenuFoldLine className="text-2xl hover:text-white" />
          ) : (
            <RiMenuUnfoldLine className="text-2xl hover:text-white" />
          )}
        </div>
      </div>

      {menus.map((e, i) => (
        <LeftBarMenu key={i} label={e.label} items={e.items} isOpen={open} />
      ))}
    </div>
  );
};

export default LeftBar;
