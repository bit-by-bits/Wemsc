"use client";

import { FC, ReactNode, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { Database } from "@/Database";

interface SupabaseProviderProps {
  children: ReactNode;
}

const SupabaseProvider: FC<SupabaseProviderProps> = ({ children }) => {
  const createClient = () => createClientComponentClient<Database>();

  const [client, setClient] = useState(createClient());

  return (
    <SessionContextProvider supabaseClient={client}>
      {children}
    </SessionContextProvider>
  );
};

export default SupabaseProvider;
