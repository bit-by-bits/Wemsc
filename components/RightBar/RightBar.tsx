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

const RightBar: FC = () => {
  const { user } = useUser();
  const [dnd, setDnd] = useState<boolean>(false);

  const userName = useMemo<string>(() => {
    return (
      user?.user_metadata?.full_name ||
      user?.user_metadata?.name ||
      user?.email ||
      user?.phone ||
      "Welcome!"
    );
  }, [user]);

  const userPhoto = useMemo<string>(() => {
    return (
      user?.user_metadata?.avatar_url || user?.user_metadata?.picture || ""
    );
  }, [user]);

  const recently_played = useMemo<RightBarItem[]>(
    () => [
      {
        img: "https://i.scdn.co/image/ab67616d0000b273e3b9b8b9b7b6b6b6b6b6b6b6",
        main: "Hold Me Up",
        left: "Conor Maynard",
        right: "2 days ago",
      },
      {
        img: "https://i.scdn.co/image/ab67616d0000b273e3b9b8b9b7b6b6b6b6b6b6b6",
        main: "Hold Me Up",
        left: "Conor Maynard",
        right: "2 days ago",
      },
      {
        img: "https://i.scdn.co/image/ab67616d0000b273e3b9b8b9b7b6b6b6b6b6b6b6",
        main: "Hold Me Up",
        left: "Conor Maynard",
        right: "2 days ago",
      },
    ],
    [],
  );

  const my_playlists = useMemo<RightBarItem[]>(
    () => [
      {
        img: "https://i.scdn.co/image/ab67616d0000b273e3b9b8b9b7b6b6b6b6b6b6b6",
        main: "Hold Me Up",
        left: "Conor Maynard",
        right: "2 days ago",
      },
      {
        img: "https://i.scdn.co/image/ab67616d0000b273e3b9b8b9b7b6b6b6b6b6b6b6",
        main: "Hold Me Up",
        left: "Conor Maynard",
        right: "2 days ago",
      },
      {
        img: "https://i.scdn.co/image/ab67616d0000b273e3b9b8b9b7b6b6b6b6b6b6b6",
        main: "Hold Me Up",
        left: "Conor Maynard",
        right: "2 days ago",
      },
    ],
    [],
  );

  const menus = useMemo<RightBarMenu[]>(
    () => [
      {
        label: "Recently Played",
        href: urls.RECENTLY_PLAYED,
        items: recently_played,
      },
      {
        label: "My Playlists",
        href: urls.MY_PLAYLISTS,
        items: my_playlists,
      },
    ],
    [recently_played, my_playlists],
  );

  const handleOn = () => {
    setDnd(false);
    toast.success("Notifications turned on");
  };

  const handleOff = () => {
    setDnd(true);
    toast.success("Notifications turned off");
  };

  return (
    <div
      className={`flex flex-col items-center h-screen p-4 bg-menu-bg transition-all duration-300 min-w-[25vw]`}
    >
      <div className="flex items-center justify-between w-full mb-4">
        <div className="flex flex-row items-center gap-2">
          <Avatar
            src={userPhoto}
            alt={userName}
            isBordered
            className="hover:cursor-pointer"
          />
          <div className="flex flex-col ml-2">
            <span className="text-sm font-bold text-white">{userName}</span>
            <Link href={urls.PROFILE} className="text-xs">
              See your profile
            </Link>
          </div>
        </div>

        <div className="flex flex-row items-center justify-center gap-2 p-1 h-10 hover:cursor-pointer">
          {dnd ? (
            <LuBellOff
              className="hover:text-white text-2xl"
              onClick={handleOn}
            />
          ) : (
            <LuBell className="hover:text-white text-2xl" onClick={handleOff} />
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
