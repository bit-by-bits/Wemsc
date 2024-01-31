"use client";

import urls from "@/URL";
import React, { FC, useState, useEffect, useRef, useMemo } from "react";
import { TopBarMenuItems } from "./Interfaces";
import { useUser } from "@/utils/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import useAuth from "../Modal/ModalUtils/useAuth";
import useUpload from "../Modal/ModalUtils/useUpload";
import {
  RiLoginCircleLine,
  RiLogoutCircleLine,
  RiSettings3Line,
  RiUploadCloudLine,
  RiUser3Line,
} from "react-icons/ri";
import { HiOutlineCurrencyRupee } from "react-icons/hi2";
import useSub from "../Modal/ModalUtils/useSub";

const TopBarMenu: FC = () => {
  const { user } = useUser();
  const { onOpen: onOpenAuth } = useAuth();
  const { onOpen: onOpenSub } = useSub();
  const { onOpen: onOpenUpload } = useUpload();

  const router = useRouter();
  const client = useSupabaseClient();
  const menuRef = useRef<HTMLDivElement>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  const handleLogout = async () => {
    const { error } = await client.auth.signOut();

    if (error) {
      console.log(error);
      toast.error("Logout Failed");
    } else toast.success("Logout Successful");

    router.refresh();
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const items = useMemo<TopBarMenuItems[]>(
    () => {
      const links = [
        {
          icon: RiUploadCloudLine,
          label: "Upload",
          func: onOpenUpload,
        },
        {
          icon: HiOutlineCurrencyRupee,
          label: "Subscribe",
          func: () => onOpenSub(),
        },
      ];

      const login = [
        {
          icon: RiLoginCircleLine,
          label: "Login",
          func: onOpenAuth,
        },
        {
          icon: RiUser3Line,
          label: "Register",
          func: onOpenAuth,
        },
      ];

      const logout = [
        {
          icon: RiLogoutCircleLine,
          label: "Logout",
          func: handleLogout,
        },
      ];

      return user ? [...links, ...logout] : [...links, ...login];
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user],
  );

  return (
    <div className="relative" ref={menuRef}>
      <div
        className="flex flex-row items-center justify-center gap-1 p-1 h-10 hover:cursor-pointer"
        onClick={toggleMenu}
      >
        {[1, 2, 3].map((_, i) => (
          <div key={i} className={`w-1 h-1 bg-white rounded-full`} />
        ))}
      </div>
      {isMenuOpen && (
        <div className="bg-black text-white  absolute top-11 right-0 flex flex-col rounded p-1 z-50">
          {items?.map((e, i) => (
            <div
              key={i}
              onClick={e.func}
              className="p-2 min-w-[150px] hover:underline cursor-pointer flex flex-row items-center gap-2"
            >
              <e.icon />
              <span>{e.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopBarMenu;
