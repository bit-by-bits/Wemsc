import React from "react";
import { NextPage } from "next";
import { fetchUploadsByUser } from "@/utils/useSongs";
import HomeMenu from "@/components/Home/HomeMenu";

const Home: NextPage = async () => {
  const uploads = await fetchUploadsByUser();
  return <HomeMenu label="Uploaded Songs" href="" items={uploads} />;
};

export default Home;
