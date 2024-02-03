import React from "react";
import { Metadata, NextPage } from "next";
import { fetchFavourites } from "@/utils/useSongs";
import SongMenu from "@/components/Card/SongMenu";

export const metadata: Metadata = { title: "Favourites" };

const Home: NextPage = async () => {
  const favourites = await fetchFavourites();
  return <SongMenu label="Favourite Songs" href="" items={favourites} />;
};

export default Home;
