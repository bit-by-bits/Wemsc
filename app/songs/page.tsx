import React from "react";
import { Metadata, NextPage } from "next";
import { fetchUploads } from "@/utils/useSongs";
import SongMenu from "@/components/Card/SongMenu";

export const metadata: Metadata = { title: "Songs" };

const Home: NextPage = async () => {
  const uploads = await fetchUploads();
  return <SongMenu label="All Songs" href="" items={uploads} />;
};

export default Home;
