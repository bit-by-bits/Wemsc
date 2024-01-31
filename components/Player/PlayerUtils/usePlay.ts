"use client";

import { Song } from "@/Interfaces";
import { useUser } from "@/utils/useUser";
import usePlayer from "./usePlayer";
import useSub from "@/components/Modal/ModalUtils/useSub";
import useAuth from "@/components/Modal/ModalUtils/useAuth";

const usePlay = (songs: Song[]) => {
  const { setID, setIDs } = usePlayer();
  const { onOpen: onOpenSub } = useSub();
  const { onOpen: onOpenAuth } = useAuth();
  const { sub, user } = useUser();

  const onPlay = (id: string) => {
    if (!user) return onOpenAuth();
    if (!sub) return onOpenSub();

    setID(id);
    setIDs(songs.map(song => song.id));

    console.log(id + " " + songs.map(song => song.label));
  };

  return onPlay;
};

export default usePlay;
