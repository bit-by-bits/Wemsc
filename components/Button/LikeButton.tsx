"use client";

import { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useSessionContext } from "@supabase/auth-helpers-react";
import useAuth from "../Modal/ModalUtils/useAuth";
import { useUser } from "@/utils/useUser";
import { RiHeart3Fill, RiHeart3Line } from "react-icons/ri";
import ToolTip from "./ToolTip";

const LikeButton: FC<LikeButtonProps> = ({ songID, show }) => {
  const router = useRouter();
  const { supabaseClient } = useSessionContext();

  const { user } = useUser();
  const { onOpen } = useAuth();

  const [isLiked, setIsLiked] = useState<boolean>(false);
  const Icon = isLiked ? RiHeart3Fill : RiHeart3Line;

  useEffect(() => {
    if (!user?.id || !songID) return;

    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from("favourites")
        .select("*")
        .eq("user_id", user.id)
        .eq("song_id", songID)
        .limit(1);

      setIsLiked(!error && !!data.length);
    };

    fetchData();
  }, [songID, supabaseClient, user?.id]);

  const handleLike = async () => {
    if (!user) return onOpen();

    if (isLiked) {
      setIsLiked(false);

      const { error } = await supabaseClient
        .from("favourites")
        .delete()
        .eq("user_id", user.id)
        .eq("song_id", songID);

      if (error) {
        setIsLiked(true);
        toast.error(error.message);
      } else toast.success("Unliked");
    } else {
      setIsLiked(true);

      const { error } = await supabaseClient
        .from("favourites")
        .insert({ song_id: songID, user_id: user.id });

      if (error) {
        setIsLiked(false);
        toast.error(error.message);
      } else toast.success("Liked");
    }

    router.refresh();
  };

  return (
    <button
      className={`cursor-pointer hover:opacity-75 transition-opacity duration-300 ease-in-out ${show ? "opacity-100" : "opacity-0"}`}
      onClick={handleLike}
    >
      <ToolTip text={isLiked ? "Unlike" : "Like"}>
        <Icon color={isLiked ? "#E93536" : "white"} className="text-xl" />
      </ToolTip>
    </button>
  );
};

export default LikeButton;
