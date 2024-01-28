"use client";

import { FC, ReactNode } from "react";
import { UserContextProvider } from "@/utils/useUser";

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider: FC<UserProviderProps> = ({ children }) => {
  return <UserContextProvider>{children}</UserContextProvider>;
};

export default UserProvider;
