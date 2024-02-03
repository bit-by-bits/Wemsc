"use client";

import urls from "@/URL";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useEffect, useMemo, useState } from "react";
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
  RiUser3Fill,
  RiUser3Line,
} from "react-icons/ri";
import LeftBarMenu from "./LeftBarMenu";
import { LuListMusic } from "react-icons/lu";
import Image from "next/image";
import { FaRegUser, FaUser } from "react-icons/fa6";
import { IoNotifications, IoNotificationsOutline } from "react-icons/io5";

const LeftBar: FC = () => {
  const path = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () =>
      window.innerWidth < 768 ? setShow(false) : setShow(true);
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!show) setIsOpen(false);
  }, [show]);

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
        label: "Favourites",
        iconOutline: RiHeart3Line,
        iconFilled: RiHeart3Fill,
        href: urls.FAVOURITES,
        active: path === urls.FAVOURITES,
      },
      {
        label: "Uploaded",
        iconOutline: RiFolderSharedLine,
        iconFilled: RiFolderSharedFill,
        href: urls.UPLOADED,
        active: path === urls.UPLOADED,
      },
      {
        label: "Downloads",
        iconOutline: RiDownloadCloudLine,
        iconFilled: RiDownloadCloudFill,
        href: urls.DOWNLOADS,
        active: path === urls.DOWNLOADS,
      },
    ],
    [path],
  );

  const extras = useMemo<LeftBarItem[]>(
    () =>
      show
        ? []
        : [
            {
              label: "Profile",
              iconOutline: RiUser3Line,
              iconFilled: RiUser3Fill,
              href: urls.PROFILE,
              active: path === urls.PROFILE,
            },
            {
              label: "Notifications",
              iconOutline: IoNotificationsOutline,
              iconFilled: IoNotifications,
              href: urls.NOTIFICATIONS,
              active: path === urls.NOTIFICATIONS,
            },
          ],
    [path, show],
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
      { label: "EXTRAS", items: extras },
    ],
    [features, libraries, extras],
  );

  const toggleIsOpen = () => setIsOpen(prev => !prev);

  return (
    <div
      className={`flex flex-col items-center h-screen p-2 lg:p-4 bg-menu-bg transition-all duration-300 ${isOpen ? "min-w-[18vw] 2xl:min-w-[15vw]" : "w-[10vw] md:w-[5vw]"}`}
    >
      <div
        className={`flex flex-${
          isOpen ? "row" : "col gap-4"
        } items-center justify-between w-full mb-2 lg:mb-4`}
      >
        <Link href={urls.HOME}>
          <Image src="/wemsc.png" alt="logo" height={50} width={50} />
        </Link>
        <div
          className={`hover:cursor-pointer ${show ? "" : "hidden"}`}
          onClick={toggleIsOpen}
        >
          {isOpen ? (
            <RiMenuFoldLine className="text-xl lg:text-2xl hover:text-white" />
          ) : (
            <RiMenuUnfoldLine className="text-xl lg:text-2xl hover:text-white" />
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
