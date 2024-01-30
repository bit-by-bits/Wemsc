import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Song } from "@/Interfaces";

const fetchUploads = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient({ cookies: cookies });

  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .order("uploaded", { ascending: false });

  console.log(data);

  if (error) console.log(error.message);
  return (data as any) || [];
};

export { fetchUploads };
