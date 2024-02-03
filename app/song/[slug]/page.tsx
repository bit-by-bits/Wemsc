"use client";

import { FC } from "react";
import { NextPage } from "next";
import { useFetchByID } from "@/components/Player/PlayerUtils/usePlayerID";
import { Song } from "@/Interfaces";
import LikeButton from "@/components/Button/LikeButton";

interface SongDetailsProps {
  song: Song;
}

interface SongProps {
  params: { slug: string };
}

const SongDetails: FC<SongDetailsProps> = async ({ song }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center gap-2">
        <span className="text-3xl sm:text-4xl font-bold text-white">
          {song.label}
        </span>
        <LikeButton songID={song.id} show={true} />
      </div>

      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold">Song Author</div>
        <div className="text-white">{song.author}</div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold">Uploaded At</div>
        <div className="text-white">
          {new Date(song.uploaded).toLocaleString()}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold">Song Lyrics</div>
        <div className="text-white">No lyrics available for this song.</div>
      </div>
    </div>
  );
};

const Home: NextPage<SongProps> = ({ params }) => {
  const { loading, song } = useFetchByID(params.slug ?? "");

  return song ? (
    <SongDetails song={song} />
  ) : (
    <div className="h-full w-full flex items-center justify-center text-center">
      <div>{loading ? "Fetching song data" : "Song data not available."}</div>
    </div>
  );
};

export default Home;
