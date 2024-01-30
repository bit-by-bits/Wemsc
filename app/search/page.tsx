import { NextPage } from "next";
import React from "react";
import HomeMenu from "@/components/Home/HomeMenu";
import { searchUploads } from "@/utils/useSongs";

interface HomeProps {
  searchParams: { title: string };
}

const Home: NextPage<HomeProps> = async ({ searchParams }) => {
  const uploads = await searchUploads(searchParams.title);

  return (
    <HomeMenu
      label="Searched Songs"
      href=""
      items={uploads}
    />
  );
};

export default Home;
