"use client";

import { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useSessionContext } from "@supabase/auth-helpers-react";
import useAuth from "../Modal/ModalUtils/useAuth";
import { useUser } from "@/utils/useUser";
import { RiHeart3Fill, RiHeart3Line } from "react-icons/ri";

const LikeButton: FC<LikeButtonProps> = ({ songID, show }) => {
  const router = useRouter();
  const { supabaseClient } = useSessionContext();

  const { user } = useUser();
  const { onOpen } = useAuth();

  const [isLiked, setIsLiked] = useState<boolean>(false);

  useEffect(() => {
    if (!user?.id) return;

    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from("favourites")
        .select("*")
        .eq("user_id", user.id)
        .eq("song_id", songID)
        .single();

      if (!error && data) setIsLiked(true);
    };

    fetchData();
  }, [songID, supabaseClient, user?.id]);

  const Icon = isLiked ? RiHeart3Fill : RiHeart3Line;

  const handleLike = async () => {
    if (!user) return onOpen;

    if (isLiked) {
      const { error } = await supabaseClient
        .from("favourites")
        .delete()
        .eq("user_id", user.id)
        .eq("song_id", songID);

      if (error) toast.error(error.message);
      else {
        setIsLiked(false);
        toast.success("Unliked");
      }
    } else {
      const { error } = await supabaseClient
        .from("favourites")
        .insert({ song_id: songID, user_id: user.id });

      if (error) toast.error(error.message);
      else {
        setIsLiked(true);
        toast.success("Liked");
      }
    }

    router.refresh();
  };

  return (
    <button
      className={`cursor-pointer hover:opacity-75 transition-opacity duration-300 ease-in-out ${show ? "opacity-100" : "opacity-0"}`}
      onClick={handleLike}
    >
      <Icon color={isLiked ? "#E93536" : "white"} size={25} />
    </button>
  );
};

export default LikeButton;
