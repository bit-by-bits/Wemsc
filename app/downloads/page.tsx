import React from "react";
import { Metadata, NextPage } from "next";
import { fetchDownloads } from "@/utils/useSongs";
import SongMenu from "@/components/Card/SongMenu";

export const metadata: Metadata = { title: "Downloads" };

const Home: NextPage = async () => {
  const downloads = await fetchDownloads();
  return <SongMenu label="Downloaded Songs" href="" items={downloads} />;
};

export default Home;
