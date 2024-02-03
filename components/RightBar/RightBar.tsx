"use client";

import urls from "@/URL";
import Link from "next/link";
import React, { FC, useMemo, useState } from "react";
import RightBarMenu from "./RightBarMenu";
import { useUser } from "@/utils/useUser";
import { Avatar } from "@nextui-org/react";
import { LuBell, LuBellOff } from "react-icons/lu";
import toast from "react-hot-toast";
import RightBarTopMenu from "./RightBarTopMenu";
import useAuth from "../Modal/ModalUtils/useAuth";
import { RightBarMenuProps, RightBarProps } from "./Interfaces";

const RightBar: FC<RightBarProps> = ({ fav, up }) => {
  const { onOpen } = useAuth();
  const { user, userName, userPhoto } = useUser();

  const [DND, setDND] = useState<boolean>(false);
  const menus = useMemo<RightBarMenuProps[]>(
    () => [
      {
        label: "Favourites",
        href: urls.FAVOURITES,
        items: fav,
      },
      {
        label: "Uploaded",
        href: urls.UPLOADED,
        items: up,
      },
    ],
    [fav, up],
  );

  const handleOn = () => {
    if (!user) return onOpen();
    setDND(false);
    toast.success("DND Mode Off");
  };

  const handleOff = () => {
    if (!user) return onOpen();
    setDND(true);
    toast.success("DND Mode On");
  };

  return (
    <div className="hidden md:flex flex-col items-center h-screen p-2 lg:p-4 bg-menu-bg transition-all duration-300 min-w-[25vw] 2xl:min-w-[20vw]">
      <div className="flex items-center justify-between w-full mb-4">
        <div className="flex flex-row items-center gap-2">
          <Avatar
            src={userPhoto}
            alt={userName}
            isBordered
            className="hidden md:block"
          />
          <div className="flex flex-col ml-2">
            <span className="text-sm font-bold text-white">
              {userName !== "" ? userName : "Welcome!"}
            </span>
            {user ? (
              <Link
                href={urls.PROFILE}
                className="text-xs hover:text-white hover:underline cursor-pointer"
              >
                See your profile
              </Link>
            ) : (
              <div
                onClick={onOpen}
                className="text-xs hover:text-white hover:underline cursor-pointer"
              >
                Click here to login
              </div>
            )}
          </div>
        </div>

        <div className="flex-row items-center justify-center gap-2 p-1 h-10 hover:cursor-pointer hidden lg:flex">
          {DND ? (
            <LuBellOff
              className="hover:text-white text-xl"
              onClick={handleOn}
            />
          ) : (
            <LuBell
              className="hover:text-white text-xl xl:text-2xl"
              onClick={handleOff}
            />
          )}
          <RightBarTopMenu />
        </div>
      </div>

      {menus.map((e, i) => (
        <RightBarMenu key={i} href={e.href} label={e.label} items={e.items} />
      ))}
    </div>
  );
};

export default RightBar;
