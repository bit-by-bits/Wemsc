import { Song } from "@/Interfaces";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useImageLoader: (song: Song) => string | null = (song: Song) => {
  const { storage } = useSupabaseClient();
  if (!song) return null;

  const { data: imageData } = storage.from("images").getPublicUrl(song.img);

  return imageData.publicUrl;
};

export default useImageLoader;
