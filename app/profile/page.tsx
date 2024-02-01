"use client";

import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import useSub from "@/components/Modal/ModalUtils/useSub";
import { useUser } from "@/utils/useUser";
import { postData } from "@/utils/useAPI";
import urls from "@/URL";

const Subscription = (
  mainText: JSX.Element,
  load: boolean,
  func: () => void,
  btnText: string,
) => (
  <div className="flex flex-col gap-y-4">
    <div>{mainText}</div>
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
  const { loading, sub, user } = useUser();

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
    <div className="flex flex-col">
      <div className="text-4xl font-bold text-white mb-4">Profile</div>
      {sub
        ? Subscription(
            <>
              You are currently on the
              <span className="font-bold"> {sub?.prices?.products?.name} </span>
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
    </div>
  );
};

export default Home;
