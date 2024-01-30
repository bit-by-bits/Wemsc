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

const fetchUserUploads = async (): Promise<Song[]> => {
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

    console.log(data);
  if (error) console.log(error.message);
  return (data as any) || [];
};

export { fetchUploads, fetchUserUploads, searchUploads };
