import React from "react";
import { NextPage } from "next";
import urls from "@/URL";
import HomeMenu from "@/components/Home/HomeMenu";
import { fetchFavourites, fetchUploads } from "@/utils/useSongs";
import { getGreeting } from "@/utils/useTime";

const Home: NextPage = async () => {
  const greeting = getGreeting();
  const uploads = await fetchUploads();
  const favourites = await fetchFavourites();

  return (
    <div className="flex flex-col">
      <div className="w-full mb-2">
        <div className="flex flex-col items-center justify-center w-full h-[40vh] bg-[#30D7F7] bg-opacity-50 rounded-lg">
          <span className="text-5xl font-bold text-white">{greeting}</span>
        </div>
      </div>
      <HomeMenu
        label="Uploaded Songs"
        href={urls.LOCAL_FILES}
        items={uploads}
      />
      <HomeMenu
        label="Favourite Songs"
        href={urls.FAVOURITES}
        items={favourites}
      />
    </div>
  );
};

export default Home;
