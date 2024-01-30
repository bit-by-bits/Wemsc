import React from "react";
import { NextPage } from "next";
import urls from "@/URL";
import HomeMenu from "@/components/Home/HomeMenu";
import { fetchUploads } from "@/utils/useSongs";

const Home: NextPage = async () => {
  const uploads = await fetchUploads();

  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours >= 4 && hours < 12) {
      return "Good Morning!";
    } else if (hours >= 12 && hours < 17) {
      return "Good Afternoon!";
    } else if (hours >= 17 && hours < 20) {
      return "Good Evening!";
    } else {
      return "Good Night!";
    }
  };

  return (
    <div className="flex flex-col w-full h-full overflow-y-scroll overflow-x-hidden scrollbar-hide">
      <div className="w-full mb-2">
        <div className="flex flex-col items-center justify-center w-full h-[40vh] bg-black bg-opacity-50 rounded-lg">
          <span className="text-5xl font-bold text-white">{getGreeting()}</span>
          <span className="text-3xl font-semibold text-white"></span>
        </div>
      </div>
      <HomeMenu
        label="Uploaded Songs"
        href={urls.RECENTLY_PLAYED}
        items={uploads}
      />
    </div>
  );
};

export default Home;
