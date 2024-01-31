"use client";

import { FC, useEffect, useState } from "react";
import { ProductWithPrice } from "@/Interfaces";
import AuthModal from "./Modal/AuthModal";
import SubModal from "./Modal/SubModal";
import { Toaster } from "react-hot-toast";
import UploadModal from "./Modal/UploadModal";

interface UIElementsProps {
  products: ProductWithPrice[];
}

const UIElements: FC<UIElementsProps> = ({ products }) => {
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
      <SubModal products={products} />
      <UploadModal />
    </>
  ) : null;
};

export default UIElements;
