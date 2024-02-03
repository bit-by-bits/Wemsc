import React from "react";
import { Metadata, NextPage } from "next";
import { fetchUploadsByIDs } from "@/utils/useSongs";
import HomeMenu from "@/components/Home/HomeMenu";

export const metadata: Metadata = { title: "Queue" };

interface QueueProps {
  params: { slug: string };
}

const Home: NextPage<QueueProps> = async ({ params }) => {
  const IDs = params.slug.split("%2B");

  if (!IDs || IDs.length === 0) {
    return (
      <div className="h-full w-full flex items-center justify-center text-center">
        <div>No songs in queue.</div>
      </div>
    );
  }
  const uploads = await fetchUploadsByIDs(IDs);
  return <HomeMenu label="Queued Songs" href="" items={uploads} />;
};

export default Home;
