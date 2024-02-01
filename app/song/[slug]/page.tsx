"use client";

import { FC } from "react";
import { NextPage } from "next";
import { useFetchByID } from "@/components/Player/PlayerUtils/usePlayerID";

interface SongProps {
  params: { slug: string };
}

const SongDetails: FC<{
  label: string;
  author: string;
  uploaded: string;
}> = ({ label, author, uploaded }) => (
  <div className="flex flex-col gap-4">
    <div className="text-4xl font-bold text-white">{label}</div>

    <div className="flex flex-col gap-2">
      <div className="text-xl font-semibold">Uploaded By</div>
      <div className="text-white">{author}</div>
    </div>

    <div className="flex flex-col gap-2">
      <div className="text-xl font-semibold">Uploaded At</div>
      <div className="text-white">{new Date(uploaded).toLocaleString()}</div>
    </div>

    <div className="flex flex-col gap-2">
      <div className="text-xl font-semibold">Song Lyrics</div>
      <div className="text-white">No lyrics available for this song.</div>
    </div>
  </div>
);

const Home: NextPage<SongProps> = ({ params }) => {
  const { loading, song } = useFetchByID(params.slug ?? "");

  return song ? (
    <SongDetails
      label={song.label}
      author={song.author}
      uploaded={song.uploaded}
    />
  ) : (
    <div className="h-full w-full flex items-center justify-center text-center">
      <div>{loading ? "Fetching song data" : "Song data not available."}</div>
    </div>
  );
};

export default Home;
