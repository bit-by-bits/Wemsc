"use client";

import { FC, useEffect, useState } from "react";
import { ProductWithPrice } from "@/Interfaces";
import AuthModal from "./Modal/AuthModal";
import SubModal from "./Modal/SubModal";
import { Toaster } from "react-hot-toast";

interface UIElementsProps {
  pwp: ProductWithPrice[];
}

const UIElements: FC<UIElementsProps> = ({ pwp }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted ? (
    <>
      <Toaster
        toastOptions={{ style: { background: "#101011", color: "#fff" } }}
      />
      <AuthModal />
      <SubModal products={pwp} />
    </>
  ) : null;
};

export default UIElements;
