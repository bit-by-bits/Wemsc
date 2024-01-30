import React from "react";
import { NextPage } from "next";
import { fetchFavourites } from "@/utils/useSongs";
import HomeMenu from "@/components/Home/HomeMenu";

const Home: NextPage = async () => {
  const favourites = await fetchFavourites();
  return <HomeMenu label="Favourite Songs" href="" items={favourites} />;
};

export default Home;
