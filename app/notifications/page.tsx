import React from "react";
import { Metadata, NextPage } from "next";

export const metadata: Metadata = { title: "Notifications" };

const Home: NextPage = () => {
  return (
    <div className="flex flex-col">
      <div className="text-4xl font-bold text-white mb-4">Notifications</div>
      <div className="h-full w-full flex items-center justify-center text-center">
        <span>No new notifications.</span>
      </div>
    </div>
  );
};

export default Home;
