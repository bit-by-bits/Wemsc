import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { ProductWithPrice, Song } from "@/Interfaces";

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

  const ID = sessionData.session?.user.id;
  if (!ID) return [];

  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .eq("user_id", ID)
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

  const ID = sessionData.session?.user.id;
  if (!ID) return [];

  const { data, error } = await supabase
    .from("favourites")
    .select("*, songs(*)")
    .eq("user_id", ID)
    .order("uploaded", { ascending: false });

  if (error) console.log(error.message);

  if (!data) return [];
  else return data.map(item => ({ ...item.songs }));
};

const fetchUploadByID = async (id: string): Promise<Song> => {
  const supabase = createServerComponentClient({ cookies: cookies });

  if (!id || id === "") return {} as Song;

  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .eq("id", id)
    .single();

  if (error) console.log(error.message);
  return (data as any) || [];
};

const fetchUploadsByIDs = async (ids: string[]): Promise<Song[]> => {
  const supabase = createServerComponentClient({ cookies: cookies });

  if (!ids || ids.length === 0) return [];

  const numericIds = ids.map(id => parseInt(id, 10));
  if (numericIds.some(isNaN)) return [];

  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .in("id", numericIds)
    .order("uploaded", { ascending: false });

  if (error) console.log(error.message);
  return (data as any) || [];
};

const fetchPaidProducts = async (): Promise<ProductWithPrice[]> => {
  const supabase = createServerComponentClient({ cookies: cookies });

  const { data, error } = await supabase
    .from("products")
    .select("*, prices(*)")
    .eq("active", true)
    .eq("prices.active", true)
    .order("metadata->index")
    .order("unit_amount", { referencedTable: "prices" });

  if (error) console.log(error.message);
  return (data as any) || [];
};

const fetchDownloads = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient({ cookies: cookies });

  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError) {
    console.log(sessionError.message);
    return [];
  }

  const ID = sessionData.session?.user.id;
  if (!ID) return [];

  const { data, error } = await supabase
    .from("downloads")
    .select("*, songs(*)")
    .eq("user_id", ID)
    .order("uploaded", { ascending: false });

  if (error) console.log(error.message);

  if (!data) return [];
  else return data.map(item => ({ ...item.songs }));
};

export {
  fetchUploads,
  fetchUploadsByUser,
  searchUploads,
  fetchFavourites,
  fetchUploadByID,
  fetchPaidProducts,
  fetchUploadsByIDs,
  fetchDownloads,
};
