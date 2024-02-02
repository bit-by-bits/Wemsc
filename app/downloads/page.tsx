import React from "react";
import { NextPage } from "next";
import { fetchDownloads } from "@/utils/useSongs";
import HomeMenu from "@/components/Home/HomeMenu";

const Home: NextPage = async () => {
  const downloads = await fetchDownloads();
  return <HomeMenu label="Downloaded Songs" href="" items={downloads} />;
};

export default Home;
