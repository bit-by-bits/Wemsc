import { FC, ReactNode, useEffect, useState } from "react";
import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import TopBar from "@/components/TopBar/TopBar";
import LeftBar from "@/components/LeftBar/LeftBar";
import RightBar from "@/components/RightBar/RightBar";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import { NextUIProvider } from "@nextui-org/react";
import AuthModal from "@/components/Modal/AuthModal";
import SubscribeModal from "@/components/Modal/SubscribeModal";
import UploadModal from "@/components/Modal/UploadModal";

interface RubicFontOptions {
  [key: string]: string | string[];
}

interface RootLayoutProps {
  children: ReactNode;
}

const rubik = Rubik({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
} as RubicFontOptions);

export const metadata: Metadata = {
  title: "Wemsc | Music App For All Your Needs",
  description: "Wemsc is a music app for all your needs!",
};

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <html lang="en">
      <SupabaseProvider>
        <UserProvider>
          <NextUIProvider>
            {isMounted ? (
              <>
                <AuthModal />
                <SubscribeModal products={[]} />
                <UploadModal />
              </>
            ) : null}
            <body
              className={`flex flex-row items-stretch justify-center w-screen h-screen text-primary-text ${rubik.className} overflow-hidden`}
            >
              <LeftBar />
              <div className="flex flex-col h-screen w-full p-4 bg-main-bg ">
                <TopBar />
                {children}
              </div>
              <RightBar />
            </body>
          </NextUIProvider>
        </UserProvider>
      </SupabaseProvider>
    </html>
  );
};

export default RootLayout;
