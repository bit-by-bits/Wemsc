import { Metadata, NextPage } from "next";
import React from "react";
import SongMenu from "@/components/Card/SongMenu";
import { searchUploads } from "@/utils/useSongs";

export const metadata: Metadata = { title: "Search" };

interface HomeProps {
  searchParams: { title: string };
}

const Home: NextPage<HomeProps> = async ({ searchParams }) => {
  const uploads = await searchUploads(searchParams.title);
  return <SongMenu label="Searched Songs" href="" items={uploads} />;
};

export default Home;
