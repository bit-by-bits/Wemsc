import { ReactNode } from "react";
import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import TopBar from "@/components/TopBar/TopBar";
import LeftBar from "@/components/LeftBar/LeftBar";
import RightBar from "@/components/RightBar/RightBar";

const rubik = Rubik({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wemsc | Music App For All Your Needs",
  description: "Wemsc is a music app for all your needs!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
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
    </html>
  );
}
