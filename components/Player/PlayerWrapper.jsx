"use client";

import usePlayer from "./PlayerUtils/usePlayer";
import { useSongLoader } from "@/utils/useSongMeta";
import useFetchByID from "./PlayerUtils/useFetchByID";
import Player from "./Player";

const PlayerWrapper = () => {
  const { activeID } = usePlayer();
  const { song } = useFetchByID(activeID ?? "");
  const URL = useSongLoader(song);

  if (!activeID || !song || !URL) return null;

  return (
    <div className="fixed left-0 bottom-0 bg-black w-screen z-50">
      <Player key={URL} song={song} URL={URL} />
    </div>
  );
};

export default PlayerWrapper;
