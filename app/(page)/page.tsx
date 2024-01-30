import React from "react";
import { NextPage } from "next";
import urls from "@/URL";
import HomeMenu from "@/components/Home/HomeMenu";
import { fetchUploads } from "@/utils/useSongs";
import { getGreeting } from "@/utils/useTime";

const Home: NextPage = async () => {
  const greeting = getGreeting();
  const uploads = await fetchUploads();

  return (
    <div className="flex flex-col"> 
      <div className="w-full mb-2">
        <div className="flex flex-col items-center justify-center w-full h-[40vh] bg-black bg-opacity-50 rounded-lg">
          <span className="text-5xl font-bold text-white">{greeting}</span>
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
