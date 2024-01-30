import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Song } from "@/Interfaces";

const fetchUploads = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient({ cookies: cookies });

  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .order("uploaded", { ascending: false });

  if (error) console.log(error.message);
  return (data as any) || [];
};

const fetchUploadsByUser = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient({ cookies: cookies });

  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError) {
    console.log(sessionError.message);
    return [];
  }

  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .eq("user_id", sessionData.session?.user.id)
    .order("uploaded", { ascending: false });

  if (error) console.log(error.message);
  return (data as any) || [];
};

const searchUploads = async (title: string): Promise<Song[]> => {
  const supabase = createServerComponentClient({ cookies: cookies });

  if (!title) {
    const allSongs = await fetchUploads();
    return allSongs;
  }

  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .ilike("label", `%${title}%`)
    .order("uploaded", { ascending: false });

  if (error) console.log(error.message);
  return (data as any) || [];
};

const fetchFavourites = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient({ cookies: cookies });

  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError) {
    console.log(sessionError.message);
    return [];
  }

  const { data, error } = await supabase
    .from("favourites")
    .select("*, songs(*)")
    .eq("user_id", sessionData.session?.user?.id)
    .order("uploaded", { ascending: false });

  if (error) console.log(error.message);

  if (!data) return [];
  else return data.map(item => ({ ...item.songs }));
};

const fetchUploadsByID = async (id: string): Promise<Song> => {
  const supabase = createServerComponentClient({ cookies: cookies });

  if (id === "") return {} as Song;

  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .eq("id", id)
    .single();

  if (error) console.log(error.message);
  return (data as any) || [];
};

export {
  fetchUploads,
  fetchUploadsByUser,
  searchUploads,
  fetchFavourites,
  fetchUploadsByID,
};
