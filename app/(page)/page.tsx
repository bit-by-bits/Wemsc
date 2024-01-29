"use client";

import React, { useMemo } from "react";
import { NextPage } from "next";
import urls from "@/URL";
import HomeMenu from "@/components/Home/HomeMenu";
import { useUser } from "@/utils/useUser";

const Home: NextPage = () => {
  const { userName } = useUser();

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 4 && currentHour < 12) {
      return "Good Morning!";
    } else if (currentHour >= 12 && currentHour < 17) {
      return "Good Afternoon!";
    } else if (currentHour >= 17 && currentHour < 20) {
      return "Good Evening!";
    } else {
      return "Good Night!";
    }
  };

  const items1 = useMemo<HomeCard[]>(
    () => [
      {
        image:
          "https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg",
        title: "Hold Me Up",
        description: "Conor Maynard",
        href: urls.HOME,
      },
      {
        image:
          "https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg",
        title: "Hold Me Up",
        description: "Conor Maynard",
        href: urls.HOME,
      },
      {
        image:
          "https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg",
        title: "Hold Me Up",
        description: "Conor Maynard",
        href: urls.HOME,
      },
      {
        image:
          "https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg",
        title: "Hold Me Up",
        description: "Conor Maynard",
        href: urls.HOME,
      },
      {
        image:
          "https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg",
        title: "Hold Me Up",
        description: "Conor Maynard",
        href: urls.HOME,
      },
    ],
    [],
  );

  return (
    <div className="flex flex-col w-full h-full overflow-y-scroll overflow-x-hidden scrollbar-hide">
      <div className="w-full mb-2">
        <div className="flex flex-col items-center justify-center w-full h-[40vh] bg-black bg-opacity-50 rounded-lg">
          <span className="text-5xl font-bold text-white">{getGreeting()}</span>
          <span className="text-3xl font-semibold text-white">{userName}</span>
        </div>
      </div>
      <HomeMenu
        label="Recently Played"
        href={urls.RECENTLY_PLAYED}
        items={items1}
      />
      <HomeMenu label="My Playlists" href={urls.MY_PLAYLISTS} items={items1} />
    </div>
  );
};

export default Home;
