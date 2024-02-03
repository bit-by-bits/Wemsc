import React from "react";
import { Metadata, NextPage } from "next";
import { fetchUploads } from "@/utils/useSongs";
import HomeMenu from "@/components/Home/HomeMenu";

export const metadata: Metadata = { title: "Songs" };

const Home: NextPage = async () => {
  const uploads = await fetchUploads();
  return <HomeMenu label="All Songs" href="" items={uploads} />;
};

export default Home;
