import React from "react";
import { NextPage } from "next";
import urls from "@/URL";
import SongMenu from "@/components/Card/SongMenu";
import {
  fetchDownloads,
  fetchFavourites,
  fetchUploads,
  fetchUploadsByUser,
} from "@/utils/useSongs";
import { getGreeting } from "@/utils/useTime";
import { Image } from "@nextui-org/react";

const Home: NextPage = async () => {
  const greeting = getGreeting();
  const songs = await fetchUploads();
  const favourites = await fetchFavourites();
  const uploads = await fetchUploadsByUser();
  const downloads = await fetchDownloads();

  return (
    <div className="flex flex-col">
      <div className="w-full mb-2">
        <div className="flex flex-col items-center justify-center w-full h-[20vh] lg:h-[40vh] bg-black bg-opacity-50 rounded-lg relative overflow-hidden">
          <Image
            src={`/greeting/${greeting}.jpg`}
            alt={greeting}
            removeWrapper
            className="min-w-full min-h-full object-cover rounded-lg"
          />
          <span className="text-3xl lg:text-5xl font-bold text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-max z-10">
            {`Good ${greeting.charAt(0).toUpperCase()}${greeting.slice(1)}!`}
          </span>
        </div>
      </div>
      <SongMenu label="New Songs" href={urls.SONGS} items={songs} />
      <SongMenu
        label="Favourite Songs"
        href={urls.FAVOURITES}
        items={favourites}
      />
      <SongMenu label="Uploaded Songs" href={urls.UPLOADED} items={uploads} />
      <SongMenu
        label="Downloaded Songs"
        href={urls.DOWNLOADS}
        items={downloads}
      />
    </div>
  );
};

export default Home;
