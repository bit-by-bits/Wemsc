"use client";

import { Song } from "@/Interfaces";
import { useUser } from "@/utils/useUser";
import usePlayer from "./usePlayer";
// import useSub from "@/components/Modal/ModalUtils/useSub";
import useAuth from "@/components/Modal/ModalUtils/useAuth";

const usePlay = (songs: Song[]) => {
  const { setId, setIds } = usePlayer();
  // const { onOpen: onOpenSub } = useSub();
  const { onOpen: onOpenAuth } = useAuth();
  const { sub, user } = useUser();

  const onPlay = (id: string) => {
    if (!user) return onOpenAuth();
    // if (!sub) return onOpenSub();

    setId(id);
    setIds(songs.map(song => song.id));

    console.log(id);
  };

  return onPlay;
};

export default usePlay;
