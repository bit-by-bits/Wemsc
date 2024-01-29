"use client";

import { useEffect, useState, createContext, useContext, FC } from "react";
import {
  useUser as useSupaUser,
  useSessionContext,
} from "@supabase/auth-helpers-react";
import {
  Subscription,
  UserContextType,
  UserDetails,
  UserProviderProps,
} from "../Interfaces";

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

export const UserContextProvider: FC<UserProviderProps> = props => {
  const supaUser = useSupaUser();
  const { session, isLoading, supabaseClient } = useSessionContext();

  const [dataLoading, setDataLoading] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  const getUserDetails = () =>
    supabaseClient.from("users").select("*").single();

  const getSubscription = () =>
    supabaseClient
      .from("subscriptions")
      .select("*, prices(*, products(*))")
      .in("status", ["trialing", "active"])
      .single();

  useEffect(() => {
    const fetchData = async () => {
      if (supaUser && !dataLoading && !userDetails && !subscription) {
        setDataLoading(true);

        try {
          const [userDetailsData, subscriptionData] = await Promise.all([
            getUserDetails(),
            getSubscription(),
          ]);

          if (userDetailsData)
            setUserDetails(userDetailsData.data as UserDetails);
          if (subscriptionData)
            setSubscription(subscriptionData.data as Subscription);
        } finally {
          setDataLoading(false);
        }
      } else if (!supaUser && !isLoading && !dataLoading) {
        setUserDetails(null);
        setSubscription(null);
      }
    };

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supaUser, isLoading]);

  const value = {
    token: session?.access_token ?? null,
    user: supaUser,
    details: userDetails,
    loading: isLoading || dataLoading,
    sub: subscription,
  };

  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("User context not found!" as string);

  return context;
};
