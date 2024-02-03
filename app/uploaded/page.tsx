import React from "react";
import { Metadata, NextPage } from "next";
import { fetchUploadsByUser } from "@/utils/useSongs";
import SongMenu from "@/components/Card/SongMenu";

export const metadata: Metadata = { title: "Uploaded" };

const Home: NextPage = async () => {
  const uploads = await fetchUploadsByUser();
  return <SongMenu label="Uploaded Songs" href="" items={uploads} />;
};

export default Home;
