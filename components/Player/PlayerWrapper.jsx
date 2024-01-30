"use client"

import usePlayer from "./PlayerUtils/usePlayer";
import { useSongLoader } from "@/utils/useSongMeta";
import useFetchByID from "./PlayerUtils/useFetchByID";
import Player from "./Player";

const PlayerWrapper = () => {
  const player = usePlayer();
  const { song } = useFetchByID(player.activeId ?? "");
  const URL = useSongLoader(song);

  if (!song || !URL || !player.activeId) return null;

  return (
    <div className="fixed bottom-0 bg-black w-full py-2 h-[80px] px-4">
      <Player key={URL} song={song} URL={URL} />
    </div>
  );
};

export default PlayerWrapper;
