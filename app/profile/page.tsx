"use client";

import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import useSub from "@/components/Modal/ModalUtils/useSub";
import { useUser } from "@/utils/useUser";
import { postData } from "@/utils/useAPI";
import urls from "@/URL";
import { Avatar } from "@nextui-org/react";

const Detail = (top: string, btm?: string) => (
  <div className="flex flex-col gap-2">
    <div className="text-xl font-semibold">{top}</div>
    <div className="text-white">{btm && btm?.length > 0 ? btm : "N/A"}</div>
  </div>
);

const Subscription = (
  mainText: JSX.Element,
  load: boolean,
  func: () => void,
  btnText: string,
) => (
  <div className="flex flex-col gap-y-4">
    <span>{mainText}</span>
    <button
      disabled={load}
      onClick={func}
      className="py-2 px-4 bg-link-active hover:bg-opacity-75 text-white mb-4 w-max rounded-lg"
    >
      {btnText}
    </button>
  </div>
);

const Home: NextPage = () => {
  const { onOpen } = useSub();
  const { loading, sub, user, userName, userPhoto } = useUser();

  const router = useRouter();
  const [wait, setWait] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.push(urls.HOME);
  }, [loading, user, router]);

  const redirect = async () => {
    setWait(true);
    try {
      const { url, error } = await postData({ URL: urls.CREATE_PORTAL_LINK });
      if (error) throw new Error(error);
      window.location.assign(url);
    } catch (error) {
      if (error) return alert((error as Error).message);
    }
    setWait(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center gap-4">
        <span className="text-4xl font-bold text-white">Profile</span>
        {user && <Avatar src={userPhoto} alt={userName} isBordered />}
      </div>
      {user ? (
        <>
          {Detail("User Name", userName)}
          {Detail("User Email", user?.email)}
          {Detail("Phone Number", user?.phone)}
          {sub
            ? Subscription(
                <>
                  You are currently on the
                  <span className="font-bold">
                    {" "}
                    {sub?.prices?.products?.name}{" "}
                  </span>
                  plan.
                </>,
                wait || loading,
                redirect,
                "Open Customer Portal",
              )
            : Subscription(
                <>You are not subscribed to any plan.</>,
                wait,
                onOpen,
                "Subscribe To Wemsc",
              )}
        </>
      ) : (
        <div className="h-full w-full flex items-center justify-center text-center">
          <span>You are not logged in.</span>
        </div>
      )}
    </div>
  );
};

export default Home;
