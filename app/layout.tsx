import { FC, ReactNode } from "react";
import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import TopBar from "@/components/TopBar/TopBar";
import LeftBar from "@/components/LeftBar/LeftBar";
import RightBar from "@/components/RightBar/RightBar";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import UIElements from "@/components/UIElements";
import {
  fetchFavourites,
  fetchPaidProducts,
  fetchUploadsByUser,
} from "@/utils/useSongs";
import PlayerWrapper from "@/components/Player/PlayerWrapper";

interface RubikFontOptions {
  [key: string]: string | string[];
}

interface RootLayoutProps {
  children: ReactNode;
}

const rubik = Rubik({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
} as RubikFontOptions);

export const metadata: Metadata = {
  title: "Wemsc | Music App For All Your Needs",
  description: "Wemsc is the music platform for all your needs.",
};

const RootLayout: FC<RootLayoutProps> = async ({ children }) => {
  const products = await fetchPaidProducts();
  const uploads = await fetchUploadsByUser();
  const favourites = await fetchFavourites();

  return (
    <html lang="en">
      <body
        className={`flex flex-row items-stretch justify-center w-screen h-screen text-primary-text ${rubik.className} overflow-hidden`}
      >
        <SupabaseProvider>
          <UserProvider>
            <PlayerWrapper />
            <UIElements products={products} />
            <LeftBar />
            <div className="dark flex flex-col h-screen w-full px-4 bg-main-bg">
              <TopBar />
              <div className="w-full h-full overflow-y-scroll overflow-x-hidden scrollbar-hide">
                {children}
              </div>
            </div>
            <RightBar fav={favourites} up={uploads} />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
};

export default RootLayout;
