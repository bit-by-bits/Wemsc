import React from "react";
import { Metadata, NextPage } from "next";
import { fetchFavourites } from "@/utils/useSongs";
import HomeMenu from "@/components/Home/HomeMenu";

export const metadata: Metadata = { title: "Favourites" };

const Home: NextPage = async () => {
  const favourites = await fetchFavourites();
  return <HomeMenu label="Favourite Songs" href="" items={favourites} />;
};

export default Home;
