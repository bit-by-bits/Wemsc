"use client";

import { Song } from "@/Interfaces";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useImageLoader: (song: Song) => string | null = (song: Song) => {
  const { storage } = useSupabaseClient();
  if (!song) return null;

  const { data: imageData } = storage.from("images").getPublicUrl(song.img);

  return imageData.publicUrl;
};

const useSongLoader = (song: Song) => {
  const { storage } = useSupabaseClient();
  if (!song) return "";

  const { data: songData } = storage.from("songs").getPublicUrl(song.href);

  return songData.publicUrl;
};

export { useImageLoader, useSongLoader };
